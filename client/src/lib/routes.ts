const staticRoutes = {
  home: "/",
  about: "/about",
  services: "/services",
  smartLighting: "/services/smart-lighting",
  homeSecurity: "/services/home-security",
  climateControl: "/services/climate-control",
  voiceIntegration: "/services/voice-integration",
  homeAudio: "/services/home-audio",
  networks: "/services/networks",
  commercialAutomation: "/services/commercial-automation",
  commercialSecurity: "/services/commercial-security",
  commercialClimate: "/services/commercial-climate",
  commercialNetworks: "/services/commercial-networks",
  teslaPanels: "/services/tesla-panels",
  landscapeLighting: "/services/landscape-lighting",
  smartLightingCatalog: "/smart-lighting-catalog",
  blog: "/blog",
  pricing: "/pricing",
  quoteBuilder: "/quote-builder",
  videoEstimate: "/video-estimate",
  videoEstimateAdmin: "/admin/video-estimates",
  contact: "/contact",
  admin: "/admin",
  adminLogin: "/admin/login",
  adminBlogEditor: "/admin/blog-editor",
  adminPriceManager: "/admin/pricing-manager",
  adminSocialConnections: "/admin/social-connections",
  adminSecretDashboard: "/admin-all-things-automated-secret",
  notFound: "/404",
} as const;

export const ROUTES = {
  ...staticRoutes,
  blogPost: (id: string | number) => `/blog/${id}`,
} as const;

export type AppRoute = (typeof staticRoutes)[keyof typeof staticRoutes];
