## Expo RN Template – Developer Manual

This manual explains what the template includes and how to use it to build your app.

---

## 1. What This Template Gives You

- **Expo SDK 54 + React Native 0.81** with Expo Router.
- **Modular Monolith architecture** (`app/` for routes, `modules/` for features).
- **MMKV-based storage** and **Zustand** for client state.
- **Clerk auth integration** with an automatic **mock mode** for local dev.
- **Semantic-release** and Conventional Commits for automated versioning.
- **Tailwind + NativeWind + theme module** for styling, colors, and typography.
- **Storybook** wiring for component playgrounds.

You can treat this as a production-ready baseline: drop your features into `modules/*` and wire routes in `app/`.

---

## 2. First-Time Setup

### 2.1. Clone and reset

```bash
git clone https://github.com/Softaims/expo-rn-template.git your-app-name
cd your-app-name
rm -rf .git

# Option A – npm script
npm run reset -- your-app-name

# Option B – direct script
npx tsx scripts/reset.ts your-app-name
```

The reset script:

- Sets `name` and version in `package.json`.
- Updates `APP_NAME`, `SLUG`, `SCHEME` in `app.config.ts`.
- Resets `CHANGELOG.md`.

Then, manually update in `app.config.ts`:

- `BUNDLE_IDENTIFIER` – iOS bundle id (e.g. `com.yourcompany.yourapp`)
- `PACKAGE_NAME` – Android application id (same pattern)

### 2.2. Install dependencies

```bash
npm install
```

### 2.3. Create env file

Create `.env` in the project root:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key   # Optional for local, required for real auth
SENTRY_AUTH_TOKEN=your-sentry-auth-token                       # Used in CI/CD
```

Notes:

- If `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` is **missing**, the template runs in **mock auth mode** (see section 5).
- For production/staging, always set a real Clerk key.

### 2.4. Run with a dev client (MMKV requirement)

This template uses **`react-native-mmkv`**, which is not supported in Expo Go. Use a dev client:

```bash
# 1. Generate native projects (first time / after native deps change)
npx expo prebuild --clean

# 2. iOS dev client
npx expo run:ios

# 3. Start Metro for dev client
npx expo start --dev-client
```

For Android:

```bash
npx expo run:android
npx expo start --dev-client
```

---

## 3. Project Structure Overview

- `app/`
  - File-based routes for Expo Router.
  - Contains layout (`_layout.tsx`) and route groups: `(auth)`, `(tabs)`, `(splash)`, `(legal)`, etc.
- `modules/`
  - Feature modules: `auth`, `settings`, `chat`, `splash`, `legal`, `sentry`, `commons`, etc.
  - Each module has `screens/`, `components/`, `hooks/`, `config/`, `schemas/`, `types.ts`, `index.ts`.
- `lib/`
  - Cross-cutting utilities:
  - `storage.ts` – MMKV wrapper.
  - `mmkvStorage.ts` – MMKV backend for Zustand `persist`.
  - `axios.ts` – HTTP client with Sentry integration.
  - `routingUtils.ts` – Navigation helpers.
  - `component-styles.ts` – helpers for themeable component styles.
  - `theme/` – colors, typography, optional `ThemeProvider`.
- `components/`
  - Shared UI pieces (`alerts`, `inputs`, `dropdown`, `text`, etc.).
- `hooks/`
  - App-level hooks, like `useFonts`.
- `global.css`
  - CSS variables for light/dark colors.
- `tailwind.config.js`
  - Tailwind + NativeWind setup wired to `global.css`.

Use `modules/*` for feature implementation and keep `app/*` as the routing shell.

---

## 4. Storage & Client State

### 4.1. MMKV storage (`lib/storage.ts`)

The template uses a single MMKV instance as a simple key–value store:

```ts
import { storage } from "@/lib/storage";

storage.set("has_seen_onboarding", "true");
const value = storage.get("has_seen_onboarding"); // "true" | null

storage.setObject("profile", { name: "Jane" });
const profile = storage.getObject<{ name: string }>("profile");
```

API:

- `get(key): string | null`
- `set(key, value: string): void`
- `getObject<T>(key): T | null`
- `setObject<T>(key, value: T): void`
- `remove(key): void`
- `clear(): void`

All methods are wrapped in `try/catch` so storage failures don’t crash the app.

### 4.2. Zustand + MMKV (`modules/appState/stores`)

Persisted client state uses Zustand with MMKV as the backend:

- `lib/mmkvStorage.ts` implements `StateStorage` for Zustand’s `persist`.
- Stores:
  - `useOnboardingStore` – onboarding flag:

    ```ts
    const { hasSeenOnboarding, setHasSeenOnboarding } = useOnboardingStore();
    ```

  - `usePreferencesStore` – theme & haptics:

    ```ts
    const { theme, setTheme, hapticsEnabled, setHapticsEnabled } = usePreferencesStore();
    ```

Pattern for a new persisted store:

```ts
import { mmkvZustandStorage } from "@/lib/mmkvStorage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type MyState = {
  foo: string;
  setFoo: (v: string) => void;
};

export const useMyStore = create<MyState>()(
  persist(
    (set) => ({
      foo: "",
      setFoo: (v) => set({ foo: v }),
    }),
    {
      name: "my-store",
      storage: mmkvZustandStorage,
      partialize: (state) => ({ foo: state.foo }), // choose what to persist
    },
  ),
);
```

---

## 5. Authentication & Mock Mode

### 5.1. AuthProvider (`modules/auth/providers/AuthProvider.tsx`)

The main provider:

- Reads `process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`.
- If **present**:
  - Wraps children in `ClerkProvider` with a `tokenCache`.
- If **missing**:
  - Wraps children in a **mock auth context** (`MockAuthContext`).
  - `useAuth` and other hooks return safe mock values so the app still runs.

`app/_layout.tsx` always wraps the tree in `AuthProvider`, so you don’t need to think about this when adding new screens.

### 5.2. Auth hooks (`modules/auth/hooks/useClerkAuth.ts`)

These hooks wrap Clerk’s primitives:

- `useAuth()` – current user + `signOut`, `getToken`.
- `useLogin()` – login helper.
- `useRegister()` – signup helper.
- `useForgotPassword()` – forgot-password flow.
- `useResetPassword()` – reset-password flow.
- `useChangePassword()` – account password change.
- `useGoogleOAuth()` / `useAppleOAuth()` – social sign-in.
- `useSignOut()` / `useDeleteAccount()` – sign-out / delete account.

All of them:

- First check `useMockAuth()`; if in mock mode, return safe no-op implementations.
- Fall back to real Clerk hooks when the publishable key is set.

### 5.3. Screen hooks (`modules/auth/hooks/*Screen.ts`)

Screen-specific hooks encapsulate UI state + navigation:

- `useLoginScreen`
- `useSignupScreen`
- `useForgotPasswordScreen`
- `useOTPVerificationScreen`
- `useResetPasswordScreen`

Each:

- Holds `isLoading` (or `isSubmitting`) in local state.
- Wraps async calls in `try { ... } finally { setIsLoading(false) }` so the UI never gets stuck in a loading state.
- Uses `useRoutingUtils` for navigation (`push`, `replace`, `back`, `dismissAll`).
- Uses shared alert helpers (`showErrorAlert`, `showSuccessAlert`).

You generally don’t call `useClerkAuth` directly from screens; use these higher-level hooks instead.

---

## 6. Styling, Theming, and Typography

### 6.1. Tailwind + NativeWind + CSS variables

- `global.css` defines CSS variables for colors in `:root` (light) and `.dark` (dark).
- `tailwind.config.js` maps them to Tailwind tokens (`primary`, `background`, `border`, etc.).
- NativeWind allows `className` usage in React Native.

Examples:

```tsx
<View className="flex-1 bg-background px-4 pt-6">
  <Text className="text-primary font-bold">Hello</Text>
</View>
```

To switch themes at runtime:

- Toggle the `dark` class at the root of the app (e.g., using `ThemeProvider` and a `useEffect` that sets a class on the root view when `resolvedMode` changes).

### 6.2. Theme module (`lib/theme`)

Use the theme module for JS-based theme information:

- `lib/theme/colors.ts`
  - `lightColors`, `darkColors`, `themeColors` – JS equivalents of `global.css` tokens.
- `lib/theme/fonts.ts`
  - `typography` – central definition of text styles (font family, size, line height, etc.).
- `lib/theme/ThemeProvider.tsx`
  - Optional `ThemeProvider` and `useTheme` hook:

    ```tsx
    import { ThemeProvider, useTheme } from "@/lib/theme";

    function AppShell() {
      const { colors, typography, isDark, mode, setMode } = useTheme();
      // use in inline styles or logic
    }
    ```

  - Not wired into `_layout.tsx` by default—opt in when you need it.

Direct typography usage:

```tsx
import { typography } from "@/lib/theme";

<Text style={typography.heading1}>Screen title</Text>
<Text style={[typography.body, { color: "#4B5563" }]}>
  Body text
</Text>
```

### 6.3. Component style helpers

- `lib/utils.ts` – `cn(...inputs)` to merge class names.
- `lib/component-styles.ts` – utilities for components that accept `classes` and `styles` overrides.

Use these to build design-system components that are:

- Themed via `className` and `typography`.
- Overridable via typed props.

---

## 7. Fonts & `useFonts`

### 7.1. Changing fonts

Fonts live in `assets/fonts`. To swap fonts:

1. Add your `.ttf` / `.otf` files to `assets/fonts/`.
2. Update `hooks/useFonts.ts` `require(...)` map with your files.
3. Update `typography` in `lib/theme/fonts.ts` to reference your new family names.
4. Optionally, update `tailwind.config.js` `fontFamily` entries for `font-*` utilities.

### 7.2. Font loading behavior

`hooks/useFonts.ts` is the single place where fonts are registered with `expo-font`. It:

- Loads all declared fonts.
- Logs a warning and returns `loaded: true` if there’s an error (falling back to system fonts).
- Is used in `app/_layout.tsx` to delay rendering until fonts are ready (or known to have failed).

This prevents the app from getting stuck on the splash screen due to font issues.

---

## 8. When You Add New Features

Use this checklist when adding new functionality:

- **Routing**
  - Add a route file in `app/` (e.g. `app/(tabs)/(settings)/notifications.tsx`).
  - That file should export a component from `modules/*/screens`.
- **Module structure**
  - Create a new folder under `modules/featureName/`.
  - Add `screens/`, `components/`, `hooks/`, `config/`, `schemas/`, `types.ts`, `index.ts` as needed.
- **State**
  - For persisted app-wide flags: add a Zustand store in `modules/appState/stores` using `mmkvZustandStorage`.
  - For per-screen loading, follow the `use*Screen` pattern (`try/finally` for loading).
- **Styling**
  - Prefer `className` + Tailwind tokens for layout and colors.
  - Use `typography` for text styles instead of hardcoding `fontFamily` / `fontSize`.
- **Auth**
  - Use the existing screen hooks for auth flows rather than calling Clerk directly.
  - Ensure behavior is sensible in mock mode (when the Clerk key is absent).
- **Docs**
  - If you add a new top-level concept (new module, new global store), consider linking it from `README.md` or this `USER_MANUAL.md`.

With this structure and these patterns, you should be able to onboard quickly, keep features isolated in modules, and extend the template without fighting the underlying architecture.

