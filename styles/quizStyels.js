import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const quizstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    padding: width * 0.05,
  },

  back: {
    fontSize: width * 0.06,
    marginBottom: height * 0.01,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 40,
  },

  title: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    
  },

  card: {
    height: height * 0.5,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.04,

    elevation: 4,
  },

  questionText: {
    fontSize: width * 0.045,
    fontWeight: "600",
  },

  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.03,
  },

  optionLeft: {
    width: width * 0.3,
    height: height * 0.05,
    backgroundColor: "#333",
    borderRadius: 6,
  },

  optionRight: {
    width: width * 0.3,
    height: height * 0.05,
    backgroundColor: "#000",
    borderRadius: 6,
  },

  optionBottom: {
    alignSelf: "center",
    width: width * 0.3,
    height: height * 0.05,
    backgroundColor: "#555",
    borderRadius: 6,
  },

  nextText: {
    color: "#fff",
    fontWeight: "600",
  },
});