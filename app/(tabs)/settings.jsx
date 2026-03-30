import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { settingsPageStyles} from "../../styles/settingstyles";
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold,} from "@expo-google-fonts/inter";
import { Image } from "react-native";
import React, { useState } from "react";
import Svg, { Polygon } from "react-native-svg";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function SettingsPage(){
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
    });

    if (!fontsLoaded) {
        return null;    
    } 

    return(
        <View>
    
        </View>
    );
}