# Social Media Integration Implementation Guide

## Overview

This guide documents the complete implementation of social media sharing and auto-posting functionality for the smart-home-hub blog platform. The feature enables automatic posting of blog content to Instagram, X (Twitter), and YouTube with platform-specific content adaptation.

## Architecture Overview

### Tech Stack
- **Backend**: Node.js + Express + tRPC
- **Frontend**: React 19 + TypeScript + Radix UI
- **Database**: MySQL with Drizzle ORM
- **APIs**: Instagram Graph API, Twitter API v2, YouTube Data API v3
- **AI**: Gemini 2.5 Flash for content adaptation
- **Security**: AES-256-GCM encryption for credentials

## Implementation Phases

### Phase 1: Database & Credential Management ✅

**Files Created:**
- `drizzle/schema.ts` - 4 new tables added
- `drizzle/0002_add_social_media_tables.sql` - Migration file
- `server/socialDb.ts` - Database access layer
- `server/_core/social/credentialManager.ts` - Encryption/decryption
- `server/_core/social/index.ts` - Module exports

**Key Features:**
- Secure credential storage with AES-256-GCM encryption
- Token expiry and refresh tracking
- CRUD operations for all social tables
- Blog post persistence in database

**Database Schema:**
```
blog_posts
├── id (int, PK)
├── title (varchar)
├── slug (varchar, unique)
├── excerpt (text)
├── content (text)
├── featuredImage (varchar)
├── author (varchar)
├── category (varchar)
├── published (enum)
├── publishedAt (timestamp)
└── timestamps

social_media_credentials
├── id (int, PK)
├── userId (int, FK)
├── platform (enum: instagram|x|youtube)
├── accountHandle (varchar)
├── credentialData (text, encrypted)
├── isActive (enum)
├── lastTokenRefresh (timestamp)
├── expiresAt (timestamp)
└── timestamps

social_post_history
├── id (int, PK)
├── blogPostId (int, FK)
├── platform (enum)
├── postId (varchar)
├── content (text)
├── status (enum: pending|posted|failed)
├── errorMessage (text)
├── views (int)
├── engagement (int)
└── timestamps

platform_settings
├── id (int, PK)
├── userId (int, FK)
├── platform (enum)
├── isEnabled (enum)
├── autoPost (enum)
├── hashtagTemplate (text)
├── contentTemplate (text)
└── timestamps
```

### Phase 2: Instagram Integration ✅

**Files Created:**
- `server/_core/social/instagram.ts` - Instagram Graph API integration

**Features:**
- OAuth 2.0 authentication
- Media posting (images with captions)
- Post insights retrieval
- Account ID resolution
- Token refresh handling

**Key Functions:**
```typescript
postMediaToInstagram(encryptedCredentials, caption, imageUrl, businessAccountId?)
getPostInsights(postId, encryptedCredentials)
getInstagramBusinessAccountId(accessToken)
generateInstagramAuthUrl(redirectUri)
exchangeInstagramAuthCode(code, redirectUri)
validateInstagramCredentials(encryptedCredentials)
```

**API Integration:**
- Instagram Graph API v18.0
- Creates media containers and publishes them
- Retrieves impressions and engagement metrics

### Phase 3: X (Twitter) Integration ✅

**Files Created:**
- `server/_core/social/x.ts` - Twitter API v2 integration

**Features:**
- OAuth 2.0 with PKCE flow
- Tweet posting with optional media
- Tweet metrics retrieval
- Media upload capability
- Token refresh with refresh tokens

**Key Functions:**
```typescript
postTweetToX(encryptedCredentials, text, mediaIds?)
getTweetMetrics(tweetId, encryptedCredentials)
uploadMediaToX(mediaUrl, encryptedCredentials, mediaType?)
generateXAuthUrl(redirectUri, codeChallenge)
exchangeXAuthCode(code, redirectUri, codeVerifier)
refreshXAccessToken(refreshToken)
validateXCredentials(encryptedCredentials)
```

**API Integration:**
- Twitter API v2 endpoints
- PKCE authentication flow
- Media upload to Twitter
- Metrics with impression counts

### Phase 4: YouTube Integration ✅

**Files Created:**
- `server/_core/social/youtube.ts` - YouTube Data API v3 integration

**Features:**
- OAuth 2.0 with offline access
- Community post creation
- Playlist management
- Video statistics retrieval
- Long-term credential storage

**Key Functions:**
```typescript
createYoutubePost(encryptedCredentials, content, imageUrl?)
addVideoToPlaylist(encryptedCredentials, playlistId, videoId, note?)
getVideoStats(videoId, encryptedCredentials)
createPlaylist(encryptedCredentials, title, description?, isPrivate?)
generateYoutubeAuthUrl(redirectUri)
exchangeYoutubeAuthCode(code, redirectUri)
refreshYoutubeAccessToken(refreshToken)
validateYoutubeCredentials(encryptedCredentials)
```

**API Integration:**
- YouTube Data API v3
- Handles offline OAuth for long-term access
- Community posts and playlist management
- Video analytics

### Phase 5: Frontend UI & Admin Components ✅

**Files Created:**
- `client/src/lib/socialAuthHelpers.ts` - OAuth utilities
- `client/src/hooks/useSocialMedia.ts` - Social media hook
- `client/src/components/SocialPlatformCard.tsx` - Platform card component
- `client/src/components/SocialPreviewPanel.tsx` - Content preview
- `client/src/components/BlogShareMenu.tsx` - Share dropdown

**Key Components:**

#### socialAuthHelpers.ts
```typescript
storeOAuthState(state) - Save OAuth state to session
getOAuthState() - Retrieve stored state
generateCodeVerifier() - Create PKCE verifier
generatePKCEChallenge(verifier) - Create PKCE challenge
initiateOAuthFlow(platform, authUrl) - Start OAuth redirect
parseOAuthCallback(searchParams) - Parse callback params
cleanupOAuthUrl() - Remove OAuth params from URL
```

#### useSocialMedia Hook
```typescript
// Methods
connectPlatform(platform)
completeOAuth(platform, code)
disconnectPlatform(platform)
postToInstagram(blogPostId, caption?, businessAccountId?)
postToX(blogPostId, tweet?, blogUrl?)
postToYoutube(blogPostId, content?, imageUrl?)
updateSettings(platform, settings)
previewContent(blogPostId, platforms)

// State
isConnecting, isPosting, selectedPlatforms
connectedPlatforms, platformSettings

// Getters
isPlatformConnected(platform)
getPlatform(name)
```

#### Components
- **SocialPlatformCard**: Displays platform connection status
- **SocialPreviewPanel**: Shows platform-specific content previews
- **BlogShareMenu**: Dropdown menu for quick sharing

## Environment Variables Required

```bash
# Database
DATABASE_URL=mysql://user:password@host/database

# OAuth Credentials
INSTAGRAM_APP_ID=your_instagram_app_id
INSTAGRAM_APP_SECRET=your_instagram_app_secret

X_CLIENT_ID=your_x_client_id
X_CLIENT_SECRET=your_x_client_secret

YOUTUBE_CLIENT_ID=your_youtube_client_id
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret

# Social Media Configuration
SOCIAL_ENCRYPTION_KEY=<32-byte-hex-string> # Must be 64 hex characters
SOCIAL_CALLBACK_URL=https://yourdomain.com/api/social/callback

# LLM (already configured)
VITE_APP_ID=your_manus_app_id
BUILT_IN_FORGE_API_KEY=your_forge_api_key
```

## tRPC Routes

All routes are available at `/trpc/social.*`

### Blog Posts
- `social.getPublishedPosts()` - Get all published posts (public)
- `social.getPostById(id)` - Get single post (public)
- `social.getPostBySlug(slug)` - Get post by slug (public)
- `social.getAllPosts()` - Get all posts including drafts (admin)
- `social.createPost(data)` - Create new post (admin)
- `social.updatePost(id, data)` - Update post (admin)
- `social.publishPost(id, platforms?)` - Publish and optionally post to social (admin)
- `social.deletePost(id)` - Delete post (admin)

### Credentials
- `social.connectSocialAccount(platform, tokens)` - Connect account (admin)
- `social.disconnectSocialAccount(platform)` - Disconnect account (admin)
- `social.getConnectedPlatforms()` - List connected accounts (admin)

### Platform Settings
- `social.updatePlatformSettings(platform, settings)` - Update settings (admin)
- `social.getPlatformSettings(platform)` - Get platform settings (admin)
- `social.getAllPlatformSettings()` - Get all settings (admin)

### OAuth
- `social.getOAuthUrl(platform)` - Get OAuth authorization URL (admin)
- `social.handleOAuthCallback(platform, code, codeVerifier?)` - Complete OAuth flow (admin)

### Posting
- `social.postToInstagram(blogPostId, caption?, businessAccountId?)` (admin)
- `social.postToX(blogPostId, tweet?, blogUrl?)` (admin)
- `social.postToYoutube(blogPostId, content?, imageUrl?)` (admin)
- `social.manuallySharePost(blogPostId, platform, customCaption?)` (admin)

### Content & Analytics
- `social.previewPlatformContent(blogPostId, platforms)` - Get AI-generated previews (admin)
- `social.getPostHistory(blogPostId)` - Get posting history (admin)
- `social.validateCredentials(platform)` - Check if credentials are valid (admin)

## Content Adaptation

The system uses Gemini 2.5 Flash LLM to adapt blog content for each platform:

### Instagram (2200 chars max)
- Engaging hook
- Platform hashtags
- Call to action
- Emojis for readability

### X / Twitter (280 chars max)
- Punchy headline
- 1-2 hashtags
- Link reference
- Concise and impactful

### YouTube (5000 chars max)
- Detailed description
- Section timestamps
- 5-10 hashtags
- Engagement call to action

## Security Considerations

### Credential Encryption
- **Algorithm**: AES-256-GCM (authenticated encryption)
- **Key Size**: 32 bytes (256 bits)
- **Key Storage**: Environment variable `SOCIAL_ENCRYPTION_KEY`
- **Format**: `iv:authTag:encryptedData` (hex encoded)

### Token Management
- Long-lived tokens stored encrypted
- Refresh tokens handled securely
- Expiry tracking with 24-hour refresh window
- Automatic validation on use

### Best Practices
1. Rotate encryption keys periodically
2. Monitor token expiry times
3. Validate credentials before posting
4. Use short-lived tokens where possible
5. Log all social post attempts
6. Never log token values

## Integration Steps

### 1. Setup Environment Variables
```bash
# Generate a secure encryption key
openssl rand -hex 32
# Copy result to SOCIAL_ENCRYPTION_KEY

# Get OAuth credentials from each platform
# Instagram: https://developers.facebook.com/apps
# X: https://developer.twitter.com/en/portal/dashboard
# YouTube: https://console.developers.google.com
```

### 2. Run Database Migration
```bash
npm run db:push
```

### 3. Integrate Blog Editor
Add to `/admin/editor` page:
```tsx
<SocialPublishDialog
  blogPostId={postId}
  onPublish={handlePublish}
/>
```

### 4. Add Share Menu to Blog Posts
Add to `/blog/:id` page:
```tsx
<BlogShareMenu
  blogPostId={id}
  blogUrl={`https://yourdomain.com/blog/${slug}`}
  blogTitle={title}
/>
```

### 5. Create Admin Social Settings Page
Create `/admin/social-settings` with:
```tsx
<div className="grid gap-6">
  {['instagram', 'x', 'youtube'].map(platform => (
    <SocialPlatformCard
      key={platform}
      platform={platform}
      {...platformProps}
    />
  ))}
</div>
```

## Usage Examples

### Connect Account (Frontend)
```tsx
const { connectPlatform } = useSocialMedia();

const handleConnect = async () => {
  await connectPlatform('instagram');
  // User is redirected to Instagram OAuth
};
```

### Post to Social (Frontend)
```tsx
const { postToInstagram } = useSocialMedia();

const handleShare = async () => {
  const result = await postToInstagram(
    blogPostId,
    "Custom caption",
    "business_account_id"
  );
  console.log('Posted:', result.postId);
};
```

### Preview Content (Frontend)
```tsx
const { previewContent } = useSocialMedia();

const previews = await previewContent(blogPostId, ['instagram', 'x', 'youtube']);
// Returns: { instagram: {...}, x: {...}, youtube: {...} }
```

### Backend: Post Processing
```typescript
// Using socialDb functions
const post = await getBlogPostById(blogPostId);
const credentials = await getSocialCredentials(userId, 'instagram');

if (credentials) {
  const encrypted = credentials.credentialData;
  const result = await postMediaToInstagram(
    encrypted,
    caption,
    post.featuredImage
  );

  await recordSocialPost({
    blogPostId,
    platform: 'instagram',
    postId: result.postId,
    status: 'posted',
    postedAt: new Date(),
  });
}
```

## File Structure

```
smart-home-hub/
├── drizzle/
│   ├── schema.ts (modified)
│   ├── 0002_add_social_media_tables.sql (new)
│   └── ...
├── server/
│   ├── _core/
│   │   └── social/
│   │       ├── index.ts
│   │       ├── credentialManager.ts
│   │       ├── contentAdapter.ts
│   │       ├── instagram.ts
│   │       ├── x.ts
│   │       ├── youtube.ts
│   │       └── ...
│   ├── socialRouter.ts (new)
│   ├── socialDb.ts (new)
│   ├── routers.ts (modified)
│   ├── db.ts (modified)
│   ├── pricing.ts
│   └── ...
├── client/
│   └── src/
│       ├── lib/
│       │   └── socialAuthHelpers.ts (new)
│       ├── hooks/
│       │   └── useSocialMedia.ts (new)
│       ├── components/
│       │   ├── SocialPlatformCard.tsx (new)
│       │   ├── SocialPreviewPanel.tsx (new)
│       │   ├── BlogShareMenu.tsx (new)
│       │   └── ...
│       ├── pages/
│       │   ├── Blog.tsx
│       │   ├── BlogPost.tsx
│       │   ├── AdminDashboard.tsx
│       │   └── ...
│       └── ...
└── ...
```

## Testing Strategy

### Unit Tests
- Encryption/decryption roundtrip
- Content adaptation prompts
- URL generation and parsing
- Character count validation

### Integration Tests
- Full OAuth flow
- Blog creation → publish → post flow
- Credential validation
- Token refresh logic

### E2E Tests
- Create blog → publish to all platforms
- Verify posts appear on social media
- Test credential management
- Error handling and retries

## Monitoring & Analytics

### Tracking
- Post creation and status
- Platform-specific metrics
- Error logging
- Token refresh attempts

### Debugging
```typescript
// Check credential expiry
const cred = await getSocialCredentials(userId, 'instagram');
const decrypted = decryptCredentials(cred.credentialData);
console.log('Expires at:', decrypted.expiresAt);

// Validate before posting
const isValid = await validateInstagramCredentials(cred.credentialData);

// Get post history
const history = await getSocialPostHistory(blogPostId);
```

## Future Enhancements

1. **Job Queue**: Add BullMQ for reliable async posting
2. **Analytics Dashboard**: Show post metrics and engagement
3. **Scheduling**: Schedule posts for specific times
4. **Multi-language**: Adapt content for different languages
5. **A/B Testing**: Test different captions and timing
6. **Automatic Republishing**: Repost top-performing content
7. **Comment Moderation**: Monitor and moderate social comments
8. **Hashtag Management**: Trending hashtag suggestions
9. **Cross-posting**: Template variations per platform
10. **API Rate Limiting**: Track and respect rate limits

## Troubleshooting

### OAuth Issues
- Ensure redirect URI matches exactly
- Check platform app settings
- Verify client ID and secret
- Clear browser cookies/cache

### Posting Failures
- Validate credentials haven't expired
- Check image URL accessibility
- Verify content fits platform limits
- Review API error messages

### Encryption Issues
- Ensure `SOCIAL_ENCRYPTION_KEY` is 64 hex characters
- Key must be consistent across instances
- Don't rotate key without migration strategy

### Database Issues
- Run migrations: `npm run db:push`
- Check connection string
- Verify tables exist: `DESC blog_posts;`

## Support & Documentation

- Instagram Graph API: https://developers.facebook.com/docs/instagram-api
- Twitter API v2: https://developer.twitter.com/en/docs/twitter-api
- YouTube Data API: https://developers.google.com/youtube/v3
- Drizzle ORM: https://orm.drizzle.team/docs

## License

This implementation is part of the smart-home-hub project.

---

**Last Updated**: March 2026
**Status**: Fully Implemented
**Supported Platforms**: Instagram, X (Twitter), YouTube
