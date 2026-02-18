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
const BUNDLE_IDENTIFIER = "com.yourcompany.yourapp"; // iOS bundle identifier
const PACKAGE_NAME = "com.yourcompany.yourapp"; // Android package name
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

### 5. Start the App

```bash
npx expo start
```

You can open the app in:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

---

## Required Setup (Template Configuration)

When using this template for a new project, you **must** configure the following:

### Environment Variables

Create a `.env` file with the following variables:

| Variable                            | Description                                    |
| ----------------------------------- | ---------------------------------------------- |
| `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk authentication publishable key           |
| `SENTRY_AUTH_TOKEN`                 | Sentry authentication token for error tracking |

### Dynamic App Configuration

This project uses **dynamic configuration** via `app.config.ts` instead of a static `app.json`. This allows for:

- Environment-based configuration
- Computed values (like build numbers from version)
- TypeScript type safety

#### Required Fields (Set Immediately)

Update these fields in `app.config.ts` before starting development:

```typescript
// App configuration
const APP_NAME = "your-app-name"; // Display name of your app
const SLUG = "your-app-slug"; // URL-friendly identifier
const SCHEME = "your-app-scheme"; // Deep linking scheme
const BUNDLE_IDENTIFIER = "com.your.app"; // iOS bundle identifier
const PACKAGE_NAME = "com.your.app"; // Android package name

// SENTRY configuration
const SENTRY_PROJECT = "your-sentry-project";
const SENTRY_ORGANIZATION = "your-sentry-org";
```

#### Optional Fields (Set Later)

These can be configured when you're ready to deploy:

```typescript
// EAS configuration
const EAS_PROJECT_ID = "your-eas-project-id";
const EAS_PROJECT_OWNER = "your-eas-owner"; // For EAS Organization only
```

---

## Semantic Versioning & Release Workflow

This project uses [semantic-release](https://github.com/semantic-release/semantic-release) with [Conventional Commits](https://www.conventionalcommits.org/) for automated versioning.

### Version Format

- **Development (main)**: `X.Y.Z-alpha.N` (e.g., `1.2.0-alpha.1`, `1.2.0-alpha.2`)
- **Production**: `X.Y.Z` (e.g., `1.2.0`, `1.3.0`, `2.0.0`)

### Commit Message Rules

| Commit Type                    | Description             | Version Bump              |
| ------------------------------ | ----------------------- | ------------------------- |
| `feat:`                        | New feature             | Minor (`1.0.0` → `1.1.0`) |
| `fix:`                         | Bug fix                 | Patch (`1.0.0` → `1.0.1`) |
| `perf:`                        | Performance improvement | Patch                     |
| `refactor:`                    | Code refactoring        | Patch                     |
| `feat!:` or `BREAKING CHANGE:` | Breaking change         | Major (`1.0.0` → `2.0.0`) |
| `docs:`                        | Documentation only      | No release                |
| `chore:`                       | Maintenance tasks       | No release                |
| `style:`                       | Code style changes      | No release                |
| `test:`                        | Test changes            | No release                |

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

| Step | Branch | Commit                     | Resulting Version | Notes                        |
| ---- | ------ | -------------------------- | ----------------- | ---------------------------- |
| 1    | `main` | `feat: add authentication` | `1.0.0-alpha.1`   | First feature, alpha release |
| 2    | `main` | `fix: login validation`    | `1.0.0-alpha.2`   | Patch doesn't bump minor     |
| 3    | `main` | `feat: add home screen`    | `1.1.0-alpha.1`   | New feature bumps minor      |
| 4    | `main` | `fix: home screen layout`  | `1.1.0-alpha.2`   | Another alpha iteration      |
| 5    | `main` | `docs: update readme`      | —                 | No release (docs)            |

#### Phase 2: First Production Release

| Step | Action                           | Result                             |
| ---- | -------------------------------- | ---------------------------------- |
| 6    | Create PR: `main` → `production` | —                                  |
| 7    | Merge PR                         | `production` releases **1.1.0**    |
| 8    | Merge `production` → `main`      | Sync stable version back to `main` |
| 9    | `git pull` on local `main`       | Sync version to local              |

#### Phase 3: Continued Development

| Step | Branch | Commit                   | Resulting Version | Notes                 |
| ---- | ------ | ------------------------ | ----------------- | --------------------- |
| 10   | `main` | `fix: critical bug`      | `1.1.1-alpha.1`   | Patch version for fix |
| 11   | `main` | `perf: optimize queries` | `1.1.2-alpha.1`   | Performance = patch   |
| 12   | `main` | `feat: user settings`    | `1.2.0-alpha.1`   | Feature bumps minor   |
| 13   | `main` | `refactor: clean code`   | `1.2.1-alpha.1`   | Refactor = patch      |

#### Phase 4: Second Production Release

| Step | Action                      | Result                             |
| ---- | --------------------------- | ---------------------------------- |
| 14   | Merge PR to `production`    | `production` releases **1.2.1**    |
| 15   | Merge `production` → `main` | Sync stable version back to `main` |
| 16   | `git pull` on local `main`  | Sync version to local              |

#### Phase 5: Breaking Change

| Step | Branch | Commit                     | Resulting Version | Notes                   |
| ---- | ------ | -------------------------- | ----------------- | ----------------------- |
| 17   | `main` | `feat!: new API structure` | `2.0.0-alpha.1`   | Breaking change = major |
| 18   | `main` | `feat: dark mode`          | `2.1.0-alpha.1`   | Feature bumps minor     |
| 19   | `main` | `fix: theme toggle`        | `2.1.0-alpha.2`   | Patch in alpha          |

#### Phase 6: Major Production Release

| Step | Action                      | Result                             |
| ---- | --------------------------- | ---------------------------------- |
| 20   | Merge PR to `production`    | `production` releases **2.1.0**    |
| 21   | Merge `production` → `main` | Sync stable version back to `main` |

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

| Event                 | Action Required                                                        |
| --------------------- | ---------------------------------------------------------------------- |
| Push to `main`        | `git pull origin main` (semantic-release creates alpha version commit) |
| Merge to `production` | Merge `production` → `main` (sync stable version back)                 |

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
├── app/              # Expo Router (routing only)
├── assets/
│   ├── icons/
│   ├── images/
│   └── svgs/
├── components/       # Shared UI components
├── features/         # Feature modules (business logic)
│   ├── auth/
│   ├── quran/
│   ├── namaz/
│   └── dua/
├── hooks/
├── services/
├── store/
├── theme/
└── utils/
```

Each feature folder must follow this exact structure:

```
features/[feature]/
├── screens/
├── components/
├── hooks/
└── services/
```

### Key Principles

| Directory     | Responsibility                                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `app/`        | **Routing only** - File-based routing with Expo Router. Minimal logic, just imports screens from features.               |
| `components/` | **Shared UI** - Reusable components used across features.                                                                |
| `features/`   | **Feature logic** - Each feature contains its own screens, components, hooks, and services. Features are self-contained. |
| `hooks/`      | **Shared custom React hooks** used across features.                                                                      |
| `store/`      | **Global state management**.                                                                                             |
| `theme/`      | **Design tokens** - Colors, typography, spacing.                                                                         |
| `utils/`      | **Pure utility/helper functions**.                                                                                       |

---

## API & Data Layer

- All API calls live inside `src/services/`.
- Never call API directly from UI components.
- Use Axios or Fetch wrapper.
- All responses must be typed.

**Service file naming:**

```
services/
├── auth.service.ts
├── namaz.service.ts
└── quran.service.ts
```

**Example pattern:**

```typescript
export const getNamazTimes = async () => {
  const res = await api.get("/namaz/times");
  return res.data;
};
```

**Error handling rules:**

- Never swallow errors.
- Normalize error responses.
- Use try/catch in the service layer.
- UI handles only: loading, error, success states.

**TanStack Query rules:**

- Standardized query keys.
- Queries only inside hooks.
- No query logic inside UI components.

---

## TODO Management

- A `todo.md` file must exist at the root of the project.
- It must stay updated after every major change.
- Use `[ ]` for pending and `[x]` for completed tasks.
- Break large tasks into subtasks.
- Reorder tasks logically.

---

## Code Quality Standards

- ESLint is mandatory.
- No `console.log` statements in production.
- Components must not exceed 150 lines.
- No duplicated logic.
- No magic numbers.
- Clear and consistent naming conventions.
- No inline styles.
- No dead code.

---

## Naming Conventions

| Item       | Convention          | Example                         |
| ---------- | ------------------- | ------------------------------- |
| Folders    | kebab-case          | `auth/`, `forgot-password/`     |
| Files      | camelCase.tsx / .ts | `useAuth.ts`, `auth.service.ts` |
| Components | PascalCase.tsx      | `AuthScreen.tsx`, `Button.tsx`  |

---

## Pull Request Template

All pull requests must use the following structure (see `.github/PULL_REQUEST_TEMPLATE.md`):

- **What** – Summary of changes
- **Why** – Reason for the change
- **How** – Implementation details
- **Screenshots** – When UI changes
- **Checklist** – Tested, ESLint passed, no console logs, todo updated

---

## Learn More

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Semantic Release](https://github.com/semantic-release/semantic-release)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Modular Monolith Architecture](https://dev.to/artiumws/modular-monolith-a-disruptive-guide-to-architecting-your-react-app-2gji)
