import { useSignIn, useSignUp } from '@clerk/clerk-expo';
import { useState } from 'react';

export function useAuthClerk() {
  const { signIn, setActive: setActiveSignIn } = useSignIn();
  const { signUp, setActive: setActiveSignUp } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // OAuth Sign In
  const signInWithOAuth = async (strategy: 'oauth_google' | 'oauth_apple' | 'oauth_facebook') => {
    try {
      setIsLoading(true);
      setError(null);
      const { createdSessionId } = await signIn!.create({
        strategy,
      });

      if (createdSessionId) {
        await setActiveSignIn!({ session: createdSessionId });
      }
    } catch (err: any) {
      console.error('OAuth sign in error:', err);
      setError(err?.message || 'Failed to sign in with OAuth');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // OAuth Sign Up
  const signUpWithOAuth = async (strategy: 'oauth_google' | 'oauth_apple' | 'oauth_facebook') => {
    try {
      setIsLoading(true);
      setError(null);
      const { createdSessionId } = await signUp!.create({
        strategy,
      });

      if (createdSessionId) {
        await setActiveSignUp!({ session: createdSessionId });
      }
    } catch (err: any) {
      console.error('OAuth sign up error:', err);
      setError(err?.message || 'Failed to sign up with OAuth');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Email/Password Sign In
  const signInWithEmail = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await signIn!.create({
        identifier: email,
        password,
      });

      if (result.createdSessionId) {
        await setActiveSignIn!({ session: result.createdSessionId });
      }
    } catch (err: any) {
      console.error('Email sign in error:', err);
      setError(err?.message || 'Failed to sign in');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Email/Password Sign Up
  const signUpWithEmail = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await signUp!.create({
        emailAddress: email,
        password,
      });

      if (result.createdSessionId) {
        await setActiveSignUp!({ session: result.createdSessionId });
      }
    } catch (err: any) {
      console.error('Email sign up error:', err);
      setError(err?.message || 'Failed to sign up');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    signInWithOAuth,
    signUpWithOAuth,
    signInWithEmail,
    signUpWithEmail,
    isLoading,
    error,
  };
}
