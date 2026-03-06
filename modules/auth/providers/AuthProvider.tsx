import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { createContext, useContext, useMemo } from "react";
import type { AuthProviderProps } from "@/modules/auth/types";

// Re-export for external use
export { tokenCache };

/** Mock auth value when EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is not set (e.g. local testing). */
const MOCK_AUTH = {
  user: null,
  isSignedIn: false,
  isLoaded: true as const,
  signOut: async () => {},
  getToken: async () => null as string | null,
};

const MockAuthContext = createContext<typeof MOCK_AUTH | undefined>(undefined);

export function useMockAuth() {
  return useContext(MockAuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  const mockValue = useMemo(() => MOCK_AUTH, []);

  if (!publishableKey) {
    return (
      <MockAuthContext.Provider value={mockValue}>
        {children}
      </MockAuthContext.Provider>
    );
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      {children}
    </ClerkProvider>
  );
}
