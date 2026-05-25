import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image,
    ToastAndroid,
    ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import {
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
} from "@expo-google-fonts/inter";

import { createFolderStyles } from "../../styles/createFolderStyles";
import { router, useLocalSearchParams } from "expo-router";
import folderService from "../../services/folderService";

export default function UpdateFolderPage() {
    const { id, folder_name, subject, topic, difficulty } =
        useLocalSearchParams();

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
    });

    const [name, setName] = useState(folder_name || "");
    const [subj, setSubj] = useState(subject || "");
    const [top, setTop] = useState(topic || "");
    const [diff, setDiff] = useState(difficulty || "Beginner");
    const [loading, setLoading] = useState(false);

    if (!fontsLoaded) return null;

    const update = async () => {
        if (!name.trim()) {
            ToastAndroid.show("Folder name required", ToastAndroid.SHORT);
            return;
        }

        if (!subj.trim()) {
            ToastAndroid.show("Subject required", ToastAndroid.SHORT);
            return;
        }

        if (!top.trim()) {
            ToastAndroid.show("Topic required", ToastAndroid.SHORT);
            return;
        }

        setLoading(true);

        const result = await folderService.updateFolder(
            id,
            name.trim(),
            subj.trim(),
            top.trim(),
            diff
        );

        setLoading(false);

        if (result.success) {
            ToastAndroid.show("Folder updated successfully", ToastAndroid.SHORT);
            router.back();
        } else {
            ToastAndroid.show(
                result.error || "Update failed",
                ToastAndroid.LONG
            );
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="dark" />

            <SafeAreaView style={createFolderStyles.safeAreaContainer}>
                {/* HEADER */}
                <View style={createFolderStyles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image
                            source={require("../../assets/icons/icons8-back-100.png")}
                            style={createFolderStyles.backButton}
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={createFolderStyles.centerContent}>
                        
                        {/* TITLE */}
                        <Text style={createFolderStyles.titleText}>
                            Update Folder
                        </Text>

                        {/* ICON */}
                        <View style={createFolderStyles.iconContainer}>
                            <MaterialCommunityIcons
                                name="folder-edit"
                                size={100}
                                color="black"
                            />
                        </View>

                        {/* INPUTS */}
                        <TextInput
                            placeholder="Folder Name"
                            placeholderTextColor="#666"
                            style={createFolderStyles.input}
                            value={name}
                            onChangeText={setName}
                        />

                        <TextInput
                            placeholder="Subject"
                            placeholderTextColor="#666"
                            style={createFolderStyles.input}
                            value={subj}
                            onChangeText={setSubj}
                        />

                        <TextInput
                            placeholder="Topic"
                            placeholderTextColor="#666"
                            style={createFolderStyles.input}
                            value={top}
                            onChangeText={setTop}
                        />

                        {/* Difficulty Selector */}
                        <View style={createFolderStyles.difficultyContainer}>
                            <Text style={createFolderStyles.difficultyLabel}>
                                Difficulty:
                            </Text>

                            <View style={createFolderStyles.difficultyButtons}>
                                {["Beginner", "Intermediate", "Advanced"].map(
                                    (level) => (
                                        <TouchableOpacity
                                            key={level}
                                            style={[
                                                createFolderStyles.difficultyButton,
                                                diff === level &&
                                                    createFolderStyles.difficultyActive,
                                            ]}
                                            onPress={() => setDiff(level)}
                                        >
                                            <Text
                                                style={[
                                                    createFolderStyles.difficultyText,
                                                    diff === level &&
                                                        createFolderStyles.difficultyTextActive,
                                                ]}
                                            >
                                                {level}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                )}
                            </View>
                        </View>

                        {/* ACTION BUTTONS */}
                        <View style={createFolderStyles.bottomActions}>
                            <TouchableOpacity
                                style={createFolderStyles.actionButton}
                                onPress={() => router.back()}
                            >
                                <Image
                                    source={require("../../assets/icons/icons8-x-100.png")}
                                    style={createFolderStyles.xIcon}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={createFolderStyles.actionButton}
                                onPress={update}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator
                                        size="large"
                                        color="#4CAF50"
                                    />
                                ) : (
                                    <Ionicons
                                        name="checkmark-sharp"
                                        size={60}
                                        color="#4CAF50"
                                    />
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}