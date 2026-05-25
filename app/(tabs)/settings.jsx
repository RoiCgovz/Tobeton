import React, { useEffect, useState, useCallback } from "react";
import { router } from 'expo-router';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions,
} from "react-native";
import { settingsPageStyles } from "../../styles/settingstyles";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import {
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
} from "@expo-google-fonts/inter";
import { Ionicons, Feather } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

const PROFILE_KEY = "@profile_pic";

const { width, height } = Dimensions.get("window");

export default function SettingsPage() {

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
    });

    const [profilePic, setProfilePic] = useState(null);

    const loadProfilePic = async () => {
        const saved = await AsyncStorage.getItem(PROFILE_KEY);
        if (saved) setProfilePic(saved);
    };

    // 🔥 refresh every time screen is focused
    useFocusEffect(
        useCallback(() => {
            loadProfilePic();
        }, [])
    );

    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={settingsPageStyles.container}>
            <StatusBar style="dark" />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Title */}
                <Text style={settingsPageStyles.title}>Settings</Text>

                {/* Profile Card */}
                <TouchableOpacity
                    style={settingsPageStyles.card}
                    onPress={() => router.push('/settings/changeprofile')}
                >
                    <View style={settingsPageStyles.row}>

                        {/* 🔥 UPDATED PROFILE IMAGE (NO LOGIC CHANGE) */}
                        <Image
                            source={
                                profilePic
                                    ? { uri: profilePic }
                                    : require("../../assets/icons/profilepic.png")
                            }
                            style={settingsPageStyles.profileImage}
                        />

                        <View style={settingsPageStyles.textContainer}>
                            <Text style={settingsPageStyles.Text}>Edit Profile</Text>
                        </View>

                        <Ionicons name="chevron-forward" size={width * 0.05} color="#999" />
                    </View>
                </TouchableOpacity>

                {/* Security */}
                <Text style={settingsPageStyles.section}>Security</Text>

                <TouchableOpacity style={settingsPageStyles.card}>
                    <View style={settingsPageStyles.row}>
                        <Feather name="key" size={width * 0.055} color="#555" />
                        <Text style={settingsPageStyles.optionText}>Change Password</Text>
                        <Ionicons name="chevron-forward" size={width * 0.05} color="#999" />
                    </View>
                </TouchableOpacity>

                {/* Customization */}
                <Text style={settingsPageStyles.section}>Customization</Text>

                <TouchableOpacity style={settingsPageStyles.card}>
                    <View style={settingsPageStyles.row}>
                        <Feather name="moon" size={width * 0.055} color="#555" />
                        <Text style={settingsPageStyles.optionText}>Change Theme</Text>
                        <Ionicons name="chevron-forward" size={width * 0.05} color="#999" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={settingsPageStyles.card}>
                    <View style={settingsPageStyles.row}>
                        <Text style={settingsPageStyles.fontIcon}>Aa</Text>
                        <Text style={settingsPageStyles.optionText}>Change Font</Text>
                        <Ionicons name="chevron-forward" size={width * 0.05} color="#999" />
                    </View>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}