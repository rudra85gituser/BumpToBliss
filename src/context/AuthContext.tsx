import type { Session, User } from "@supabase/supabase-js";
// Apple sign-in is temporarily disabled (Expo Go can't run it; needs a dev
// build). Kept commented so it can be re-enabled without rewriting it.
// import * as AppleAuthentication from "expo-apple-authentication";
import * as AuthSession from "expo-auth-session";
// Expo's own OAuth redirect-URL parser; not re-exported from the package root.
import { getQueryParams } from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  missingSupabaseConfigMessage,
  supabase,
} from "@/src/services/supabase";
import { upsertUserProfile } from "@/src/services/userDataService";

WebBrowser.maybeCompleteAuthSession();

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  session: Session | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<boolean>;
  // loginWithApple: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Only needed by the commented-out Apple flow below (Apple requires a
// nonce; Google's signInWithOAuth flow here does not).
// const createNonce = async () => {
//   const raw = Crypto.randomUUID();
//   const hashed = await Crypto.digestStringAsync(
//     Crypto.CryptoDigestAlgorithm.SHA256,
//     raw,
//   );
//   return { raw, hashed };
// };

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(supabase));
  // signUp() returns a user object even when email confirmation is pending
  // (no session yet). Onboarding screens still need a real user id to save
  // against right after signup, so this fills the gap until a real session
  // (set below) takes over.
  const [pendingUser, setPendingUser] = useState<User | null>(null);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      setSession(nextSession);
      if (nextSession) setPendingUser(null);

      // Only a real authenticated session (not just a signUp() call still
      // waiting on email confirmation) can pass Supabase's RLS check, so
      // the profile row is created/ensured here rather than right after
      // signUp() returns.
      if (event === "SIGNED_IN" && nextSession?.user) {
        upsertUserProfile(nextSession.user.id, {
          email: nextSession.user.email,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    if (!supabase) {
      throw new Error(missingSupabaseConfigMessage);
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (error) throw error;
  };

  const signup = async (email: string, password: string) => {
    if (!supabase) {
      throw new Error(missingSupabaseConfigMessage);
    }

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    if (error) throw error;
    if (data.user) setPendingUser(data.user);

    // No profile write here: signUp() only returns a real session (needed
    // for the profiles RLS policy to pass) when email confirmation isn't
    // required. The onAuthStateChange listener above creates the profile
    // once a session actually exists, whether that's immediate or after
    // the user confirms their email and logs in.
  };

  const loginWithGoogle = async () => {
    if (!supabase) {
      throw new Error(missingSupabaseConfigMessage);
    }

    const redirectTo = AuthSession.makeRedirectUri({ scheme: "bumptobliss" });

    const { data: oauthData, error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });

    if (oauthError) throw oauthError;
    if (!oauthData?.url) {
      throw new Error("Google sign-in failed. Please try again.");
    }

    const result = await WebBrowser.openAuthSessionAsync(oauthData.url, redirectTo);

    if (result.type === "cancel" || result.type === "dismiss") return false;
    if (result.type !== "success" || !result.url) {
      throw new Error("Google sign-in failed. Please try again.");
    }

    const { params, errorCode } = getQueryParams(result.url);
    if (errorCode) throw new Error(errorCode);

    let userId: string | undefined;
    let userEmail: string | null | undefined;

    if (params.access_token && params.refresh_token) {
      const { data, error } = await supabase.auth.setSession({
        access_token: params.access_token,
        refresh_token: params.refresh_token,
      });
      if (error) throw error;
      userId = data.user?.id;
      userEmail = data.user?.email;
    } else if (params.code) {
      const { data, error } = await supabase.auth.exchangeCodeForSession(params.code);
      if (error) throw error;
      userId = data.user?.id;
      userEmail = data.user?.email;
    } else {
      throw new Error("Google sign-in failed. Please try again.");
    }

    if (userId) {
      await upsertUserProfile(userId, { email: userEmail });
    }

    return true;
  };

  // const loginWithApple = async () => {
  //   if (!supabase) {
  //     throw new Error(missingSupabaseConfigMessage);
  //   }
  //
  //   const available = await AppleAuthentication.isAvailableAsync();
  //   if (!available) {
  //     throw new Error("Apple sign-in isn't available on this device or build.");
  //   }
  //
  //   const { raw: rawNonce, hashed: hashedNonce } = await createNonce();
  //
  //   let credential;
  //   try {
  //     credential = await AppleAuthentication.signInAsync({
  //       requestedScopes: [
  //         AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //         AppleAuthentication.AppleAuthenticationScope.EMAIL,
  //       ],
  //       nonce: hashedNonce,
  //     });
  //   } catch (err: any) {
  //     if (err?.code === "ERR_REQUEST_CANCELED") return false;
  //     throw err;
  //   }
  //
  //   if (!credential.identityToken) {
  //     throw new Error("Apple sign-in failed. Please try again.");
  //   }
  //
  //   const { data, error } = await supabase.auth.signInWithIdToken({
  //     provider: "apple",
  //     token: credential.identityToken,
  //     nonce: rawNonce,
  //   });
  //
  //   if (error) throw error;
  //
  //   if (data.user) {
  //     const fullName = [credential.fullName?.givenName, credential.fullName?.familyName]
  //       .filter(Boolean)
  //       .join(" ");
  //
  //     await upsertUserProfile(data.user.id, {
  //       email: data.user.email,
  //       ...(fullName ? { full_name: fullName } : {}),
  //     });
  //   }
  //
  //   return true;
  // };

  const logout = async () => {
    if (!supabase) {
      setSession(null);
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setSession(null);
  };

  const value = useMemo<AuthContextType>(
    () => ({
      isAuthenticated: Boolean(session?.user),
      isLoading,
      session,
      user: session?.user ?? pendingUser,
      login,
      logout,
      signup,
      loginWithGoogle,
      // loginWithApple,
    }),
    [isLoading, session, pendingUser]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
