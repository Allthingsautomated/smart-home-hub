// Auth removed - no longer using Manus OAuth
export function useAuth() {
  return {
    loading: false,
    user: null,
    logout: () => {},
    isAuthenticated: false,
    error: null,
    refresh: () => {},
  };
}
