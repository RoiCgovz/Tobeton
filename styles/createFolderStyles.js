import { Inter_600SemiBold } from "@expo-google-fonts/inter";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const createFolderStyles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: "#FFF",
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,  // Fixed: changed "paddingbottom" to "paddingBottom"
  },

  titleText: {
    fontSize: 28,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
  },

  backButton: {
    width: width * 0.08,
    height: height * 0.05,
  },

  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },

  iconContainer: {
    marginVertical: 20,
  },

  input: {
    width: width * 0.85,
    height: height * 0.07,
    backgroundColor: "#E5E5E5",
    borderRadius: 15,
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    paddingHorizontal: 15,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  inputLarge: {
    width: width * 0.85,
    height: height * 0.15,
    backgroundColor: "#E5E5E5",
    borderRadius: 15,
    fontFamily: "Inter_600SemiBold",
    fontSize: 16,
    paddingHorizontal: 15,
    paddingTop: 10,
    textAlignVertical: "top",
    marginBottom: 15,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // Difficulty Selector Styles (New)
  difficultyContainer: {
    width: width * 0.85,
    marginVertical: 10,
    marginBottom: 20,
  },

  difficultyLabel: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#333",
    marginBottom: 10,
  },

  difficultyButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  difficultyButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
  },

  difficultyActive: {
    backgroundColor: "white",
    borderWidth: 2,
  },

  difficultyText: {
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    color: "#666",
  },

  // createFolderStyles.js - Updated bottomActions section
  bottomActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: width * 0.85,
    marginTop: 30,
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },

  xIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },

  difficultyTextActive: {
    color: "#333",
  },
});