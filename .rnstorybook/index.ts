import { createMMKV } from "react-native-mmkv";
import { view } from './storybook.requires';

const storybookStorage = createMMKV({ id: "storybook" });

const StorybookUIRoot = view.getStorybookUI({
  storage: {
    getItem: (key: string) => storybookStorage.getString(key) ?? null,
    setItem: (key: string, value: string) => storybookStorage.set(key, value),
  },
});

export default StorybookUIRoot;
