import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const folderPageStyles = StyleSheet.create({
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
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
  },

  svg: {
    position: "absolute",
    top: 0,
    left: 0,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    marginTop: 10,
    marginBottom: 15,
  },

  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
    borderColor: "#000",
    borderWidth: 2,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 5,
    marginBottom: 20,
  },

  searchInput: {
    marginLeft: 10,
    flex: 1,
    fontFamily: "Inter_700Bold",
    fontSize: 18
  },

  scrollContainer: {
    maxHeight: height * 0.65,
    width: width * 0.75,
    backgroundColor: "#transparent",
    borderRadius: 15,
    padding: 10,
  },

  folderCard: {
    width: width * 0.65,
    height: height * 0.2,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 2,
    marginBottom: 10,
    marginLeft: width * 0.01,
    padding: 20,
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  folderTitle: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: "#000",
  },

  folderSubText: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },

  rightButtons: {
    position: "absolute",
    right: 12,
    top: height * 0.262,
    justifyContent: "space-between",
    height: height * 0.25,
  },

  squareBtn: {
    width: width * 0.15,
    height: height * 0.07,
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#000",
    borderWidth: 2,
    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 5,
    marginBottom: 15,
  },

  plus: {
    fontSize: 32,
    fontWeight: "bold",
  },

  gridContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
},

gridCard: {
  width: "48%",
  height: height * 0.18,
  backgroundColor: "#fff",
  borderRadius: 10,
  borderWidth: 2,
  borderColor: "#000",
  marginBottom: 10,
  padding: 15,
  justifyContent: "center",
  elevation: 6,
},

listCard: {
  flexDirection: "row",
  width: "100%",
  height: height * 0.10,
  backgroundColor: "#fff",
  borderRadius: 10,
  borderWidth: 2,
  borderColor: "#000",
  marginBottom: 10,
  padding: 15,
  justifyContent: "center",
  elevation: 6,
},
});