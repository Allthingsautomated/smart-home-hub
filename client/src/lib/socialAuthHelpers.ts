/**
 * Social Media OAuth Helper Functions
 * Handles OAuth flow initialization and callback processing
 */

export interface OAuthState {
  platform: "instagram" | "x" | "youtube";
  state: string;
  codeVerifier?: string;
  timestamp: number;
}

const OAUTH_STATE_KEY = "social_oauth_state";
const OAUTH_VERIFIER_KEY = "social_oauth_verifier";

/**
 * Stores OAuth state for later verification
 */
export function storeOAuthState(state: OAuthState): void {
  try {
    sessionStorage.setItem(OAUTH_STATE_KEY, JSON.stringify(state));
    if (state.codeVerifier) {
      sessionStorage.setItem(
        `${OAUTH_VERIFIER_KEY}_${state.platform}`,
        state.codeVerifier
      );
    }
  } catch (error) {
    console.error("Failed to store OAuth state:", error);
  }
}

/**
 * Retrieves stored OAuth state
 */
export function getOAuthState(): OAuthState | null {
  try {
    const stored = sessionStorage.getItem(OAUTH_STATE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Failed to retrieve OAuth state:", error);
    return null;
  }
}

/**
 * Clears stored OAuth state
 */
export function clearOAuthState(): void {
  try {
    sessionStorage.removeItem(OAUTH_STATE_KEY);
    ["instagram", "x", "youtube"].forEach((platform) => {
      sessionStorage.removeItem(`${OAUTH_VERIFIER_KEY}_${platform}`);
    });
  } catch (error) {
    console.error("Failed to clear OAuth state:", error);
  }
}

/**
 * Gets the stored code verifier for a platform (used for X PKCE flow)
 */
export function getCodeVerifier(platform: string): string | null {
  try {
    return sessionStorage.getItem(`${OAUTH_VERIFIER_KEY}_${platform}`);
  } catch {
    return null;
  }
}

/**
 * Generates a PKCE code challenge from a code verifier
 * Used for X (Twitter) OAuth
 */
export async function generatePKCEChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashString = String.fromCharCode.apply(null, hashArray as any);
  return btoa(hashString).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/**
 * Generates a random code verifier for PKCE flow
 */
export function generateCodeVerifier(): string {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const length = 128;
  let result = "";

  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return result;
}

/**
 * Initiates OAuth flow for a specific platform
 */
export async function initiateOAuthFlow(
  platform: "instagram" | "x" | "youtube",
  authUrl: string
): Promise<void> {
  // Generate PKCE for X
  let codeVerifier: string | undefined;
  if (platform === "x") {
    codeVerifier = generateCodeVerifier();
  }

  // Store state
  storeOAuthState({
    platform,
    state: Math.random().toString(36).substring(7),
    codeVerifier,
    timestamp: Date.now(),
  });

  // Redirect to OAuth provider
  window.location.href = authUrl;
}

/**
 * Checks if OAuth callback is from a trusted source
 */
export function isValidOAuthCallback(
  platform: string,
  storedState?: OAuthState
): boolean {
  if (!storedState) {
    return false;
  }

  // Check if state matches
  const currentState = getOAuthState();
  if (!currentState || currentState.state !== storedState.state) {
    return false;
  }

  // Check if timestamp is recent (within 10 minutes)
  const age = Date.now() - storedState.timestamp;
  const TEN_MINUTES = 10 * 60 * 1000;
  if (age > TEN_MINUTES) {
    return false;
  }

  return true;
}

/**
 * Parses OAuth callback URL parameters
 */
export function parseOAuthCallback(searchParams: URLSearchParams): {
  code?: string;
  state?: string;
  error?: string;
  errorDescription?: string;
} {
  return {
    code: searchParams.get("code") || undefined,
    state: searchParams.get("state") || undefined,
    error: searchParams.get("error") || undefined,
    errorDescription: searchParams.get("error_description") || undefined,
  };
}

/**
 * Cleans up OAuth parameters from URL
 */
export function cleanupOAuthUrl(): void {
  if (window.history && window.history.replaceState) {
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, document.title, cleanUrl);
  }
}
