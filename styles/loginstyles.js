import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  topLeftButton: {
    position: "absolute",
    top: 30,
    left: 20,
  },

  loginHeader: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: 60,
    marginTop: 60,
  },   

  titleText: {
   fontSize: 45,
   color: "black",
   fontFamily: "Inter_700Bold",
  },
  
  backText: {
    fontSize: 45,
    color: "black",
    fontFamily: "Inter_700Bold",
    marginLeft: 20, 
  },

  inputContainer: {
    flex: 1,
    padding: 20,
    marginTop: 10,
    width: "100%",
  },

  inputText: {
    height: 65,
    marginTop: 45,
    backgroundColor: "#FFFFFF", // white box
    borderRadius: 16,           // rounded
    paddingHorizontal: 16,
    fontSize: 18,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    fontFamily: "Inter_600SemiBold",
    },

  loginButton: {
    backgroundColor: "#2E82DB",
    width: "75%",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 100
  },

  buttonContainer: {
    width: "80%",
    alignItems: "center",
  },
  
  buttonText: {
    color: "white",
    fontSize: 21,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },
});