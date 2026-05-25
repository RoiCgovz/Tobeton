// frontend/app/settings/changeProfilePage.js
import React, { useState, useRef, useEffect } from "react";
import { router } from 'expo-router';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Dimensions,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    BackHandler,
    ToastAndroid,
    ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import {
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
} from "@expo-google-fonts/inter";
import { Ionicons } from "@expo/vector-icons";
import { changeProfileStyles } from "../../styles/changeprofilestyles";
import authService from '../../services/authService';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";

const { width, height } = Dimensions.get("window");

const PROFILE_KEY = "@profile_pic";
const BANNER_KEY = "@banner_pic";

export default function ChangeProfilePage() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
    });

    // Form states
    const [newUsername, setNewUsername] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Images
    const [profilePic, setProfilePic] = useState(null);
    const [bannerPic, setBannerPic] = useState(null);

    // Password visibility states
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const scrollViewRef = useRef();
    const usernameRef = useRef();
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();

    useEffect(() => {
        loadCurrentUsername();
        loadImages();
    }, []);

    const loadCurrentUsername = async () => {
        const username = await authService.getUsername();
        if (username) setNewUsername(username);
    };

    const loadImages = async () => {
        const savedProfile = await AsyncStorage.getItem(PROFILE_KEY);
        const savedBanner = await AsyncStorage.getItem(BANNER_KEY);

        if (savedProfile) setProfilePic(savedProfile);
        if (savedBanner) setBannerPic(savedBanner);
    };

    if (!fontsLoaded) return null;

    const goBackToSettings = () => {
        router.dismissTo('/settings');
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            goBackToSettings();
            return true;
        });

        return () => backHandler.remove();
    }, []);

    const handleInputFocus = (ref) => {
        setTimeout(() => {
            ref?.current?.measureLayout(
                scrollViewRef.current,
                (x, y) => {
                    scrollViewRef.current.scrollTo({ y: y - 100, animated: true });
                },
                () => {}
            );
        }, 100);
    };

    // IMAGE PICKERS
    const pickProfileImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsEditing: true,
            aspect: [1, 1],
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setProfilePic(uri);
            await AsyncStorage.setItem(PROFILE_KEY, uri);
        }
    };

    const pickBannerImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
            allowsEditing: true,
            aspect: [16, 9],
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setBannerPic(uri);
            await AsyncStorage.setItem(BANNER_KEY, uri);
        }
    };

    // Username update
    const handleUpdateUsername = async () => {
        if (!newUsername.trim()) {
            ToastAndroid.show("Please enter a username", ToastAndroid.SHORT);
            return false;
        }

        setLoading(true);
        const result = await authService.updateUsername(newUsername.trim());
        setLoading(false);

        return result.success;
    };

    // Password update
    const handleUpdatePassword = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) return false;

        setLoading(true);
        const result = await authService.updatePassword(oldPassword, newPassword);
        setLoading(false);

        if (result.success) {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }

        return result.success;
    };

    const handleUpdateProfile = async () => {
        const currentUsername = await authService.getUsername();

        let usernameSuccess = true;
        let passwordSuccess = true;

        if (newUsername !== currentUsername) {
            usernameSuccess = await handleUpdateUsername();
        }

        if (oldPassword || newPassword || confirmPassword) {
            passwordSuccess = await handleUpdatePassword();
        }

        if (usernameSuccess || passwordSuccess) {
            setTimeout(() => goBackToSettings(), 1200);
        }
    };

    return (
        <SafeAreaView style={changeProfileStyles.container}>
            <StatusBar style="dark" />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    ref={scrollViewRef}
                    showsVerticalScrollIndicator={false}
                >

                    {/* BANNER */}
                    <TouchableOpacity
                        style={changeProfileStyles.bannerContainer}
                        onPress={pickBannerImage}
                    >
                        <Image
                            source={
                                bannerPic
                                    ? { uri: bannerPic }
                                    : require("../../assets/gifs/kimi_no_nawa.gif")
                            }
                            style={changeProfileStyles.bannerPicture}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={changeProfileStyles.backButton}
                        onPress={goBackToSettings}
                    >
                        <Ionicons name="arrow-back" size={24} />
                    </TouchableOpacity>

                    {/* PROFILE PIC */}
                    <View style={changeProfileStyles.profileIconContainer}>
                        <TouchableOpacity
                            style={changeProfileStyles.profileCircle}
                            onPress={pickProfileImage}
                        >
                            <Image
                                source={
                                    profilePic
                                        ? { uri: profilePic }
                                        : require("../../assets/gifs/sixseven.gif")
                                }
                                style={changeProfileStyles.profileImage}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* FORM */}
                    <View style={changeProfileStyles.formContainer}>
                        <Text style={changeProfileStyles.sectionTitle}>
                            Change Profile
                        </Text>

                        <TextInput
                            style={changeProfileStyles.input}
                            value={newUsername}
                            onChangeText={setNewUsername}
                            placeholder="Username"
                        />

                        <TouchableOpacity
                            style={changeProfileStyles.updateButton}
                            onPress={handleUpdateProfile}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={changeProfileStyles.updateButtonText}>
                                    Update Profile
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}