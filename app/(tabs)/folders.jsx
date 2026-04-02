import React from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, Dimensions, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import Svg, { Polygon } from "react-native-svg";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold,} from "@expo-google-fonts/inter";
import { folderPageStyles } from "../../styles/folderpagestyles";


const { width, height } = Dimensions.get("window");

export default function FolderPage() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }}>
        <StatusBar style="dark" />
    
        {/* BACKGROUND */}
        <Image
            source={require("../../assets/gifs/writing_background.gif")}
            style={folderPageStyles.background}
            resizeMode="cover"
        />
    
        {/* OVERLAY */}
        <View style={folderPageStyles.overlay} />
    
        {/* DIAGONAL */}
        <Svg height="100%" width="100%" style={folderPageStyles.svg}>
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

        <SafeAreaView style={folderPageStyles.container}>

            {/* HEADER */}
            <Text style={folderPageStyles.title}>My Folders</Text>

            {/* SEARCH BAR */}
            <View style={folderPageStyles.searchBar}>
                <Text style={{ color: "#888" }}>🔍</Text>
                <TextInput
                placeholder="Search Folders"
                placeholderTextColor="#999"
                style={folderPageStyles.searchInput}
                />
            </View>

            {/* MAIN CONTENT */}
            <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                {[1, 2, 3, 4, 5].map((item, index) => (
                    <View key={index} style={folderPageStyles.folderCard} />
                ))}
                </ScrollView>

                {/* RIGHT SIDE FLOATING BUTTONS */}
                <View style={folderPageStyles.rightButtons}>
                <TouchableOpacity style={folderPageStyles.squareBtn}>
                    <Text style={folderPageStyles.plus}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity style={folderPageStyles.squareBtn}>
                    <Text>🖼️</Text>
                </TouchableOpacity>

                <TouchableOpacity style={folderPageStyles.squareBtn}>
                    <Text>☰</Text>
                </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    </View>
  );
}