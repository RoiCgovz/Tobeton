import React from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, Dimensions, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, } from "@expo-google-fonts/inter";
import { createCardStyles } from "../../styles/createCardStyles";
import { router } from "expo-router";


const { width, height } = Dimensions.get("window");

export default function CreateCardsPage(){
    const [fontsLoaded] = useFonts({
            Inter_400Regular,
            Inter_600SemiBold,
            Inter_700Bold,
        });
    
    if (!fontsLoaded) return null;

    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="dark" />

            <SafeAreaView style={createCardStyles.safeAreaContainer}>

                {/* HEADER */}
                <View style={createCardStyles.header}>
                    <TouchableOpacity onPress={() => router.push("/folders/cards")}>
                        <Image
                            source={require("../../assets/icons/icons8-back-100.png")}
                            style={createCardStyles.backButton}
                        />
                    </TouchableOpacity>
                </View>

                {/* CENTER CONTENT */}
                <View style={createCardStyles.centerContent}>
                
                    {/* TITLE */}
                    <Text style={createCardStyles.titleText}>Create Card</Text>

                    {/* ICON */}
                    <View style={createCardStyles.iconContainer}>
                        <MaterialCommunityIcons name="cards-playing-outline" size={100} color="black" />
                    </View>

                    {/* INPUTS */}
                    <TextInput
                        placeholder="Card Question"
                        placeholderTextColor="#666"
                        style={createCardStyles.input}
                    />

                    <TextInput
                        placeholder="Card Answer"
                        placeholderTextColor="#666"
                        style={createCardStyles.inputLarge}
                        multiline
                    />
                    <View style={createCardStyles.bottomActions}>
                        <TouchableOpacity onPress={() => router.push("/folders/cards")}>
                            <Image
                                source={require("../../assets/icons/icons8-x-100.png")}
                                style={createCardStyles.xIcon}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => router.push("/folders/cards")}>
                          <Ionicons name="checkmark-sharp" size={60} color="black" style={{ marginTop: 20 }}/>
                        </TouchableOpacity>
                    </View>
                </View>
             </SafeAreaView>
        </View>
    );   
}