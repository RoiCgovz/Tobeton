import { StyleSheet } from "react-native";
export const mainPageStyles = StyleSheet.create({
  
  container:{
    margin: 20
  },
  profileContainer:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    width:"100%",
    paddingHorizontal:20,
    marginTop:10
  },

  leftSection:{
    flexDirection:"row",
    alignItems:"center"
  },

  profileImage:{
    width: 60,
    height: 60,
    borderRadius: 25,
    marginRight: 10,
    marginTop: 10,
  },

  textContainer:{
    flexDirection:"column"
  },

  greeting: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Inter_600SemiBold"
  },
  
  name: {
    fontSize: 12,
    fontFamily: "Inter_700Bold",
    color: "#000  "
  },

  moonimage:{
    width: 45,
    height: 45,
    margin: 10,
    tintColor: "#2e82db"
  },
  box: {
    width: 240,
    height: 50,
    backgroundColor: "white",
    borderColor: "#002167",
    borderWidth: 1,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  
});