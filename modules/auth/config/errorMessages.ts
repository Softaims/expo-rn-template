export type AuthError = {
  title: string;
  message: string;
};

export const AUTH_ERROR_MESSAGES: Record<string, AuthError> = {
  // --- Credentials ----------------------------------------------------------
  form_identifier_not_found: {
    title: "Account Not Found",
    message:
      "No account found with that email address. Please check and try again.",
  },
  form_password_incorrect: {
    title: "Incorrect Password",
    message: "Incorrect password. Please try again or reset your password.",
  },
  form_identifier_exists: {
    title: "Account Already Exists",
    message:
      "An account with this email already exists. Try logging in instead.",
  },

  // --- Email / OTP verification --------------------------------------------
  form_code_incorrect: {
    title: "Invalid Code",
    message:
      "The verification code is incorrect. Please check the code and try again.",
  },
  form_code_expired: {
    title: "Code Expired",
    message: "The verification code has expired. Please request a new one.",
  },
  form_param_format_invalid_email_address: {
    title: "Invalid Email",
    message: "Please enter a valid email address.",
  },

  // --- Password rules -------------------------------------------------------
  form_password_length_too_short: {
    title: "Password Too Short",
    message: "Password is too short. Please use at least 6 characters.",
  },
  form_password_size_exceeded: {
    title: "Password Too Long",
    message: "Password is too long. Please use fewer than 72 characters.",
  },
  form_password_no_uppercase: {
    title: "Weak Password",
    message: "Password must contain at least one uppercase letter.",
  },
  form_password_no_lowercase: {
    title: "Weak Password",
    message: "Password must contain at least one lowercase letter.",
  },
  form_password_no_number: {
    title: "Weak Password",
    message: "Password must contain at least one number.",
  },
  form_password_no_special_char: {
    title: "Weak Password",
    message: "Password must contain at least one special character.",
  },
  form_password_pwned: {
    title: "Unsafe Password",
    message:
      "This password has appeared in a data breach. Please choose a different password.",
  },
  form_password_not_strong_enough: {
    title: "Weak Password",
    message:
      "Password is not strong enough. Try adding uppercase letters, numbers, or symbols.",
  },

  // --- Session / account state ---------------------------------------------
  session_exists: {
    title: "Already Signed In",
    message:
      "You are already signed in. Please sign out before logging in with a different account.",
  },
  not_allowed_access: {
    title: "Access Denied",
    message: "Your account does not have access to this app.",
  },

  // --- Rate limiting --------------------------------------------------------
  too_many_requests: {
    title: "Too Many Attempts",
    message: "Too many attempts. Please wait a moment before trying again.",
  },
  captcha_invalid: {
    title: "Security Check Failed",
    message: "Security check failed. Please try again.",
  },

  // --- OAuth ----------------------------------------------------------------
  ERR_REQUEST_CANCELED: {
    title: "",
    message: "",
  },
  oauth_access_denied: {
    title: "Access Denied",
    message:
      "Access was denied. Please allow the required permissions and try again.",
  },
  oauth_callback_invalid: {
    title: "Sign In Failed",
    message: "Something went wrong during sign-in. Please try again.",
  },
  oauth_account_already_connected: {
    title: "Account Already Connected",
    message: "This social account is already connected to another user.",
  },

  // --- Network / unknown ----------------------------------------------------
  network_error: {
    title: "Connection Error",
    message:
      "A network error occurred. Please check your connection and try again.",
  },
  internal_clerk_error: {
    title: "Something Went Wrong",
    message: "Something went wrong on our end. Please try again.",
  },
  form_param_nil: {
    title: "Missing Fields",
    message: "Please fill in all required fields.",
  },
};

// ---------------------------------------------------------------------------
// Static UI / client-side validation errors (not from Clerk)
// ---------------------------------------------------------------------------

export const AUTH_VALIDATION_ERRORS = {
  otp_too_short: {
    title: "Invalid Code",
    message: "Please enter a valid 6-digit code.",
  },
} satisfies Record<string, AuthError>;

export const DEFAULT_AUTH_ERROR: AuthError = {
  title: "Something Went Wrong",
  message: "An unexpected error occurred. Please try again.",
};

export function getAuthError(error: unknown): AuthError {
  if (!error) return DEFAULT_AUTH_ERROR;

  const clerkError = error as {
    errors?: { code?: string }[];
    code?: string;
  };

  const code = clerkError?.errors?.[0]?.code ?? "";
  //  clerkError?.code ??
  return AUTH_ERROR_MESSAGES[code] ?? DEFAULT_AUTH_ERROR;
}
