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
import { profilePageStyles } from "../../styles/profilestyles";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import {
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
} from "@expo-google-fonts/inter";
import { Ionicons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../config/api";
import { useFocusEffect } from "@react-navigation/native";

const PROFILE_KEY = "@profile_pic";
const BANNER_KEY = "@banner_pic";

export default function ProfilePage() {

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
    });

    const [username, setUsername] = useState("User");
    const [profile, setProfile] = useState({
        following: 0,
        friends: 0,
        achievements: 0
    });

    const [loading, setLoading] = useState(true);

    const [profilePic, setProfilePic] = useState(null);
    const [bannerPic, setBannerPic] = useState(null);

    // ❌ REMOVED useEffect([]) ONLY
    // ✔ replaced with focus-based refresh

    const loadImages = async () => {
        try {
            const savedProfile = await AsyncStorage.getItem(PROFILE_KEY);
            const savedBanner = await AsyncStorage.getItem(BANNER_KEY);

            if (savedProfile) setProfilePic(savedProfile);
            if (savedBanner) setBannerPic(savedBanner);
        } catch (err) {
            console.log("Image load error:", err);
        }
    };

    const loadProfile = async () => {
        try {
            setLoading(true);

            const storedUsername = await AsyncStorage.getItem("username");
            const userId = await AsyncStorage.getItem("userId");

            if (storedUsername) {
                setUsername(storedUsername);
            }

            if (userId) {
                const response = await api.get(`/users/profile/${userId}`);

                setProfile({
                    following: response.following || 0,
                    friends: response.friends || 0,
                    achievements: response.achievements || 0,
                });
            }

        } catch (error) {
            console.log("Profile load error:", error.message);
        } finally {
            setLoading(false);
        }
    };

    // 🔥 THIS IS THE ONLY IMPORTANT FIX
    useFocusEffect(
        useCallback(() => {
            loadProfile();
            loadImages();
        }, [])
    );

    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={profilePageStyles.container}>
            <StatusBar style="light" />

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Banner */}
                <View style={{ position: 'relative' }}>
                    <TouchableOpacity
                        style={profilePageStyles.bannerContainer}
                        activeOpacity={0.7}
                    >
                        <Image
                            source={
                                bannerPic
                                    ? { uri: bannerPic }
                                    : require("../../assets/gifs/kimi_no_nawa.gif")
                            }
                            style={profilePageStyles.bannerPicture}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={profilePageStyles.addButton}>
                        <Text style={profilePageStyles.addButtonText}>+ Add</Text>
                    </TouchableOpacity>
                </View>

                {/* Profile Picture */}
                <View style={profilePageStyles.profileIconContainer}>
                    <View style={profilePageStyles.profileCircleWrapper}>
                        <TouchableOpacity
                            style={profilePageStyles.profileCircle}
                            activeOpacity={0.6}
                        >
                            <Image
                                source={
                                    profilePic
                                        ? { uri: profilePic }
                                        : require("../../assets/gifs/sixseven.gif")
                                }
                                style={profilePageStyles.profileImage}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Username + Stats */}
                <View style={profilePageStyles.profileStats}>
                    <Text style={profilePageStyles.username}>
                        {username}
                    </Text>

                    <View style={profilePageStyles.statsRow}>
                        <View style={profilePageStyles.statItem}>
                            <Text style={profilePageStyles.statNumber}>
                                {profile.following}
                            </Text>
                            <Text style={profilePageStyles.statLabel}>Following</Text>
                        </View>

                        <View style={profilePageStyles.statItem}>
                            <Text style={profilePageStyles.statNumber}>
                                {profile.friends}
                            </Text>
                            <Text style={profilePageStyles.statLabel}>Friends</Text>
                        </View>

                        <View style={profilePageStyles.statItem}>
                            <Text style={profilePageStyles.statNumber}>
                                {profile.achievements}
                            </Text>
                            <Text style={profilePageStyles.statLabel}>Achievements</Text>
                        </View>
                    </View>
                </View>

                {/* Cards */}
                <View style={profilePageStyles.cardsSection}>
                    <Text style={profilePageStyles.sectionTitle}>
                        Your Collection
                    </Text>

                    <View style={profilePageStyles.cardsGrid}>

                        <TouchableOpacity
                            style={profilePageStyles.trippyCard}
                            onPress={() => router.push('/profile/achievement')}
                        >
                            <View style={profilePageStyles.cardIconContainer}>
                                <Ionicons name="trophy-outline" size={32} color="#000" />
                            </View>
                            <Text style={profilePageStyles.cardTitle}>Achievements</Text>
                            <Text style={profilePageStyles.cardSubtitle}>
                                {profile.achievements} unlocked
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={profilePageStyles.trippyCard}>
                            <View style={profilePageStyles.cardIconContainer}>
                                <Ionicons name="add-circle-outline" size={32} color="#ccc" />
                            </View>
                            <Text style={profilePageStyles.cardTitle}>Coming Soon</Text>
                            <Text style={profilePageStyles.cardSubtitle}>Stay tuned</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={profilePageStyles.trippyCard}>
                            <View style={profilePageStyles.cardIconContainer}>
                                <Ionicons name="lock-closed-outline" size={32} color="#ccc" />
                            </View>
                            <Text style={profilePageStyles.cardTitle}>Locked</Text>
                            <Text style={profilePageStyles.cardSubtitle}>Complete more</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={profilePageStyles.trippyCard}>
                            <View style={profilePageStyles.cardIconContainer}>
                                <Ionicons name="star-outline" size={32} color="#ccc" />
                            </View>
                            <Text style={profilePageStyles.cardTitle}>Rewards</Text>
                            <Text style={profilePageStyles.cardSubtitle}>Coming soon</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={profilePageStyles.placeholderContent}>
                    <Text style={profilePageStyles.placeholderText}>
                        More content coming soon...
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}