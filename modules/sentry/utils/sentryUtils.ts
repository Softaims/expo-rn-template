import * as Sentry from "@sentry/react-native";

/**
 * Sentry Utility Functions
 *
 * Common Sentry operations for error tracking and user identification.
 */

// ============================================================================
// User Management
// ============================================================================

export interface SentryUser {
  id: string;
  email?: string;
  username?: string;
  [key: string]: unknown;
}

/**
 * Set the current user for Sentry error tracking
 * Call this when a user logs in
 */
export function setSentryUser(user: SentryUser | null): void {
  Sentry.setUser(user);
}

/**
 * Clear the current user from Sentry
 * Call this when a user logs out
 */
export function clearSentryUser(): void {
  Sentry.setUser(null);
}

// ============================================================================
// Error Capturing
// ============================================================================

/**
 * Capture an exception and send it to Sentry
 */
export function captureException(error: Error): string {
  return Sentry.captureException(error);
}

/**
 * Capture a message and send it to Sentry
 */
export function captureMessage(message: string): string {
  return Sentry.captureMessage(message);
}
