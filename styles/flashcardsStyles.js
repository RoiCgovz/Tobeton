import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const flashcardsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 30,
  },

  xIcon: {
    width: width * 0.05,
    height: height * 0.05,
    marginTop: 5,
  },

  title: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },

  card: {
    width: "100%",
    height: height * 0.6,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  
  cardWrapper: {
    flex: 1,
    justifyContent: "center",
  },

  regularCardLayer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderWidth: 2,
    borderColor: "#000",
    zIndex: 1,
  },

  flippedCardLayer: {
    width: "100%",
    height: "100%",
    borderWidth: 2,
    borderColor: "#000",
    zIndex: 2,
  },

  cardText: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Inter_600SemiBold",
    paddingHorizontal: 10,
  },

  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 40,
  },

  progressText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontFamily: "Inter_400Regular",
  },
});