import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, Dimensions, ToastAndroid, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, } from "@expo-google-fonts/inter";
import { createCardStyles } from "../../styles/createCardStyles";
import { router, useLocalSearchParams } from "expo-router";
import cardService from "../../services/cardService";

const { width, height } = Dimensions.get("window");

export default function CreateCardsPage() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
    });
    
    const { folderId, folderName } = useLocalSearchParams();
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    
    if (!fontsLoaded) return null;

    const handleCreateCard = async () => {
        // Validate inputs
        if (!question.trim()) {
            ToastAndroid.show("Please enter a question", ToastAndroid.SHORT);
            return;
        }
        
        if (!answer.trim()) {
            ToastAndroid.show("Please enter an answer", ToastAndroid.SHORT);
            return;
        }
        
        if (!folderId) {
            ToastAndroid.show("Folder ID not found", ToastAndroid.SHORT);
            return;
        }
        
        setLoading(true);
        
        const result = await cardService.createCard(folderId, question.trim(), answer.trim());
        
        setLoading(false);
        
        if (result.success) {
            ToastAndroid.show("Card created successfully!", ToastAndroid.SHORT);
            router.back();
        } else {
            ToastAndroid.show(result.error || "Failed to create card", ToastAndroid.LONG);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="dark" />

            <SafeAreaView style={createCardStyles.safeAreaContainer}>

                {/* HEADER */}
                <View style={createCardStyles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image
                            source={require("../../assets/icons/icons8-back-100.png")}
                            style={createCardStyles.backButton}
                        />
                    </TouchableOpacity>
                </View>

                {/* CENTER CONTENT */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={createCardStyles.centerContent}>
                    
                        {/* TITLE */}
                        <Text style={createCardStyles.titleText}>Create Card</Text>
                        
                        {/* Folder Name (optional) */}
                        {folderName && (
                            <Text style={createCardStyles.folderNameText}>
                                Folder: {folderName}
                            </Text>
                        )}

                        {/* ICON */}
                        <View style={createCardStyles.iconContainer}>
                            <MaterialCommunityIcons name="cards-playing-outline" size={100} color="black" />
                        </View>

                        {/* INPUTS */}
                        <TextInput
                            placeholder="Card Question"
                            placeholderTextColor="#666"
                            style={createCardStyles.input}
                            value={question}
                            onChangeText={setQuestion}
                            editable={!loading}
                            multiline
                        />

                        <TextInput
                            placeholder="Card Answer"
                            placeholderTextColor="#666"
                            style={createCardStyles.inputLarge}
                            value={answer}
                            onChangeText={setAnswer}
                            editable={!loading}
                            multiline
                        />
                        
                        <View style={createCardStyles.bottomActions}>
                            <TouchableOpacity onPress={() => router.back()} disabled={loading}>
                                <Image
                                    source={require("../../assets/icons/icons8-x-100.png")}
                                    style={createCardStyles.xIcon}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={handleCreateCard} disabled={loading}>
                                {loading ? (
                                    <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
                                ) : (
                                    <Ionicons name="checkmark-sharp" size={60} color="#4CAF50" style={{ marginTop: 20 }} />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
             </SafeAreaView>
        </View>
    );
}