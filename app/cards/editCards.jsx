import React from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, Dimensions, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, } from "@expo-google-fonts/inter";
import { editCardStyles } from "../../styles/editCardStyles";
import { router } from "expo-router";


const { width, height } = Dimensions.get("window");

export default function EditCardsPage(){
    const [fontsLoaded] = useFonts({
            Inter_400Regular,
            Inter_600SemiBold,
            Inter_700Bold,
        });
    
    if (!fontsLoaded) return null;

    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="dark" />

            <SafeAreaView style={editCardStyles.safeAreaContainer}>

                {/* HEADER */}
                <View style={editCardStyles.header}>
                    <TouchableOpacity onPress={() => router.push("/folders/cards")}>
                        <Image
                            source={require("../../assets/icons/icons8-back-100.png")}
                            style={editCardStyles.backButton}
                        />
                    </TouchableOpacity>
                </View>

                {/* CENTER CONTENT */}
                <View style={editCardStyles.centerContent}>
                
                    {/* TITLE */}
                    <Text style={editCardStyles.titleText}>Edit Card</Text>

                    {/* ICON */}
                    <View style={editCardStyles.iconContainer}>
                        <MaterialCommunityIcons name="cards-playing-outline" size={100} color="black" />
                    </View>

                    {/* INPUTS */}
                    <TextInput
                        placeholder="Card Question"
                        placeholderTextColor="#666"
                        style={editCardStyles.input}
                    />

                    <TextInput
                        placeholder="Card Answer"
                        placeholderTextColor="#666"
                        style={editCardStyles.inputLarge}
                        multiline
                    />
                    <View style={editCardStyles.bottomActions}>
                        <TouchableOpacity onPress={() => router.push("/folders/cards")}>
                            <Image
                                source={require("../../assets/icons/icons8-x-100.png")}
                                style={editCardStyles.xIcon}
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