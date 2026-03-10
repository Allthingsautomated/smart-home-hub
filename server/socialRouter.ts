import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import {
  createBlogPost,
  getBlogPostById,
  getBlogPostBySlug,
  getAllBlogPosts,
  updateBlogPost,
  publishBlogPost,
  deleteBlogPost,
  saveSocialCredentials,
  getSocialCredentials,
  getAllSocialCredentials,
  deleteSocialCredentials,
  recordSocialPost,
  getSocialPostHistory,
  updateSocialPostStatus,
  savePlatformSettings,
  getPlatformSettings,
  getAllPlatformSettings,
  deletePlatformSettings,
} from "./socialDb";
import {
  encryptCredentials,
  decryptCredentials,
  isCredentialExpired,
} from "./_core/social/credentialManager";
import {
  adaptContentForInstagram,
  adaptContentForX,
  adaptContentForYouTube,
  validateContentForPlatform,
} from "./_core/social/contentAdapter";

const PLATFORM_ENUM = z.enum(["instagram", "x", "youtube"]);
const POST_STATUS_ENUM = z.enum(["pending", "posted", "failed"]);

export const socialRouter = router({
  /**
   * Blog Posts - Public Endpoints
   */

  // Get all published blog posts
  getPublishedPosts: publicProcedure.query(async () => {
    const posts = await getAllBlogPosts();
    return posts.filter((p) => p.published === "true");
  }),

  // Get single blog post by ID
  getPostById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await getBlogPostById(input.id);
    }),

  // Get single blog post by slug
  getPostBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return await getBlogPostBySlug(input.slug);
    }),

  /**
   * Blog Posts - Admin Endpoints
   */

  // Get all blog posts (published and drafts)
  getAllPosts: adminProcedure.query(async () => {
    return await getAllBlogPosts();
  }),

  // Create new blog post
  createPost: adminProcedure
    .input(
      z.object({
        title: z.string().min(1, "Title is required"),
        excerpt: z.string().min(1, "Excerpt is required"),
        content: z.string().min(1, "Content is required"),
        category: z.string().min(1, "Category is required"),
        author: z.string().min(1, "Author is required"),
        featuredImage: z.string().url().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const slug = input.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      return await createBlogPost({
        title: input.title,
        slug,
        excerpt: input.excerpt,
        content: input.content,
        category: input.category,
        author: input.author,
        featuredImage: input.featuredImage,
        published: "false" as any,
      });
    }),

  // Update blog post
  updatePost: adminProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        excerpt: z.string().optional(),
        content: z.string().optional(),
        category: z.string().optional(),
        author: z.string().optional(),
        featuredImage: z.string().url().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const updateData: Record<string, any> = {};

      if (data.title) {
        updateData.title = data.title;
        updateData.slug = data.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
      }
      if (data.excerpt) updateData.excerpt = data.excerpt;
      if (data.content) updateData.content = data.content;
      if (data.category) updateData.category = data.category;
      if (data.author) updateData.author = data.author;
      if (data.featuredImage) updateData.featuredImage = data.featuredImage;

      await updateBlogPost(id, updateData);
      return { success: true };
    }),

  // Publish blog post (triggers auto-posting to social media)
  publishPost: adminProcedure
    .input(
      z.object({
        id: z.number(),
        platforms: z.array(PLATFORM_ENUM).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await getBlogPostById(input.id);
      if (!post) {
        throw new Error("Blog post not found");
      }

      // Publish the blog post
      await publishBlogPost(input.id);

      // Queue posts to selected platforms
      if (input.platforms && input.platforms.length > 0) {
        for (const platform of input.platforms) {
          // Record as pending
          await recordSocialPost({
            blogPostId: input.id,
            platform: platform as any,
            status: "pending" as any,
            content: "", // Will be filled during processing
          });

          // TODO: Enqueue in job queue for async processing
        }
      }

      return { success: true, postId: input.id };
    }),

  // Delete blog post
  deletePost: adminProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await deleteBlogPost(input.id);
      return { success: true };
    }),

  /**
   * Social Media Credentials - Admin Endpoints
   */

  // Connect social media account (save encrypted credentials)
  connectSocialAccount: adminProcedure
    .input(
      z.object({
        platform: PLATFORM_ENUM,
        accessToken: z.string().min(1, "Access token is required"),
        refreshToken: z.string().optional(),
        expiresIn: z.number().optional(),
        accountHandle: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const credentialData = {
        accessToken: input.accessToken,
        refreshToken: input.refreshToken || undefined,
        expiresAt: input.expiresIn
          ? new Date(Date.now() + input.expiresIn * 1000).toISOString()
          : undefined,
      };

      const encrypted = encryptCredentials(credentialData);

      await saveSocialCredentials(
        ctx.user.id,
        input.platform,
        encrypted,
        input.accountHandle
      );

      return { success: true, platform: input.platform };
    }),

  // Disconnect social media account
  disconnectSocialAccount: adminProcedure
    .input(z.object({ platform: PLATFORM_ENUM }))
    .mutation(async ({ input, ctx }) => {
      await deleteSocialCredentials(ctx.user.id, input.platform);
      return { success: true };
    }),

  // Get connected social media accounts
  getConnectedPlatforms: adminProcedure.query(async ({ ctx }) => {
    const credentials = await getAllSocialCredentials(ctx.user.id);
    return credentials.map((c) => ({
      platform: c.platform,
      accountHandle: c.accountHandle,
      isActive: c.isActive === "true",
      connectedAt: c.connectedAt,
    }));
  }),

  /**
   * Platform Settings - Admin Endpoints
   */

  // Update platform settings
  updatePlatformSettings: adminProcedure
    .input(
      z.object({
        platform: PLATFORM_ENUM,
        isEnabled: z.boolean().optional(),
        autoPost: z.boolean().optional(),
        hashtagTemplate: z.string().optional(),
        contentTemplate: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const settings: Record<string, any> = {};

      if (input.isEnabled !== undefined)
        settings.isEnabled = input.isEnabled ? ("true" as any) : ("false" as any);
      if (input.autoPost !== undefined)
        settings.autoPost = input.autoPost ? ("true" as any) : ("false" as any);
      if (input.hashtagTemplate !== undefined)
        settings.hashtagTemplate = input.hashtagTemplate;
      if (input.contentTemplate !== undefined)
        settings.contentTemplate = input.contentTemplate;

      await savePlatformSettings(ctx.user.id, input.platform, settings);
      return { success: true };
    }),

  // Get platform settings
  getPlatformSettings: adminProcedure
    .input(z.object({ platform: PLATFORM_ENUM }))
    .query(async ({ input, ctx }) => {
      return await getPlatformSettings(ctx.user.id, input.platform);
    }),

  // Get all platform settings for user
  getAllPlatformSettings: adminProcedure.query(async ({ ctx }) => {
    return await getAllPlatformSettings(ctx.user.id);
  }),

  /**
   * Social Post History - Admin Endpoints
   */

  // Get social post history for a blog post
  getPostHistory: adminProcedure
    .input(z.object({ blogPostId: z.number() }))
    .query(async ({ input }) => {
      return await getSocialPostHistory(input.blogPostId);
    }),

  /**
   * Content Adaptation - Admin Endpoints
   */

  // Preview how blog post will look on each platform
  previewPlatformContent: adminProcedure
    .input(
      z.object({
        blogPostId: z.number(),
        platforms: z.array(PLATFORM_ENUM),
      })
    )
    .query(async ({ input }) => {
      const post = await getBlogPostById(input.blogPostId);
      if (!post) {
        throw new Error("Blog post not found");
      }

      const previews: Record<string, any> = {};

      for (const platform of input.platforms) {
        try {
          let content = "";

          switch (platform) {
            case "instagram":
              content = await adaptContentForInstagram(post);
              break;
            case "x":
              content = await adaptContentForX(post);
              break;
            case "youtube":
              content = await adaptContentForYouTube(post);
              break;
          }

          const validation = validateContentForPlatform(platform, content);

          previews[platform] = {
            content,
            characterCount: content.length,
            valid: validation.valid,
            message: validation.message,
          };
        } catch (error) {
          previews[platform] = {
            error: error instanceof Error ? error.message : "Unknown error",
          };
        }
      }

      return previews;
    }),

  // Manual post to specific platform
  manuallySharePost: adminProcedure
    .input(
      z.object({
        blogPostId: z.number(),
        platform: PLATFORM_ENUM,
        customCaption: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await getBlogPostById(input.blogPostId);
      if (!post) {
        throw new Error("Blog post not found");
      }

      // Check if user has credentials for this platform
      const credentials = await getSocialCredentials(ctx.user.id, input.platform);
      if (!credentials) {
        throw new Error(`Not connected to ${input.platform}`);
      }

      try {
        const decrypted = decryptCredentials(credentials.credentialData);

        // Check if credential has expired
        if (decrypted.expiresAt && isCredentialExpired(decrypted)) {
          throw new Error(
            `Credentials for ${input.platform} have expired. Please reconnect.`
          );
        }

        // Generate caption if not provided
        let caption = input.customCaption;
        if (!caption) {
          switch (input.platform) {
            case "instagram":
              caption = await adaptContentForInstagram(post);
              break;
            case "x":
              caption = await adaptContentForX(post);
              break;
            case "youtube":
              caption = await adaptContentForYouTube(post);
              break;
          }
        }

        // Record the social post
        await recordSocialPost({
          blogPostId: input.blogPostId,
          platform: input.platform as any,
          content: caption,
          imageUrl: post.featuredImage,
          status: "pending" as any,
        });

        // TODO: Enqueue in job queue for actual posting
        // For now, just return success
        return {
          success: true,
          platform: input.platform,
          content: caption,
        };
      } catch (error) {
        throw new Error(
          `Failed to prepare post: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      }
    }),
});
