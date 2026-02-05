import { useEffect } from "react";
import { router } from "expo-router";
import "../global.css";

export default function Index() {
  useEffect(() => {
    router.replace("/(auth)/splash");
  }, []);

  return null;
}
