export const ENV = {
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  adminPassword: process.env.ADMIN_PASSWORD ?? "admin123",
  isProduction: process.env.NODE_ENV === "production",
  corsOrigin: process.env.CORS_ORIGIN ?? "https://itsallthingsautomated.com",
  // Social Media Configuration
  socialEncryptionKey: process.env.SOCIAL_ENCRYPTION_KEY ?? "",
  instagramAppId: process.env.INSTAGRAM_APP_ID ?? "",
  instagramAppSecret: process.env.INSTAGRAM_APP_SECRET ?? "",
  xClientId: process.env.X_CLIENT_ID ?? "",
  xClientSecret: process.env.X_CLIENT_SECRET ?? "",
  youtubeClientId: process.env.YOUTUBE_CLIENT_ID ?? "",
  youtubeClientSecret: process.env.YOUTUBE_CLIENT_SECRET ?? "",
  socialCallbackUrl: process.env.SOCIAL_CALLBACK_URL ?? "http://localhost:5000/api/social/callback",
};
