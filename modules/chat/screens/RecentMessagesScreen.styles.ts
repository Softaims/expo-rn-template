import { StyleSheet } from "react-native";
import { wp } from "@/lib/responsive";

export const recentMessagesStyles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingTop: wp(4),
  },
  searchField: {
    marginBottom: wp(4),
  },
  listContent: {
    gap: wp(4),
  },
});
