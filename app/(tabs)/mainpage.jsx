import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { styles } from "../../styles/styles";
import { mainPageStyles} from "../../styles/mainpagestyles";
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold,} from "@expo-google-fonts/inter";
import { Image } from "react-native";
import React, { useState } from "react";

export default function MainPage(){
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;    
  } 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#EEE" , margin: 5}}>
        
        {/* Profile Image, Name and Moon */}
        <View style={mainPageStyles.profileContainer}>
        
        {/* Profile and Name */}
        <View style={mainPageStyles.leftSection}>
            <TouchableOpacity>
            <Image
                source={require("../../assets/icons/profilepic.png")}
                style={mainPageStyles.profileImage}
            />
            </TouchableOpacity>

            <View style={mainPageStyles.textContainer}>
            <Text style={mainPageStyles.greeting}>Greetings Comrade,</Text>
            <Text style={mainPageStyles.name}>admin123</Text>
            </View>
        </View>

        {/* Moon */}
        <TouchableOpacity>
            <Image
            source={require("../../assets/icons/moon.png")}
            style={mainPageStyles.moonimage}
            />
        </TouchableOpacity>

        </View>

    </SafeAreaView>
    );
}