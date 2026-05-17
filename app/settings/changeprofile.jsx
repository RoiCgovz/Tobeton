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

const { width, height } = Dimensions.get("window");

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
    
    // Password visibility states
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    // Refs for scrolling
    const scrollViewRef = useRef();
    const usernameRef = useRef();
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();

    // Load current username
    useEffect(() => {
        loadCurrentUsername();
    }, []);

    const loadCurrentUsername = async () => {
        const username = await authService.getUsername();
        if (username) {
            setNewUsername(username);
        }
    };

    if (!fontsLoaded) return null;

    const goBackToSettings = () => {
        router.dismissTo('/settings');
    };
    
    // Handle Android hardware back button
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

    // Update Username Function
    const handleUpdateUsername = async () => {
        if (!newUsername.trim()) {
            ToastAndroid.show("Please enter a username", ToastAndroid.SHORT);
            return false;
        }

        if (newUsername.length < 3) {
            ToastAndroid.show("Username must be at least 3 characters", ToastAndroid.SHORT);
            return false;
        }

        setLoading(true);
        const result = await authService.updateUsername(newUsername.trim());
        setLoading(false);

        if (result.success) {
            ToastAndroid.show(result.message || "Username updated successfully!", ToastAndroid.SHORT);
            return true;
        } else {
            ToastAndroid.show(result.error || "Failed to update username", ToastAndroid.LONG);
            return false;
        }
    };

    // Update Password Function
    const handleUpdatePassword = async () => {
        if (!oldPassword) {
            ToastAndroid.show("Please enter your current password", ToastAndroid.SHORT);
            return false;
        }

        if (!newPassword) {
            ToastAndroid.show("Please enter a new password", ToastAndroid.SHORT);
            return false;
        }

        if (newPassword.length < 4) {
            ToastAndroid.show("Password must be at least 4 characters", ToastAndroid.SHORT);
            return false;
        }

        if (newPassword !== confirmPassword) {
            ToastAndroid.show("New passwords do not match", ToastAndroid.SHORT);
            return false;
        }

        if (oldPassword === newPassword) {
            ToastAndroid.show("New password must be different from current password", ToastAndroid.SHORT);
            return false;
        }

        setLoading(true);
        const result = await authService.updatePassword(oldPassword, newPassword);
        setLoading(false);

        if (result.success) {
            ToastAndroid.show(result.message || "Password updated successfully!", ToastAndroid.SHORT);
            // Clear password fields
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            return true;
        } else {
            ToastAndroid.show(result.error || "Failed to update password", ToastAndroid.LONG);
            return false;
        }
    };

    // Handle Update Profile (both username and password if provided)
    const handleUpdateProfile = async () => {
        let usernameSuccess = true;
        let passwordSuccess = true;

        // Check if username was changed
        const currentUsername = await authService.getUsername();
        if (newUsername !== currentUsername) {
            usernameSuccess = await handleUpdateUsername();
        }

        // Check if password update is requested
        if (oldPassword || newPassword || confirmPassword) {
            passwordSuccess = await handleUpdatePassword();
        }

        // If nothing was updated
        if (newUsername === currentUsername && !oldPassword && !newPassword && !confirmPassword) {
            ToastAndroid.show("No changes to update", ToastAndroid.SHORT);
            return;
        }

        // Go back if at least one update succeeded
        if (usernameSuccess || passwordSuccess) {
            setTimeout(() => {
                goBackToSettings();
            }, 1500);
        }
    };

    return (
        <SafeAreaView style={changeProfileStyles.container}>
            <StatusBar style="dark" />
            
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
            >
                <ScrollView 
                    ref={scrollViewRef}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={{ position: 'relative' }}>
                        <TouchableOpacity
                            style={changeProfileStyles.bannerContainer}
                            onPress={() => console.log('Banner pressed')}
                            activeOpacity={0.7}
                        >
                            <Image
                                source={require("../../assets/gifs/kimi_no_nawa.gif")}
                                style={changeProfileStyles.bannerPicture}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={changeProfileStyles.backButton}
                            onPress={goBackToSettings}
                        >
                            <Ionicons name="arrow-back" size={24} color="#000000" />
                        </TouchableOpacity>
                    </View>

                    <View style={changeProfileStyles.profileIconContainer}>
                        <View style={changeProfileStyles.profileCircleWrapper}>
                            <TouchableOpacity
                                style={changeProfileStyles.profileCircle}
                                onPress={() => console.log('Profile picture pressed')}
                                activeOpacity={0.6}
                            >
                                <Image
                                    source={require("../../assets/gifs/sixseven.gif")}
                                    style={changeProfileStyles.profileImage}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={changeProfileStyles.formContainer}>
                        <Text style={changeProfileStyles.sectionTitle}>Change Profile</Text>
                        
                        {/* New Username */}
                        <View style={changeProfileStyles.inputGroup}>
                            <Text style={changeProfileStyles.inputLabel}>New Username</Text>
                            <TextInput
                                ref={usernameRef}
                                style={changeProfileStyles.input}
                                placeholder="Enter new username"
                                placeholderTextColor="#999"
                                autoCapitalize="none"
                                value={newUsername}
                                onChangeText={setNewUsername}
                                editable={!loading}
                                onFocus={() => handleInputFocus(usernameRef)}
                            />
                        </View>

                        {/* Old Password */}
                        <View style={changeProfileStyles.inputGroup}>
                            <Text style={changeProfileStyles.inputLabel}>Old Password</Text>
                            <View style={changeProfileStyles.passwordContainer}>
                                <TextInput
                                    ref={oldPasswordRef}
                                    style={changeProfileStyles.passwordInput}
                                    placeholder="Enter old password"
                                    placeholderTextColor="#999"
                                    secureTextEntry={!showOldPassword}
                                    autoCapitalize="none"
                                    value={oldPassword}
                                    onChangeText={setOldPassword}
                                    editable={!loading}
                                    onFocus={() => handleInputFocus(oldPasswordRef)}
                                />
                                <TouchableOpacity
                                    style={changeProfileStyles.eyeIcon}
                                    onPress={() => setShowOldPassword(!showOldPassword)}
                                >
                                    <Ionicons 
                                        name={showOldPassword ? "eye-off" : "eye"} 
                                        size={24} 
                                        color="#666" 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* New Password */}
                        <View style={changeProfileStyles.inputGroup}>
                            <Text style={changeProfileStyles.inputLabel}>New Password</Text>
                            <View style={changeProfileStyles.passwordContainer}>
                                <TextInput
                                    ref={newPasswordRef}
                                    style={changeProfileStyles.passwordInput}
                                    placeholder="Enter new password"
                                    placeholderTextColor="#999"
                                    secureTextEntry={!showNewPassword}
                                    autoCapitalize="none"
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    editable={!loading}
                                    onFocus={() => handleInputFocus(newPasswordRef)}
                                />
                                <TouchableOpacity
                                    style={changeProfileStyles.eyeIcon}
                                    onPress={() => setShowNewPassword(!showNewPassword)}
                                >
                                    <Ionicons 
                                        name={showNewPassword ? "eye-off" : "eye"} 
                                        size={24} 
                                        color="#666" 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Confirm Password */}
                        <View style={changeProfileStyles.inputGroup}>
                            <Text style={changeProfileStyles.inputLabel}>Confirm Password</Text>
                            <View style={changeProfileStyles.passwordContainer}>
                                <TextInput
                                    ref={confirmPasswordRef}
                                    style={changeProfileStyles.passwordInput}
                                    placeholder="Confirm new password"
                                    placeholderTextColor="#999"
                                    secureTextEntry={!showConfirmPassword}
                                    autoCapitalize="none"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    editable={!loading}
                                    onFocus={() => handleInputFocus(confirmPasswordRef)}
                                />
                                <TouchableOpacity
                                    style={changeProfileStyles.eyeIcon}
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <Ionicons 
                                        name={showConfirmPassword ? "eye-off" : "eye"} 
                                        size={24} 
                                        color="#666" 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Update Button */}
                        <TouchableOpacity 
                            style={[changeProfileStyles.updateButton, loading && { opacity: 0.7 }]}
                            onPress={handleUpdateProfile}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#FFF" />
                            ) : (
                                <Text style={changeProfileStyles.updateButtonText}>Update Profile</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}