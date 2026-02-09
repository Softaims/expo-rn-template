import { useSignIn, useSignUp, useOAuth } from '@clerk/clerk-expo';
import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession();

export function useClerkAuth() {
  const { signIn, setActive: setSignInActive } = useSignIn();
  const { signUp, setActive: setSignUpActive } = useSignUp();

  const { startOAuthFlow: googleFlow } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: appleFlow } = useOAuth({ strategy: 'oauth_apple' });

  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => void WebBrowser.coolDownAsync();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    const result = await signIn!.create({ identifier: email, password });
    if (result.createdSessionId) {

      await setSignInActive!({ session: result.createdSessionId });
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    const result = await signUp!.create({ emailAddress: email, password });
    if (result.createdSessionId) {
      await setSignUpActive!({ session: result.createdSessionId });
    }
  };

  const signInWithGoogle = async () => {
    const { createdSessionId, setActive } = await googleFlow({
      redirectUrl: Linking.createURL('/(auth)/login'),
    });

    if (createdSessionId && setActive) {
      await setActive({ session: createdSessionId });
    }
  };

  const signInWithApple = async () => {
    const { createdSessionId, setActive } = await appleFlow({
      redirectUrl: Linking.createURL('/'),
    });

    if (createdSessionId && setActive) {
      await setActive({ session: createdSessionId });
    }
  };

  const sendPasswordResetEmail = async (email: string) => {
    await signIn!.create({
      strategy: 'reset_password_email_code',
      identifier: email,
    });
  };

  const resetPassword = async (code: string, newPassword: string) => {
    const result = await signIn!.attemptFirstFactor({
      strategy: 'reset_password_email_code',
      code,
      password: newPassword,
    });

    if (result.createdSessionId) {
      await setSignInActive!({ session: result.createdSessionId });
    }
  };

  return {
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInWithApple,
    sendPasswordResetEmail,
    resetPassword,
  };
}
