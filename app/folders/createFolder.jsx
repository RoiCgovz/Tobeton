import React from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, Dimensions, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, } from "@expo-google-fonts/inter";
import { createFolderStyles } from "../../styles/createFolderStyles";
import { router } from "expo-router";


const { width, height } = Dimensions.get("window");

export default function CreateFoldersPage(){
    const [fontsLoaded] = useFonts({
            Inter_400Regular,
            Inter_600SemiBold,
            Inter_700Bold,
        });
    
    if (!fontsLoaded) return null;

    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="dark" />

            <SafeAreaView style={createFolderStyles.safeAreaContainer}>

                {/* HEADER */}
                <View style={createFolderStyles.header}>
                    <TouchableOpacity onPress={() => router.push("/(tabs)/folders")}>
                        <Image
                            source={require("../../assets/icons/icons8-back-100.png")}
                            style={createFolderStyles.backButton}
                        />
                    </TouchableOpacity>
                </View>

                {/* CENTER CONTENT */}
                <View style={createFolderStyles.centerContent}>
                
                    {/* TITLE */}
                    <Text style={createFolderStyles.titleText}>Create Folder</Text>

                    {/* ICON */}
                    <View style={createFolderStyles.iconContainer}>
                        <MaterialCommunityIcons name="folder" size={100} color="black" />
                    </View>

                    {/* INPUTS */}
                    <TextInput
                        placeholder="Folder Name"
                        placeholderTextColor="#666"
                        style={createFolderStyles.input}
                    />

                    <TextInput
                        placeholder="Folder Description"
                        placeholderTextColor="#666"
                        style={createFolderStyles.inputLarge}
                        multiline
                    />
                    <View style={createFolderStyles.bottomActions}>
                        <TouchableOpacity onPress={() => router.push("/(tabs)/folders")}>
                            <Image
                                source={require("../../assets/icons/icons8-x-100.png")}
                                style={createFolderStyles.xIcon}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push("/(tabs)/folders")}>
                          <Ionicons name="checkmark-sharp" size={60} color="black" style={{ marginTop: 20 }}/>
                        </TouchableOpacity>
                    </View>
                </View>
             </SafeAreaView>
        </View>
    );   
}