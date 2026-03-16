import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 40,
  },

  header: {
    position: "absolute",
    bottom: 350,  
    alignSelf: "left",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20
  },

  logo: {
    fontSize: 60,
    marginRight: 15,
  },

  title: {
    fontSize: 20,
    color: "black",
    fontFamily: "Inter_700Bold",
  },

  buttonContainer: {
    position: "absolute",
    bottom: 10,       
    width: "100%",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#000",
    width: "55%",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 200,
  },

  buttonText: {
    color: "white",
    fontSize: 21,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },

  backgroundGif: {
    position: "absolute",
    width: "100%",
    height: "90%",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "90%",
    backgroundColor: "rgba(0,0,0,0.80)"
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
    paddingBottom: 80,
  },

  svg:{
    position:"absolute",
    bottom: 200
  },

  orContinueText: {
    position: "absolute",
    color: "black",
    fontSize: 12,
    bottom: 180,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },

  socialRow:{
    position: "absolute",
    bottom: 100,
    flexDirection:"row",
    gap:40,
    marginBottom:20
  },

  socialIcon:{
    width:40,
    height:40
  },

  registerText:{
    position: "absolute",
    bottom: 80,
    fontSize:12,
    color:"#333",
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  }
});