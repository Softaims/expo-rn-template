import {
  useUser,
  useSignIn,
  useSignUp,
  useAuth as useClerkAuth,
  useOAuth,
} from "@clerk/clerk-expo";
import { useCallback, useState } from "react";
import * as Linking from "expo-linking";
import { captureException } from "@/modules/sentry";
import { getAuthError, DEFAULT_AUTH_ERROR, AUTH_ERROR_MESSAGES } from "@/modules/auth/config";

export function useAuth() {
  const { user, isSignedIn, isLoaded } = useUser();
  const { signOut, getToken } = useClerkAuth();

  return {
    user,
    isSignedIn: isSignedIn ?? false,
    isLoaded,
    signOut,
    getToken,
  };
}

export function useLogin() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const handleSignIn = async (params: {
    identifier: string;
    password: string;
  }) => {
    if (!signIn || !isLoaded) {
      return { data: null, error: DEFAULT_AUTH_ERROR };
    }

    let signInAttempt;
    try {
      signInAttempt = await signIn.create({
        identifier: params.identifier,
        password: params.password,
      });
    } catch (error: any) {
      captureException(error);
      return { data: null, error: getAuthError(error) };
    }

    if (signInAttempt.status === "complete") {
      if (setActive) {
        await setActive({ session: signInAttempt.createdSessionId });
      }
      return { data: signInAttempt, error: null };
    }

    return { data: null, error: DEFAULT_AUTH_ERROR };
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
    let result;
    try {
      result = await signUp!.create(params);
    } catch (error: any) {
      captureException(error);
      return { data: null, error: getAuthError(error) };
    }

    if (result.status === "missing_requirements") {
      await signUp!.prepareEmailAddressVerification({ strategy: "email_code" });
      return { data: result, error: null };
    }

    if (result.status === "complete" && setActive !== undefined) {
      await setActive({ session: result.createdSessionId });
      return { data: result, error: null };
    }

    return { data: result, error: null };
  };

  const resendCode = async () => {
    try {
      await signUp!.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (error: any) {
      captureException(error);
    }
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
    let result;
    try {
      result = await signUp!.attemptEmailAddressVerification({ code });
    } catch (error: any) {
      captureException(error);
      return { data: null, error: getAuthError(error) };
    }

    if (result.status === "complete" && setActive !== undefined) {
      await setActive({ session: result.createdSessionId });
      return { data: result, error: null };
    }

    return { data: null, error: DEFAULT_AUTH_ERROR };
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
    try {
      const result = await signIn!.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });
      return { data: result, error: null };
    } catch (error: any) {
      captureException(error);
      return { data: null, error: getAuthError(error) };
    }
  };

  const verifyResetCode = async (code: string) => {
    let result;
    try {
      result = await signIn!.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
      });
    } catch (error: any) {
      captureException(error);
      return { data: null, error: getAuthError(error) };
    }

    if (result.status === "needs_new_password") {
      return { data: result, error: null };
    }

    return { data: null, error: AUTH_ERROR_MESSAGES.form_code_incorrect };
  };

  return {
    sendResetCode,
    verifyResetCode,
    isLoading: !isLoaded,
    isLoaded,
  };
}

export function useResetPassword() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { signOut } = useSignOut();

  const resetPassword = async (newPassword: string) => {
    let result;
    try {
      result = await signIn!.resetPassword({
        password: newPassword,
        signOutOfOtherSessions: true,
      });
    } catch (error: any) {
      captureException(error);
      return { data: null, error: getAuthError(error) };
    }

    if (result.status === "complete" && setActive !== undefined) {
      await signOut();
      return { data: result, error: null };
    }

    return { data: null, error: DEFAULT_AUTH_ERROR };
  };

  return {
    resetPassword,
    isLoading: !isLoaded,
    isLoaded,
  };
}

export function useChangePassword() {
  const { user, isLoaded } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    if (!isLoaded) {
      return { data: null, error: DEFAULT_AUTH_ERROR };
    }

    if (!user) {
      return { data: null, error: DEFAULT_AUTH_ERROR };
    }

    setIsSubmitting(true);
    try {
      await user.updatePassword({ currentPassword, newPassword });
      return { data: true, error: null };
    } catch (error: any) {
      captureException(error);
      return { data: null, error: getAuthError(error) };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    changePassword,
    isLoading: isSubmitting || !isLoaded,
  };
}

export function useGoogleOAuth() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const signInWithGoogle = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/(auth)/login"),
      });

      if (createdSessionId && setActive !== undefined) {
        await setActive({ session: createdSessionId });
      }
    } catch (error: any) {
      if (error.code !== "ERR_REQUEST_CANCELED") {
        captureException(error);
      }
    }
  }, [startOAuthFlow]);

  return {
    signInWithGoogle,
  };
}

export function useAppleOAuth() {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_apple" });

  const signInWithApple = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/(auth)/login"),
      });

      if (createdSessionId && setActive !== undefined) {
        await setActive({ session: createdSessionId });
      }
    } catch (error: any) {
      if (error.code !== "ERR_REQUEST_CANCELED") {
        captureException(error);
      }
    }
  }, [startOAuthFlow]);

  return {
    signInWithApple,
  };
}

export function useSignOut() {
  const { signOut } = useClerkAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      return { error: null };
    } catch (error: any) {
      captureException(error);
      return { error: getAuthError(error) };
    }
  };

  return {
    signOut: handleSignOut,
  };
}

export function useDeleteAccount() {
  const { user } = useUser();

  const deleteAccount = async () => {
    try {
      await user?.delete();
      return { error: null };
    } catch (error: any) {
      captureException(error);
      return { error: getAuthError(error) };
    }
  };

  return {
    deleteAccount,
  };
}
