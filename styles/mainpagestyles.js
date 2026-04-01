import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const mainPageStyles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: height * 0.15,
  },

  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  },

  textContainer: {
    flexDirection: "column",
  },

  greeting: {
    fontSize: width * 0.04,
    fontFamily: "Inter_600SemiBold",
    color: "#000",
  },

  name: {
    fontSize: width * 0.03,
    fontFamily: "Inter_700Bold",
    color: "#000",
  },

  moonimage: {
    width: width * 0.11,
    height: width * 0.11,
    tintColor: "#000",
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
    backgroundColor: "rgba(0,0,0,0.8)",
  },

  svg: {
    position: "absolute",
  },

  mainRow: {
    flexDirection: "row",
    marginTop: height * 0.03,
    paddingHorizontal: width * 0.05,
  },

  iconColumn: {
    marginRight: width * 0.04,
  },
  iconImage: {
    width: width * 0.1,
    height: width * 0.15,
    resizeMode: "contain",
  },

  iconBox: {
    width: width * 0.25,
    height: width * 0.20,
    backgroundColor: "#fff",
    borderRadius: width * 0.04,
    marginBottom: height * 0.02,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  rightContainer: {
    flex: 1,
  },

  subjectScroll: {
    flexGrow: 0,
  },

  subjectCard: {
    width: width * 0.6,
    height: height * 0.31,
    backgroundColor: "#fff",
    borderRadius: width * 0.05,
    padding: width * 0.04,
    marginRight: width * 0.04,
    elevation: 6,
  },
  subjectImage: {
    width: width * 0.52,
    height: height * 0.15,
  },

  subjectTitle: {
    marginTop: height * 0.02,
    fontSize: width * 0.07,
    fontFamily: "Inter_700Bold",
    color: "#000",
  },

  subjectStatsContainer: {
    marginTop: height * 0.015,
  },

  subjectStat: {
    fontSize: width * 0.035,
    fontFamily: "Inter_600SemiBold",
    color: "#000",
  },

  graphContainer: {
    marginTop: height * 0.04,
    paddingHorizontal: width * 0.05,
  },

  graphTitle: {
    fontSize: width * 0.045,
    fontFamily: "Inter_700Bold",
    marginBottom: height * 0.01,
    color: "#000",
  },

  graphCard: {
    backgroundColor: "#fff",
    borderRadius: width * 0.04,
    padding: width * 0.05,
    elevation: 5,
  },

  barRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: height * 0.18,
  },

  barContainer: {
    alignItems: "center",
  },

  bar: {
    width: width * 0.06,
    backgroundColor: "#000",
    borderRadius: width * 0.015,
  },

  barLabel: {
    marginTop: height * 0.005,
    fontSize: width * 0.03,
    fontFamily: "Inter_600SemiBold",
  },
});