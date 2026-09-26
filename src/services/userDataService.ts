import AsyncStorage from "@react-native-async-storage/async-storage";

import { supabase } from "@/src/services/supabase";

export type UserProfile = {
  id: string;
  email?: string | null;
  full_name?: string | null;
  baby_name?: string | null;
  conception_day?: number | null;
  conception_month?: number | null;
  conception_year?: number | null;
  conception_date?: string | null;
  due_date?: string | null;
  pregnancy_weeks?: number | null;
  updated_at?: string | null;
};

const localKey = (userId: string, scope: string) =>
  `bumptobliss:${userId}:${scope}`;

const getLocalProfile = async (userId: string): Promise<UserProfile | null> => {
  const rawProfile = await AsyncStorage.getItem(localKey(userId, "profile"));
  return rawProfile ? JSON.parse(rawProfile) : null;
};

const setLocalProfile = async (profile: UserProfile) => {
  await AsyncStorage.setItem(localKey(profile.id, "profile"), JSON.stringify(profile));
};

export const getUserProfile = async (
  userId: string,
): Promise<UserProfile | null> => {
  if (supabase) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (!error && data) {
      await setLocalProfile(data as UserProfile);
      return data as UserProfile;
    }
  }

  return getLocalProfile(userId);
};

export const upsertUserProfile = async (
  userId: string,
  profile: Partial<UserProfile>,
): Promise<UserProfile> => {
  const now = new Date().toISOString();
  const existingProfile = (await getLocalProfile(userId)) ?? { id: userId };
  const nextProfile: UserProfile = {
    ...existingProfile,
    ...profile,
    id: userId,
    updated_at: now,
  };

  if (supabase) {
    // Without an active session (e.g. signup still pending email
    // confirmation), auth.uid() is null server-side and this write would
    // always be rejected by RLS, so skip it and go straight to the local
    // fallback below instead of logging an expected failure as an error.
    const { data: sessionData } = await supabase.auth.getSession();

    if (sessionData.session) {
      const { data, error } = await supabase
        .from("profiles")
        .upsert(nextProfile, { onConflict: "id" })
        .select()
        .single();

      if (!error && data) {
        await setLocalProfile(data as UserProfile);
        return data as UserProfile;
      }

      if (error) {
        console.error("🩺 upsertUserProfile: Supabase write failed", error);
      }
    }
  }

  await setLocalProfile(nextProfile);
  return nextProfile;
};

export const getUserCollection = async <T>(
  userId: string,
  scope: string,
): Promise<T[]> => {
  if (supabase) {
    const { data, error } = await supabase
      .from(scope)
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      await AsyncStorage.setItem(localKey(userId, scope), JSON.stringify(data));
      return data as T[];
    }
  }

  const rawRows = await AsyncStorage.getItem(localKey(userId, scope));
  return rawRows ? JSON.parse(rawRows) : [];
};

export const setUserCollection = async <T extends { id: string }>(
  userId: string,
  scope: string,
  rows: T[],
): Promise<T[]> => {
  await AsyncStorage.setItem(localKey(userId, scope), JSON.stringify(rows));

  if (supabase) {
    await supabase.from(scope).upsert(
      rows.map((row) => ({
        ...row,
        user_id: userId,
      })),
      { onConflict: "id" },
    );
  }

  return rows;
};

export const addUserRecord = async <T extends { id: string }>(
  userId: string,
  scope: string,
  record: T,
): Promise<T[]> => {
  const rows = await getUserCollection<T>(userId, scope);
  return setUserCollection(userId, scope, [record, ...rows]);
};

export const updateUserRecord = async <T extends { id: string }>(
  userId: string,
  scope: string,
  id: string,
  updates: Partial<T>,
): Promise<T[]> => {
  const rows = await getUserCollection<T>(userId, scope);
  const nextRows = rows.map((row) => (row.id === id ? { ...row, ...updates } : row));
  return setUserCollection(userId, scope, nextRows);
};
