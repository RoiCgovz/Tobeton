import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const regStyles = StyleSheet.create({
  background: {
    position: "absolute",
    width: width * 1.6,
    height: height * 1.6,
    transform: [
      { translateX: width * 0.02 },
      { translateY: height * 0.25 },
    ],
  },

  safeArea: {
    flex: 1,
    justifyContent: "space-between",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  svg: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  /* TOP BUTTON */
  topLeftButton: {
    position: "absolute",
    top: height * 0.05,
    left: width * 0.05,
  },

  /* HEADER */
  regHeader: {
    height: height * 0.12, // important: give it space to separate
    justifyContent: "space-between",
    marginTop: height * 0.15,
    marginBottom: height * 0.08,
    marginLeft: width * 0.1,
  },

  titleText: {
    fontSize: width * 0.08,
    color: "black",
    fontFamily: "Inter_700Bold",
  },

  backText: {
    fontSize: width * 0.08,
    color: "black",
    fontFamily: "Inter_700Bold",
    marginLeft: width * 0.05,
  },

  /* INPUTS */
  inputContainer: {
    alignItems: "center",
    marginTop: -height * 0.1,
  },

  inputText: {
    width: "85%",
    height: height * 0.08,
    marginTop: height * 0.03,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    fontSize: width * 0.045,
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    fontFamily: "Inter_600SemiBold",
  },

  /* BUTTON */
  buttonContainer: {
    alignItems: "center",
    marginBottom: height * 0.1,
  },

  regButton: {
    backgroundColor: "#222",
    width: "60%",
    paddingVertical: height * 0.02,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: width * 0.05,
    fontFamily: "Inter_600SemiBold",
  },
});