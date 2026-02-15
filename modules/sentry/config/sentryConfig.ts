import * as Sentry from "@sentry/react-native";

/**
 * Sentry Configuration
 *
 * This file contains all Sentry initialization options.
 * Modify these settings based on your environment and requirements.
 */

const SENTRY_DSN =
  "https://8f30047611e9a0499a44b1dd8bcc1963@o4510871958323200.ingest.de.sentry.io/4510871958716496";

/**
 * Sentry initialization options
 */
export const sentryConfig: Sentry.ReactNativeOptions = {
  dsn: SENTRY_DSN,

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  // Capture 10% of all sessions for replay
  replaysSessionSampleRate: 0.1,
  // Capture 100% of sessions with errors
  replaysOnErrorSampleRate: 1,

  // Performance Monitoring
  // Capture 100% of transactions for performance monitoring
  tracesSampleRate: 1.0,

  // Enable automatic instrumentation
  enableAutoSessionTracking: true,

  // Attach stack traces to all messages
  attachStacktrace: true,

  // Environment configuration
  environment: __DEV__ ? "development" : "production",

  // Integrations
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // Uncomment to enable Spotlight in development (https://spotlightjs.com)
  // spotlight: __DEV__,
};

/**
 * Initialize Sentry with the configured options
 */
export function initSentry(): void {
  Sentry.init(sentryConfig);
}

/**
 * Sentry wrapper HOC for the root component
 */
export const wrapWithSentry = Sentry.wrap;
