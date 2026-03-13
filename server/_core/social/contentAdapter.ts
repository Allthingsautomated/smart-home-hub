import { BlogPost } from "../../drizzle/schema";
import { invokeLLM } from "../llm";

/**
 * Adapts blog post content for Instagram
 * - Max 2200 characters
 * - Engaging hook
 * - 5-10 hashtags
 * - Call to action
 */
export async function adaptContentForInstagram(blogPost: BlogPost): Promise<string> {
  const prompt = `You are a social media expert specializing in Instagram marketing.

Convert this blog post into an engaging Instagram caption:

Title: "${blogPost.title}"
Category: ${blogPost.category}
Excerpt: "${blogPost.excerpt}"

Requirements:
- Maximum 2200 characters
- Start with an engaging hook or question
- Include 5-10 relevant hashtags
- Use line breaks for readability (emojis optional)
- Call to action at the end (e.g., "Link in bio", "DM us", etc.)
- Format: Plain text with hashtags at the very end
- Make it feel authentic and not salesy

Return ONLY the caption, no additional text or explanations.`;

  const result = await invokeLLM({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const caption = result.choices?.[0]?.message?.content || "";
  return caption.trim();
}

/**
 * Adapts blog post content for X (Twitter)
 * - Max 280 characters
 * - Concise and impactful
 * - 1-2 relevant hashtags
 * - Link to blog post
 */
export async function adaptContentForX(blogPost: BlogPost): Promise<string> {
  const prompt = `You are a social media expert specializing in X (Twitter) marketing.

Convert this blog post into an engaging X post:

Title: "${blogPost.title}"
Category: ${blogPost.category}
Excerpt: "${blogPost.excerpt}"

Requirements:
- Maximum 280 characters (including hashtags)
- Start with a hook or interesting statement
- Maximum 1-2 hashtags
- Include link text like "[Read blog]" at the end (this will be replaced with actual URL)
- Make it punchy and compelling
- No hashtags in the middle of text, only at the end
- Format: Plain text

Return ONLY the tweet content, no additional text or explanations.`;

  const result = await invokeLLM({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const tweet = result.choices?.[0]?.message?.content || "";
  return tweet.trim();
}

/**
 * Adapts blog post content for YouTube
 * - For YouTube Community posts or video descriptions
 * - Max 5000 characters
 * - More detailed than X, less than full blog
 * - Timestamps or sections
 */
export async function adaptContentForYouTube(blogPost: BlogPost): Promise<string> {
  const prompt = `You are a social media expert specializing in YouTube Community and video descriptions.

Convert this blog post into YouTube Community post content or video description:

Title: "${blogPost.title}"
Category: ${blogPost.category}
Excerpt: "${blogPost.excerpt}"
Content Summary: "${blogPost.content.substring(0, 500)}..."

Requirements:
- Maximum 5000 characters
- Start with a compelling hook
- Include clear sections with timestamps format (0:00 - Section Name)
- 5-10 relevant hashtags
- Call to action (subscribe, check out our blog, etc.)
- Make it engaging for a YouTube audience
- Include emojis where appropriate
- Format: Plain text with hashtags at the end

Return ONLY the community post/description content, no additional text or explanations.`;

  const result = await invokeLLM({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const description = result.choices?.[0]?.message?.content || "";
  return description.trim();
}

/**
 * Generates platform-specific content for multiple platforms at once
 */
export async function adaptContentForAllPlatforms(
  blogPost: BlogPost
): Promise<{
  instagram: string;
  x: string;
  youtube: string;
}> {
  const [instagram, x, youtube] = await Promise.all([
    adaptContentForInstagram(blogPost),
    adaptContentForX(blogPost),
    adaptContentForYouTube(blogPost),
  ]);

  return { instagram, x, youtube };
}

/**
 * Gets character count for content validation
 */
export function getCharacterCount(content: string): number {
  return content.length;
}

/**
 * Validates if content fits platform requirements
 */
export function validateContentForPlatform(
  platform: "instagram" | "x" | "youtube",
  content: string
): { valid: boolean; message?: string } {
  const charCount = getCharacterCount(content);

  switch (platform) {
    case "x":
      if (charCount > 280) {
        return {
          valid: false,
          message: `X post is too long: ${charCount}/280 characters`,
        };
      }
      return { valid: true };

    case "instagram":
      if (charCount > 2200) {
        return {
          valid: false,
          message: `Instagram caption is too long: ${charCount}/2200 characters`,
        };
      }
      return { valid: true };

    case "youtube":
      if (charCount > 5000) {
        return {
          valid: false,
          message: `YouTube description is too long: ${charCount}/5000 characters`,
        };
      }
      return { valid: true };

    default:
      return { valid: true };
  }
}
