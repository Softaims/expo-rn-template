import { useUser, useSignIn, useSignUp, useAuth as useClerkAuth, useOAuth } from '@clerk/clerk-expo';
import { useCallback, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession();

export function useWarmUpBrowser() {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
}

export function useAuth() {
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut, getToken } = useClerkAuth();

  return {
    user,
    isSignedIn,
    isLoaded,
    signOut,
    getToken,
  };
}

export function useLogin() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const handleSignIn = async (params: { identifier: string; password: string }) => {
    if (!signIn || !isLoaded) {
      throw new Error('Sign in is not ready');
    }

    try {
      // First, create the sign-in attempt
      const signInAttempt = await signIn.create({
        identifier: params.identifier,
        password: params.password,
      });

      // If the sign-in is complete, set the active session
      if (signInAttempt.status === 'complete') {
        if (setActive) {
          await setActive({ session: signInAttempt.createdSessionId });
        }
        return signInAttempt;
      }

      throw new Error(`Authentication incomplete: ${signInAttempt.status}`);
    } catch (error: any) {
      if (error.errors && error.errors.length > 0) {
        throw error;
      }
      throw error;
    }
  };

  return {
    signIn: handleSignIn,
    isLoading: !isLoaded,
    isLoaded,
  };
}

export function useRegister() {
  const { signUp, setActive, isLoaded } = useSignUp();

  const handleSignUp = async (params: {
    emailAddress: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) => {
    const result = await signUp!.create(params);

    // If email verification is required
    if (result.status === 'missing_requirements') {
      // Prepare email verification
      await signUp!.prepareEmailAddressVerification({ strategy: 'email_code' });
      return result;
    }

    // If sign up is complete
    if (result.status === 'complete' && setActive !== undefined) {
      await setActive({ session: result.createdSessionId });
      return result;
    }

    return result;
  };

  const resendCode = async () => {
    await signUp!.prepareEmailAddressVerification({ strategy: 'email_code' });
  };

  return {
    signUp: handleSignUp,
    resendCode,
    isLoading: !isLoaded,
    isLoaded,
  };
}

export function useVerifyEmail() {
  const { signUp, setActive, isLoaded } = useSignUp();

  const verifyEmail = async (code: string) => {
    const result = await signUp!.attemptEmailAddressVerification({ code });

    if (result.status === 'complete' && setActive !== undefined) {
      await setActive({ session: result.createdSessionId });
      return result;
    }

    throw new Error('Verification incomplete');
  };

  return {
    verifyEmail,
    isLoading: !isLoaded,
    isLoaded,
  };
}

export function useForgotPassword() {
  const { signIn, isLoaded } = useSignIn();

  const sendResetCode = async (emailAddress: string) => {
    const result = await signIn!.create({
      strategy: 'reset_password_email_code',
      identifier: emailAddress,
    });

    return result;
  };

  return {
    sendResetCode,
    isLoading: !isLoaded,
    isLoaded,
  };
}

export function useResetPassword() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const resetPassword = async (code: string, newPassword: string) => {
    const result = await signIn!.attemptFirstFactor({
      strategy: 'reset_password_email_code',
      code,
      password: newPassword,
    });

    if (result.status === 'complete' && setActive !== undefined) {
      await setActive({ session: result.createdSessionId });
      return result;
    }

    throw new Error('Reset incomplete');
  };

  return {
    resetPassword,
    isLoading: !isLoaded,
    isLoaded,
  };
}

export function useGoogleOAuth() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const signInWithGoogle = useCallback(async () => {
    const { createdSessionId, setActive } = await startOAuthFlow({
      redirectUrl: Linking.createURL('/(auth)/login'),
    });

    if (createdSessionId && setActive !== undefined) {
      await setActive({ session: createdSessionId });
    }
  }, [startOAuthFlow]);

  return {
    signInWithGoogle,
  };
}

export function useAppleOAuth() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_apple' });

  const signInWithApple = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(auth)/login'),
      });

      if (createdSessionId && setActive !== undefined) {
        await setActive({ session: createdSessionId });
      }
    } catch (error) {
      // Handle user cancellation gracefully
      console.log('Apple sign-in cancelled or failed:', error);
      throw error;
    }
  }, [startOAuthFlow]);

  return {
    signInWithApple,
  };
}
