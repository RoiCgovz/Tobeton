import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, Dimensions, ToastAndroid, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, } from "@expo-google-fonts/inter";
import { createFolderStyles } from "../../styles/createFolderStyles";
import { router } from "expo-router";
import folderService from "../../services/folderService";

const { width, height } = Dimensions.get("window");

export default function CreateFoldersPage(){
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
    });
    
    // States for form inputs
    const [folderName, setFolderName] = useState("");
    const [subject, setSubject] = useState("");
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("Beginner");
    const [loading, setLoading] = useState(false);
    
    if (!fontsLoaded) return null;

    const handleCreateFolder = async () => {
        if (!folderName.trim()) {
            ToastAndroid.show("Please enter folder name", ToastAndroid.SHORT);
            return;
        }
        
        if (!subject.trim()) {
            ToastAndroid.show("Please enter subject", ToastAndroid.SHORT);
            return;
        }
        
        if (!topic.trim()) {
            ToastAndroid.show("Please enter topic", ToastAndroid.SHORT);
            return;
        }
        
        setLoading(true);
        
        const result = await folderService.createFolder(
            folderName.trim(),
            subject.trim(),
            topic.trim(),
            difficulty
        );
        
        setLoading(false);
        
        if (result.success) {
            ToastAndroid.show("Folder created successfully", ToastAndroid.SHORT);
            router.push("/(tabs)/folders");
        } else {
            ToastAndroid.show(result.error || "Failed to create folder", ToastAndroid.LONG);
        }
    };

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
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
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
                            value={folderName}
                            onChangeText={setFolderName}
                        />

                        <TextInput
                            placeholder="Subject"
                            placeholderTextColor="#666"
                            style={createFolderStyles.input}
                            value={subject}
                            onChangeText={setSubject}
                        />

                        <TextInput
                            placeholder="Topic"
                            placeholderTextColor="#666"
                            style={createFolderStyles.input}
                            value={topic}
                            onChangeText={setTopic}
                        />

                        {/* Difficulty Selector */}
                        <View style={createFolderStyles.difficultyContainer}>
                            <Text style={createFolderStyles.difficultyLabel}>Difficulty:</Text>
                            <View style={createFolderStyles.difficultyButtons}>
                                <TouchableOpacity
                                    style={[
                                        createFolderStyles.difficultyButton,
                                        difficulty === "Beginner" && createFolderStyles.difficultyActive
                                    ]}
                                    onPress={() => setDifficulty("Beginner")}
                                >
                                    <Text style={[
                                        createFolderStyles.difficultyText,
                                        difficulty === "Beginner" && createFolderStyles.difficultyTextActive
                                    ]}>Beginner</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        createFolderStyles.difficultyButton,
                                        difficulty === "Intermediate" && createFolderStyles.difficultyActive
                                    ]}
                                    onPress={() => setDifficulty("Intermediate")}
                                >
                                    <Text style={[
                                        createFolderStyles.difficultyText,
                                        difficulty === "Intermediate" && createFolderStyles.difficultyTextActive
                                    ]}>Intermediate</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity
                                    style={[
                                        createFolderStyles.difficultyButton,
                                        difficulty === "Advanced" && createFolderStyles.difficultyActive
                                    ]}
                                    onPress={() => setDifficulty("Advanced")}
                                >
                                    <Text style={[
                                        createFolderStyles.difficultyText,
                                        difficulty === "Advanced" && createFolderStyles.difficultyTextActive
                                    ]}>Advanced</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* BOTTOM ACTIONS - Fixed Alignment */}
                        <View style={createFolderStyles.bottomActions}>
                            <TouchableOpacity 
                                style={createFolderStyles.actionButton}
                                onPress={() => router.push("/(tabs)/folders")}
                            >
                                <Image
                                    source={require("../../assets/icons/icons8-x-100.png")}
                                    style={createFolderStyles.xIcon}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={createFolderStyles.actionButton}
                                onPress={handleCreateFolder} 
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator size="large" color="#4CAF50" />
                                ) : (
                                    <Ionicons name="checkmark-sharp" size={60} color="#4CAF50" />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
             </SafeAreaView>
        </View>
    );   
}