# Expo React Native Template

A production-ready Expo React Native template with semantic versioning, CI/CD workflows, modular monolith architecture, and dynamic configuration.

## Getting Started

### 1. Clone the Template

```bash
git clone https://github.com/Softaims/expo-rn-template.git your-app-name
cd your-app-name
rm -rf .git
```

### 2. Reset Project for Your App

Run the reset script to configure the project with your app name. This will:
- Update `package.json` with your app name and reset version to `1.0.0`
- Update `app.config.ts` with `APP_NAME`, `SLUG`, and `SCHEME`
- Reset `CHANGELOG.md`

```bash
npm run reset -- your-app-name
```

Or directly:

```bash
npx tsx scripts/reset.ts your-app-name
```

After running the reset script, manually update these fields in `app.config.ts`:

```typescript
const BUNDLE_IDENTIFIER = "com.yourcompany.yourapp";  // iOS bundle identifier
const PACKAGE_NAME = "com.yourcompany.yourapp";       // Android package name
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Initialize Git Repository

Before pushing your first commit, create both `main` and `production` branches. This is **required** for semantic-release to work properly.

```bash
git init
git add .
git commit -m "chore: initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git

# Create production branch (required for semantic-release)
git checkout -b production
git push -u origin production

# Switch back to main and push
git checkout main
git push -u origin main
```

> **Important**: The `production` branch must exist before pushing to `main`, otherwise semantic-release will fail.

### 5. Start the App (with dev client)

This template uses native modules like **`react-native-mmkv`**, which are **not supported in Expo Go**.  
You should run it using a **development build (dev client)**:

```bash
# 1. (First time / after native changes) generate native projects
npx expo prebuild --clean

# 2. Run on iOS simulator or device
npx expo run:ios

# 3. In another terminal, start Metro for the dev client
npx expo start --dev-client
```

For Android, use:

```bash
npx expo run:android
npx expo start --dev-client
```

---

## Required Setup (Template Configuration)

When using this template for a new project, you **must** configure the following:

### Environment Variables

Create a `.env` file with at least:

| Variable | Description |
|----------|-------------|
| `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk authentication publishable key (optional in local dev, required for real auth) |
| `SENTRY_AUTH_TOKEN` | Sentry authentication token for error tracking (used in CI/CD) |

Local development notes:

- If `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` is **not set**, the template falls back to a **mock auth mode**:
  - `AuthProvider` does **not** connect to Clerk.
  - `useAuth` and related hooks report `isSignedIn = false`, `isLoaded = true`.
  - The root layout skips auth/onboarding and opens the main tabs so you can work on the app without backend auth.
- In staging/production, set `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` and restart the dev client to use real Clerk flows.

### Dynamic App Configuration

This project uses **dynamic configuration** via `app.config.ts` instead of a static `app.json`. This allows for:
- Environment-based configuration
- Computed values (like build numbers from version)
- TypeScript type safety

#### Required Fields (Set Immediately)

Update these fields in `app.config.ts` before starting development:

```typescript
// App configuration
const APP_NAME = "your-app-name";           // Display name of your app
const SLUG = "your-app-slug";               // URL-friendly identifier
const SCHEME = "your-app-scheme";           // Deep linking scheme
const BUNDLE_IDENTIFIER = "com.your.app";   // iOS bundle identifier
const PACKAGE_NAME = "com.your.app";        // Android package name

// SENTRY configuration
const SENTRY_PROJECT = "your-sentry-project";
const SENTRY_ORGANIZATION = "your-sentry-org";
```

#### Optional Fields (Set Later)

These can be configured when you're ready to deploy:

```typescript
// EAS configuration
const EAS_PROJECT_ID = "your-eas-project-id";
const EAS_PROJECT_OWNER = "your-eas-owner";  // For EAS Organization only
```

---

## Semantic Versioning & Release Workflow

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) with [Conventional Commits](https://www.conventionalcommits.org/) for automated versioning.

### Version Format

- **Development (main)**: `X.Y.Z-alpha.N` (e.g., `1.2.0-alpha.1`, `1.2.0-alpha.2`)
- **Production**: `X.Y.Z` (e.g., `1.2.0`, `1.3.0`, `2.0.0`)

### Commit Message Rules

| Commit Type | Description | Version Bump |
|-------------|-------------|--------------|
| `feat:` | New feature | Minor (`1.0.0` → `1.1.0`) |
| `fix:` | Bug fix | Patch (`1.0.0` → `1.0.1`) |
| `perf:` | Performance improvement | Patch |
| `refactor:` | Code refactoring | Patch |
| `feat!:` or `BREAKING CHANGE:` | Breaking change | Major (`1.0.0` → `2.0.0`) |
| `docs:` | Documentation only | No release |
| `chore:` | Maintenance tasks | No release |
| `style:` | Code style changes | No release |
| `test:` | Test changes | No release |

### Branch Strategy & Workflow

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                           DEVELOPMENT LIFECYCLE                               │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   main (development branch)              production (stable releases)        │
│   ─────────────────────────              ───────────────────────────         │
│                                                                              │
│   feat: initial setup                                                        │
│   └── 1.0.0-alpha.1                                                          │
│                                                                              │
│   fix: auth bug                                                              │
│   └── 1.0.0-alpha.2                                                          │
│                                                                              │
│   feat: add dashboard                                                        │
│   └── 1.1.0-alpha.1                                                          │
│           │                                                                  │
│           └──────── PR: main → production ────────►  1.1.0 (first release)  │
│                                                          │                   │
│   ◄─────────────────── git pull ─────────────────────────┘                   │
│                                                                              │
│   fix: dashboard crash                                                       │
│   └── 1.1.1-alpha.1                                                          │
│                                                                              │
│   feat: user profiles                                                        │
│   └── 1.2.0-alpha.1                                                          │
│                                                                              │
│   fix: profile image                                                         │
│   └── 1.2.0-alpha.2                                                          │
│           │                                                                  │
│           └──────── PR: main → production ────────►  1.2.0                   │
│                                                          │                   │
│   ◄─────────────────── git pull ─────────────────────────┘                   │
│                                                                              │
│   feat!: redesign API (BREAKING)                                             │
│   └── 2.0.0-alpha.1                                                          │
│                                                                              │
│   feat: notifications                                                        │
│   └── 2.1.0-alpha.1                                                          │
│           │                                                                  │
│           └──────── PR: main → production ────────►  2.1.0                   │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Complete Version Simulation (Starting from 1.0.0)

Here's a detailed walkthrough of how versions evolve through the development lifecycle:

#### Phase 1: Initial Development

| Step | Branch | Commit | Resulting Version | Notes |
|------|--------|--------|-------------------|-------|
| 1 | `main` | `feat: add authentication` | `1.0.0-alpha.1` | First feature, alpha release |
| 2 | `main` | `fix: login validation` | `1.0.0-alpha.2` | Patch doesn't bump minor |
| 3 | `main` | `feat: add home screen` | `1.1.0-alpha.1` | New feature bumps minor |
| 4 | `main` | `fix: home screen layout` | `1.1.0-alpha.2` | Another alpha iteration |
| 5 | `main` | `docs: update readme` | — | No release (docs) |

#### Phase 2: First Production Release

| Step | Action | Result |
|------|--------|--------|
| 6 | Create PR: `main` → `production` | — |
| 7 | Merge PR | `production` releases **1.1.0** |
| 8 | Merge `production` → `main` | Sync stable version back to `main` |
| 9 | `git pull` on local `main` | Sync version to local |

#### Phase 3: Continued Development

| Step | Branch | Commit | Resulting Version | Notes |
|------|--------|--------|-------------------|-------|
| 10 | `main` | `fix: critical bug` | `1.1.1-alpha.1` | Patch version for fix |
| 11 | `main` | `perf: optimize queries` | `1.1.2-alpha.1` | Performance = patch |
| 12 | `main` | `feat: user settings` | `1.2.0-alpha.1` | Feature bumps minor |
| 13 | `main` | `refactor: clean code` | `1.2.1-alpha.1` | Refactor = patch |

#### Phase 4: Second Production Release

| Step | Action | Result |
|------|--------|--------|
| 14 | Merge PR to `production` | `production` releases **1.2.1** |
| 15 | Merge `production` → `main` | Sync stable version back to `main` |
| 16 | `git pull` on local `main` | Sync version to local |

#### Phase 5: Breaking Change

| Step | Branch | Commit | Resulting Version | Notes |
|------|--------|--------|-------------------|-------|
| 17 | `main` | `feat!: new API structure` | `2.0.0-alpha.1` | Breaking change = major |
| 18 | `main` | `feat: dark mode` | `2.1.0-alpha.1` | Feature bumps minor |
| 19 | `main` | `fix: theme toggle` | `2.1.0-alpha.2` | Patch in alpha |

#### Phase 6: Major Production Release

| Step | Action | Result |
|------|--------|--------|
| 20 | Merge PR to `production` | `production` releases **2.1.0** |
| 21 | Merge `production` → `main` | Sync stable version back to `main` |

### Workflow Details

#### 1. Development on `main` Branch

- All development happens on `main`
- Each qualifying commit triggers the Development CI workflow
- Versions are tagged as alpha pre-releases: `1.0.0-alpha.1`, `1.0.0-alpha.2`, etc.
- Alpha releases increment automatically with each commit

> **Important**: After pushing, semantic-release bot creates a new commit with updated `package.json`, `package-lock.json`, and `CHANGELOG.md`. Always run `git pull` to sync your local repository before continuing development.

#### 2. Production Release

When ready to release:

1. Create a Pull Request from `main` → `production`
2. Merge the PR
3. Production CI workflow runs automatically
4. Semantic-release creates a stable version (removes `-alpha.N` suffix)
5. A GitHub release is created with changelog

**Production workflow supports:**
- **OTA updates**: For code-only changes (use "OTA" label on PR)
- **Full builds**: For native changes (use "BUILD" label or default)
- **Manual trigger**: Via workflow_dispatch

#### 3. Sync After Production Release (Required)

After every production release, you **must** merge `production` back into `main` to sync the stable version:

```bash
# On main branch
git checkout main
git pull origin main

# Merge production into main
git merge origin/production

# Push the sync
git push origin main
```

Or create a PR from `production` → `main` and merge it.

> **Why is this required?** Semantic-release creates a commit on `production` with the stable version (e.g., `1.1.0`). Without merging back, `main` won't have this version update, causing version conflicts and incorrect alpha versioning in subsequent releases.

#### 4. Continue Development

After syncing:

1. Continue development on `main`
2. Next commits will create new alpha versions based on the synced stable version
3. Example: After syncing `1.1.0`, next feature commit creates `1.2.0-alpha.1`

### Syncing After Releases (Summary)

| Event | Action Required |
|-------|-----------------|
| Push to `main` | `git pull origin main` (semantic-release creates alpha version commit) |
| Merge to `production` | Merge `production` → `main` (sync stable version back) |

**After pushing to `main`:**

```bash
git push origin main
# Wait for CI to complete...
git pull origin main
```

**After production release:**

```bash
git checkout main
git pull origin main
git merge origin/production
git push origin main
```

This ensures your local repository and `main` branch stay in sync with all version commits.

### Build Number Calculation

Build numbers are automatically calculated from the version using the format `MMNNPP0000`:
- `M` = Major version (2 digits)
- `N` = Minor version (2 digits)
- `P` = Patch version (2 digits)

Examples:
- `1.2.3` → `102030000`
- `7.17.10` → `717100000`

---

## Storage & Client State

### MMKV-based storage (`lib/storage.ts`)

This template uses **[react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)** as the default key–value store instead of AsyncStorage.

- Synchronous API, no bridge round-trips
- Backed by a single `MMKV` instance with a simple wrapper:
  - `storage.get(key): string | null`
  - `storage.set(key, value: string): void`
  - `storage.getObject<T>(key): T | null`
  - `storage.setObject<T>(key, value: T): void`
  - `storage.remove(key): void`
  - `storage.clear(): void`
- All operations are safe-wrapped (`try/catch`) so failures don’t crash the app.

Use it for small app-level flags and simple objects. For more complex app state, use the Zustand stores below.

### Zustand + MMKV (`modules/appState/stores`)

Global client state is managed with [Zustand](https://github.com/pmndrs/zustand) + its `persist` middleware, using MMKV as the backend (`lib/mmkvStorage.ts`).

Out of the box, the template ships with:

- `useOnboardingStore` (`modules/appState/stores/onboardingStore.ts`)
  - Shape: `{ hasSeenOnboarding, setHasSeenOnboarding, reset }`
  - Persists to MMKV under `STORAGE_KEYS.HAS_SEEN_ONBOARDING`
  - Used by `app/_layout.tsx` to decide whether to show splash/onboarding.
- `usePreferencesStore` (`modules/appState/stores/preferencesStore.ts`)
  - Shape: `{ theme: "light" | "dark" | "system", hapticsEnabled, setTheme, setHapticsEnabled, reset }`
  - Persists to MMKV under `"preferences"`.

Pattern for new persisted stores:

```ts
import { mmkvZustandStorage } from "@/lib/mmkvStorage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type MyState = { /* ... */ };

export const useMyStore = create<MyState>()(
  persist(
    (set) => ({ /* state + actions */ }),
    {
      name: "my-store-key",
      storage: mmkvZustandStorage,
      partialize: (state) => ({ /* choose fields to persist */ }),
    },
  ),
);
```

> **Note:** Because MMKV requires a dev client, you cannot rely on these stores when running in Expo Go.

---

## Styling & Theming

### Tailwind + NativeWind + CSS variables

Styling is based on:

- **Tailwind CSS tokens** defined in `global.css` (`:root` and `.dark`) and wired into `tailwind.config.js`.
- **NativeWind** for `className` support in React Native.

Key pieces:

- `global.css` – light/dark theme color tokens:
  - `--color-primary`, `--color-background`, `--color-border`, `--color-chat-message`, etc.
- `tailwind.config.js` – maps CSS variables to Tailwind color tokens:
  - `bg-background`, `text-primary`, `border-border`, `bg-chat-message`, …
- Use **`className`** whenever possible:
  - Layout and spacing: `className="flex-1 px-4 pt-6"`
  - Colors: `className="bg-background text-primary border-border"`

### Theme module (`lib/theme`)

For places where you need **JS-based theme objects** (e.g. `style={...}` or logic that depends on colors/typography), use the theme module:

- `lib/theme/colors.ts`
  - `lightColors` / `darkColors` + `themeColors` map, aligned with `global.css`.
- `lib/theme/fonts.ts`
  - `typography` object with Figma-style text tokens:

    ```ts
    typography.heading1 // { fontFamily, fontSize, lineHeight, ... }
    typography.body
    typography.caption
    typography.label
    ```

- `lib/theme/ThemeProvider.tsx`
  - Optional context; **not wired into `_layout` by default**.
  - Usage:

    ```tsx
    import { ThemeProvider, useTheme } from "@/lib/theme";

    // Wrap part of your tree
    <ThemeProvider>
      <App />
    </ThemeProvider>

    // Consume in components
    const { colors, typography, isDark, mode, setMode } = useTheme();
    ```

You can use `typography` directly without the provider:

```tsx
import { typography } from "@/lib/theme";

<Text style={typography.heading1}>Title</Text>
<Text style={[typography.body, { color: "#6B7280" }]}>Body</Text>
```

### Component-level style helpers

- `lib/utils.ts` – `cn(...)` helper for className merging.
- `lib/component-styles.ts` – typed helpers for components that accept `classes` + `styles` overrides (see file docs).

Use these to keep components themeable and avoid duplicated style logic.

---

## Authentication & Environment

### Clerk integration (`modules/auth`)

Auth is implemented with **Clerk**:

- `modules/auth/providers/AuthProvider.tsx`
  - Wraps `ClerkProvider` with a `tokenCache`.
  - Reads `process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`.
  - If the key is **present**, real Clerk auth is used.
  - If the key is **missing**, a **mock auth context** is provided:
    - `useAuth` returns a safe mock value.
    - Screen hooks still work, but login/signup flows are effectively no-ops.
- `modules/auth/hooks/useClerkAuth.ts`
  - Thin wrappers around Clerk hooks (`useLogin`, `useRegister`, `useForgotPassword`, `useResetPassword`, `useGoogleOAuth`, `useAppleOAuth`, `useSignOut`, `useDeleteAccount`).
  - All hooks **respect mock mode** to avoid crashes when the Clerk key is not configured.

### Auth screen hooks (`modules/auth/hooks`)

Screen-specific hooks (used by `modules/auth/screens/*`) follow a consistent pattern:

- `useLoginScreen`
- `useSignupScreen`
- `useForgotPasswordScreen`
- `useOTPVerificationScreen`
- `useResetPasswordScreen`

Each:

- Owns its own `isLoading` / `isSubmitting` flag.
- Wraps async auth calls in `try { ... } finally { setIsLoading(false) }` so the UI never gets stuck in a loading state if an error occurs.
- Uses routing helpers from `lib/routingUtils.ts` for navigation and shared alert helpers from `components/alerts`.

---

## Fonts & `useFonts`

### Where fonts live

- Font files belong in: `assets/fonts/`
- The template expects the **SharpSans** family with specific file names, wired in `hooks/useFonts.ts`.

If you replace fonts:

1. Put your `.ttf` / `.otf` files into `assets/fonts/`.
2. Update `hooks/useFonts.ts` `require(...)` calls.
3. Update `typography` in `lib/theme/fonts.ts` to use your family names.

### Font loading (`hooks/useFonts.ts`)

`useFonts` is a thin wrapper around `expo-font`:

```ts
import { useFonts as useExpoFonts } from "expo-font";

export function useFonts() {
  const [loaded, error] = useExpoFonts({
    /* familyName: require("../assets/fonts/YourFont.ttf") */
  });

  if (error) {
    console.warn(
      "[fonts] Failed to load custom fonts. Falling back to system fonts.",
      error
    );
    return { loaded: true, error }; // avoid blocking app on font failures
  }

  return { loaded, error };
}
```

In `app/_layout.tsx`, the app waits for `loaded` before rendering; if there is a load error, it logs a warning and **falls back to system fonts** instead of blocking on the splash screen.

Use `typography` (JS) and Tailwind `font-*` classes together to keep font usage consistent.

---

## Project Architecture: Modular Monolith

This project follows the **Modular Monolith** design pattern - an all-in-one project where each feature lives in a separate module/shell.

> **Reference**: [Modular Monolith: A disruptive guide to architecting your React app](https://dev.to/artiumws/modular-monolith-a-disruptive-guide-to-architecting-your-react-app-2gji)

### Why Modular Monolith?

- **Scalable**: Can scale both up and down with team size
- **Low complexity**: Easy onboarding for new team members
- **No conflicts**: Multiple teams can work without stepping on each other
- **Single deployment**: One CI/CD pipeline, easy to maintain
- **Clear ownership**: Each module has defined boundaries

### Directory Structure

```
├── app/                    # Routing layer only (Expo Router)
│   ├── _layout.tsx
│   ├── (auth)/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── forgotPassword/
│   │   └── ...
│   ├── (tabs)/
│   │   ├── (settings)/
│   │   └── ...
│   └── (legal)/
│
├── modules/                # Feature modules (business logic)
│   ├── auth/
│   │   ├── screens/        # Screen components
│   │   ├── components/     # UI components
│   │   ├── hooks/          # Custom hooks
│   │   ├── config/         # Configuration
│   │   ├── schemas/        # Validation schemas
│   │   ├── types.ts        # TypeScript types
│   │   └── index.ts        # Public exports
│   ├── settings/
│   ├── chat/
│   ├── notifications/
│   ├── legal/
│   ├── splash/
│   ├── sentry/
│   └── commons/            # Shared components across modules
```

### Key Principles

| Directory | Responsibility |
|-----------|----------------|
| `app/` | **Routing only** - File-based routing with Expo Router. Minimal logic, just imports screens from modules. |
| `modules/` | **Feature logic** - Each module contains its own screens, components, hooks, configs, and types. Modules are self-contained and don't share internal logic. |
| `modules/commons/` | **Shared utilities** - Components or logic needed across multiple modules. |

### Module Structure

Each module follows a consistent structure:

```
modules/[feature]/
├── screens/          # Screen components (imported by app/ routes)
├── components/       # Feature-specific UI components
├── hooks/            # Custom React hooks
├── config/           # Feature configuration
├── schemas/          # Zod/Yup validation schemas
├── types.ts          # TypeScript interfaces/types
└── index.ts          # Public API exports
```

---

## Learn More

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Semantic Release](https://github.com/semantic-release/semantic-release)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Modular Monolith Architecture](https://dev.to/artiumws/modular-monolith-a-disruptive-guide-to-architecting-your-react-app-2gji)
