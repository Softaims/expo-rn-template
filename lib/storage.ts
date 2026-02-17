import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  get: (key: string): Promise<string | null> =>
    AsyncStorage.getItem(key),

  set: (key: string, value: string): Promise<void> =>
    AsyncStorage.setItem(key, value),

  getObject: async <T>(key: string): Promise<T | null> => {
    const value = await AsyncStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  },

  setObject: <T>(key: string, value: T): Promise<void> =>
    AsyncStorage.setItem(key, JSON.stringify(value)),

  remove: (key: string): Promise<void> =>
    AsyncStorage.removeItem(key),

  clear: (): Promise<void> =>
    AsyncStorage.clear(),
};
