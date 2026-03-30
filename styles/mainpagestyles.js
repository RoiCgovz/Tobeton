import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const mainPageStyles = StyleSheet.create({
  container: {
    margin: width * 0.05,
  },

  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: width * 0.05,
    marginTop: height * 0.015,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  profileImage: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.06,
    marginRight: width * 0.025,
    marginTop: height * 0.015,
  },

  textContainer: {
    flexDirection: "column",
  },

  greeting: {
    fontSize: width * 0.04,
    color: "#000",
    fontFamily: "Inter_600SemiBold",
  },

  name: {
    fontSize: width * 0.03,
    fontFamily: "Inter_700Bold",
    color: "#000",
  },

  moonimage: {
    width: width * 0.11,
    height: width * 0.11,
    margin: width * 0.025,
    tintColor: "#000",
  },

  box: {
    width: width * 0.65,
    height: height * 0.065,
    backgroundColor: "white",
    borderColor: "#000",
    borderWidth: 1,
    margin: width * 0.012,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: width * 0.025,
  },
  background: {
    position: "absolute",
    width: width * 1.6,
    height: height * 1.6,
    transform: [
      { translateX: -width * 0.1 },
      { translateY: height * 0.25 },
    ],
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.9)",
  },

  svg: {
    position: "absolute",
    top: 0,
    left: 0,
  },
});