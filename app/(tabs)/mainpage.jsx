import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { mainPageStyles} from "../../styles/mainpagestyles";
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold,} from "@expo-google-fonts/inter";
import { Image } from "react-native";
import React, { useState } from "react";
import Svg, { Polygon } from "react-native-svg";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

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
    <View style={{ flex: 1 }}>
      {/* BACKGROUND IMAGE */}
      <Image
        source={require("../../assets/gifs/writing.gif")}
        style={mainPageStyles.background}
        resizeMode="cover"
      />

      {/* OVERLAY (optional) */}
      <View style={mainPageStyles.overlay} />

      {/* SVG DIAGONAL (TOP-LEFT COVER → IMAGE BOTTOM-RIGHT) */}
      <Svg height="100%" width="100%" style={mainPageStyles.svg}>
        <Polygon
          points={`
            0,0 
            ${width},0 
            ${width},${height * 0.4} 
            ${-width * 0.3},${height} 
            0,${height}
          `}
          fill="#EEE"
        />
      </Svg>

      <SafeAreaView style={{ flex: 1}}>
          
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
    </View>
    );
}