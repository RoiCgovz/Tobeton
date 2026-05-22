import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, Dimensions, ToastAndroid, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, } from "@expo-google-fonts/inter";
import { editCardStyles } from "../../styles/editCardStyles";
import { router, useLocalSearchParams } from "expo-router";
import cardService from "../../services/cardService";

const { width, height } = Dimensions.get("window");

export default function EditCardsPage() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
    });
    
    // Get card data from navigation
    const { cardId, question: initialQuestion, answer: initialAnswer } = useLocalSearchParams();
    
    const [question, setQuestion] = useState(initialQuestion || "");
    const [answer, setAnswer] = useState(initialAnswer || "");
    const [loading, setLoading] = useState(false);
    
    if (!fontsLoaded) return null;

    const handleUpdateCard = async () => {
        if (!question.trim()) {
            ToastAndroid.show("Please enter a question", ToastAndroid.SHORT);
            return;
        }
        
        if (!answer.trim()) {
            ToastAndroid.show("Please enter an answer", ToastAndroid.SHORT);
            return;
        }
        
        if (!cardId) {
            ToastAndroid.show("Card ID not found", ToastAndroid.SHORT);
            return;
        }
        
        setLoading(true);
        const result = await cardService.updateCard(cardId, question.trim(), answer.trim());
        setLoading(false);
        
        if (result.success) {
            ToastAndroid.show("Card updated successfully!", ToastAndroid.SHORT);
            router.back();
        } else {
            ToastAndroid.show(result.error || "Failed to update card", ToastAndroid.LONG);
        }
    };

    const handleDeleteCard = async () => {
        if (!cardId) {
            ToastAndroid.show("Card ID not found", ToastAndroid.SHORT);
            return;
        }
        
        setLoading(true);
        const result = await cardService.deleteCard(cardId);
        setLoading(false);
        
        if (result.success) {
            ToastAndroid.show("Card deleted successfully", ToastAndroid.SHORT);
            router.back();
        } else {
            ToastAndroid.show(result.error || "Failed to delete card", ToastAndroid.LONG);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="dark" />

            <SafeAreaView style={editCardStyles.safeAreaContainer}>

                {/* HEADER */}
                <View style={editCardStyles.header}>
                    <TouchableOpacity onPress={() => router.back()} disabled={loading}>
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
                        value={question}
                        onChangeText={setQuestion}
                        editable={!loading}
                    />

                    <TextInput
                        placeholder="Card Answer"
                        placeholderTextColor="#666"
                        style={editCardStyles.inputLarge}
                        value={answer}
                        onChangeText={setAnswer}
                        editable={!loading}
                        multiline
                    />
                    <View style={editCardStyles.bottomActions}>
                        <TouchableOpacity onPress={handleDeleteCard} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator size="small" color="#FF4444" />
                            ) : (
                                <Ionicons name="trash-outline" size={50} color="#8B0000" style={{ marginTop: 20 }} />

                            )}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleUpdateCard} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
                            ) : (
                                <Ionicons name="checkmark-sharp" size={60} color="black" style={{ marginTop: 20 }} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
             </SafeAreaView>
        </View>
    );
}