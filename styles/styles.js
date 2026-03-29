import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: height * 0.05,
  },

  header: {
    position: "absolute",
    bottom: height * 0.44,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: width * 0.05,
  },

  logo: {
    fontSize: width * 0.15,
    marginRight: width * 0.03,
  },

  title: {
    fontSize: width * 0.05,
    color: "black",
    fontFamily: "Inter_700Bold",
  },

  buttonContainer: {
    position: "absolute",
    bottom: height * 0.01,
    width: "100%",
    alignItems: "center",
  },

  loginButton: {
    backgroundColor: "#000",
    width: "55%",
    paddingVertical: height * 0.02,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: height * 0.24,
  },

  buttonText: {
    color: "white",
    fontSize: width * 0.053,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },

  backgroundGif: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.80)",
  },

  whitePanel: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "60%",
    backgroundColor: "white",
    transform: [{ skewY: "-12deg" }],
  },

  content: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: height * 0.1,
  },

  svg: {
    position: "absolute",
    bottom: height * 0.20,
  },

  orContinueText: {
    position: "absolute",
    color: "black",
    fontSize: width * 0.03,
    bottom: height * 0.21,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },

  socialRow: {
    position: "absolute",
    bottom: height * 0.12,
    flexDirection: "row",
    gap: width * 0.1,
    marginBottom: height * 0.025,
  },

  socialIcon: {
    width: width * 0.1,
    height: width * 0.1,
    minWidth: 36,
    minHeight: 36,
    maxWidth: 42,
    maxHeight: 42,
  },

  registerText: {
    position: "absolute",
    bottom: height * 0.09,
    fontSize: width * 0.03,
    color: "#333",
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },
  logoImage: {
    width: "40%",
    height: "170%",
  },
});