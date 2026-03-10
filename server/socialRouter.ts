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
import {
  generateInstagramAuthUrl,
  exchangeInstagramAuthCode,
  postMediaToInstagram,
  validateInstagramCredentials,
} from "./_core/social/instagram";
import {
  generateXAuthUrl,
  exchangeXAuthCode,
  postTweetToX,
  validateXCredentials,
} from "./_core/social/x";
import {
  generateYoutubeAuthUrl,
  exchangeYoutubeAuthCode,
  createYoutubePost,
  validateYoutubeCredentials,
} from "./_core/social/youtube";

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

  /**
   * OAuth & Authorization - Admin Endpoints
   */

  // Get OAuth URL for each platform
  getOAuthUrl: adminProcedure
    .input(z.object({ platform: PLATFORM_ENUM }))
    .query(async ({ input }) => {
      const redirectUri = `${process.env.SOCIAL_CALLBACK_URL || "http://localhost:5000/api/social/callback"}?platform=${input.platform}`;

      switch (input.platform) {
        case "instagram":
          return {
            url: generateInstagramAuthUrl(redirectUri),
            platform: "instagram",
          };
        case "x":
          // For X, we need PKCE. Generate code verifier and challenge
          const codeVerifier = Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
          const codeChallenge = Buffer.from(
            require("crypto").createHash("sha256").update(codeVerifier).digest()
          ).toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=/g, "");

          return {
            url: generateXAuthUrl(redirectUri, codeChallenge),
            platform: "x",
            codeVerifier, // Return to client for callback
          };
        case "youtube":
          return {
            url: generateYoutubeAuthUrl(redirectUri),
            platform: "youtube",
          };
      }
    }),

  // Handle OAuth callback for each platform
  handleOAuthCallback: adminProcedure
    .input(
      z.object({
        platform: PLATFORM_ENUM,
        code: z.string(),
        codeVerifier: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const redirectUri = `${process.env.SOCIAL_CALLBACK_URL || "http://localhost:5000/api/social/callback"}?platform=${input.platform}`;

      try {
        switch (input.platform) {
          case "instagram": {
            const result = await exchangeInstagramAuthCode(
              input.code,
              redirectUri
            );
            const credentialData = {
              accessToken: result.accessToken,
              expiresAt: result.expiresIn
                ? new Date(
                  Date.now() + result.expiresIn * 1000
                ).toISOString()
                : undefined,
            };
            const encrypted = encryptCredentials(credentialData);
            await saveSocialCredentials(
              ctx.user.id,
              "instagram",
              encrypted,
              result.userId
            );
            return { success: true, platform: "instagram" };
          }

          case "x": {
            if (!input.codeVerifier) {
              throw new Error("Code verifier required for X OAuth");
            }
            const result = await exchangeXAuthCode(
              input.code,
              redirectUri,
              input.codeVerifier
            );
            const credentialData = {
              accessToken: result.accessToken,
              refreshToken: result.refreshToken,
              expiresAt: new Date(
                Date.now() + result.expiresIn * 1000
              ).toISOString(),
            };
            const encrypted = encryptCredentials(credentialData);
            await saveSocialCredentials(ctx.user.id, "x", encrypted);
            return { success: true, platform: "x" };
          }

          case "youtube": {
            const result = await exchangeYoutubeAuthCode(
              input.code,
              redirectUri
            );
            const credentialData = {
              accessToken: result.accessToken,
              refreshToken: result.refreshToken,
              expiresAt: new Date(
                Date.now() + result.expiresIn * 1000
              ).toISOString(),
            };
            const encrypted = encryptCredentials(credentialData);
            await saveSocialCredentials(ctx.user.id, "youtube", encrypted);
            return { success: true, platform: "youtube" };
          }
        }
      } catch (error) {
        throw new Error(
          `OAuth failed for ${input.platform}: ${error instanceof Error ? error.message : "Unknown error"}`
        );
      }
    }),

  /**
   * Platform-Specific Posting - Admin Endpoints
   */

  // Post to Instagram
  postToInstagram: adminProcedure
    .input(
      z.object({
        blogPostId: z.number(),
        caption: z.string().optional(),
        businessAccountId: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await getBlogPostById(input.blogPostId);
      if (!post) {
        throw new Error("Blog post not found");
      }

      const credentials = await getSocialCredentials(ctx.user.id, "instagram");
      if (!credentials) {
        throw new Error("Not connected to Instagram");
      }

      try {
        let caption = input.caption;
        if (!caption) {
          caption = await adaptContentForInstagram(post);
        }

        const validation = validateContentForPlatform("instagram", caption);
        if (!validation.valid) {
          throw new Error(validation.message);
        }

        const result = await postMediaToInstagram(
          credentials.credentialData,
          caption,
          post.featuredImage || "",
          input.businessAccountId
        );

        await recordSocialPost({
          blogPostId: input.blogPostId,
          platform: "instagram" as any,
          postId: result.postId,
          content: caption,
          imageUrl: post.featuredImage,
          status: "posted" as any,
          postedAt: new Date(),
        });

        return { success: true, postId: result.postId };
      } catch (error) {
        await recordSocialPost({
          blogPostId: input.blogPostId,
          platform: "instagram" as any,
          content: input.caption,
          imageUrl: post.featuredImage,
          status: "failed" as any,
          errorMessage: error instanceof Error ? error.message : "Unknown error",
        });

        throw error;
      }
    }),

  // Post to X (Twitter)
  postToX: adminProcedure
    .input(
      z.object({
        blogPostId: z.number(),
        tweet: z.string().optional(),
        blogUrl: z.string().url().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await getBlogPostById(input.blogPostId);
      if (!post) {
        throw new Error("Blog post not found");
      }

      const credentials = await getSocialCredentials(ctx.user.id, "x");
      if (!credentials) {
        throw new Error("Not connected to X");
      }

      try {
        let content = input.tweet;
        if (!content) {
          content = await adaptContentForX(post);
          // Append blog URL if provided
          if (input.blogUrl) {
            content = `${content}\n\n${input.blogUrl}`;
          }
        }

        const validation = validateContentForPlatform("x", content);
        if (!validation.valid) {
          throw new Error(validation.message);
        }

        const result = await postTweetToX(credentials.credentialData, content);

        await recordSocialPost({
          blogPostId: input.blogPostId,
          platform: "x" as any,
          postId: result.postId,
          content: content,
          status: "posted" as any,
          postedAt: new Date(),
        });

        return { success: true, postId: result.postId };
      } catch (error) {
        await recordSocialPost({
          blogPostId: input.blogPostId,
          platform: "x" as any,
          content: input.tweet,
          status: "failed" as any,
          errorMessage: error instanceof Error ? error.message : "Unknown error",
        });

        throw error;
      }
    }),

  // Post to YouTube
  postToYoutube: adminProcedure
    .input(
      z.object({
        blogPostId: z.number(),
        content: z.string().optional(),
        imageUrl: z.string().url().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await getBlogPostById(input.blogPostId);
      if (!post) {
        throw new Error("Blog post not found");
      }

      const credentials = await getSocialCredentials(ctx.user.id, "youtube");
      if (!credentials) {
        throw new Error("Not connected to YouTube");
      }

      try {
        let content = input.content;
        if (!content) {
          content = await adaptContentForYouTube(post);
        }

        const validation = validateContentForPlatform("youtube", content);
        if (!validation.valid) {
          throw new Error(validation.message);
        }

        const result = await createYoutubePost(
          credentials.credentialData,
          content,
          input.imageUrl || post.featuredImage || undefined
        );

        await recordSocialPost({
          blogPostId: input.blogPostId,
          platform: "youtube" as any,
          postId: result.postId,
          content: content,
          imageUrl: input.imageUrl || post.featuredImage,
          status: "posted" as any,
          postedAt: new Date(),
        });

        return { success: true, postId: result.postId };
      } catch (error) {
        await recordSocialPost({
          blogPostId: input.blogPostId,
          platform: "youtube" as any,
          content: input.content,
          status: "failed" as any,
          errorMessage: error instanceof Error ? error.message : "Unknown error",
        });

        throw error;
      }
    }),

  /**
   * Validation Endpoints
   */

  // Validate credentials for a platform
  validateCredentials: adminProcedure
    .input(z.object({ platform: PLATFORM_ENUM }))
    .query(async ({ input, ctx }) => {
      const credentials = await getSocialCredentials(ctx.user.id, input.platform);
      if (!credentials) {
        return { valid: false, message: "Not connected" };
      }

      try {
        let isValid = false;

        switch (input.platform) {
          case "instagram":
            isValid = await validateInstagramCredentials(
              credentials.credentialData
            );
            break;
          case "x":
            isValid = await validateXCredentials(credentials.credentialData);
            break;
          case "youtube":
            isValid = await validateYoutubeCredentials(
              credentials.credentialData
            );
            break;
        }

        return {
          valid: isValid,
          message: isValid ? "Credentials valid" : "Credentials invalid",
        };
      } catch (error) {
        return {
          valid: false,
          message: error instanceof Error ? error.message : "Validation failed",
        };
      }
    }),
});
