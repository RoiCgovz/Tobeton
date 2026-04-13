import { Inter_600SemiBold } from "@expo-google-fonts/inter";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const editCardStyles = StyleSheet.create({
    safeAreaContainer: {
      backgroundColor: "#FFF",
      flex: 1,
      paddingLeft: 20,
      paddingRight: 20,
      paddingbottom: 10,
    },
    
    titleText: {
      fontSize: 28,
      fontFamily: "Inter_700Bold",
    },  
    
    backButton:{
        width: width * 0.05,
        height: height * 0.05,
    },  

    centerContent: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    iconContainer: {
      marginVertical: 20,
    },

    input: {
      width: width * 0.8,
      height: height * 0.07,
      backgroundColor: "#E5E5E5",
      borderRadius: 15,
      fontFamily: "Inter_600SemiBold",
      fontSize: 16,
      paddingHorizontal: 15,
      marginBottom: 15,

      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },

    inputLarge: {
      width: width * 0.8,
      height: height * 0.15,
      backgroundColor: "#E5E5E5",
      borderRadius: 15,
      fontFamily: "Inter_600SemiBold",
      fontSize: 16,
      paddingHorizontal: 15,
      paddingTop: 10,
      textAlignVertical: "top",

      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },

    bottomActions: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },

    xIcon: {
      width: width * 0.07,
      height: height * 0.07,
      marginRight: 100,
      marginTop: 20,
    },  
});