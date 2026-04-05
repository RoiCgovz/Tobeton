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

const { width, height } = Dimensions.get("window");

export default function ChangeProfilePage() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
    });

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    // Refs for scrolling
    const scrollViewRef = useRef();
    const usernameRef = useRef();
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef = useRef();

    if (!fontsLoaded) return null;

    const goBackToSettings = () => {
        router.dismissTo('/settings');
    };
    
    // Handle Android hardware back button
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            goBackToSettings();
            return true; // Prevent default behavior (exiting app)
        });

        return () => backHandler.remove(); // Cleanup
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
                    {/* Wrapper for banner and buttons */}
                    <View style={{ position: 'relative' }}>
                        {/* Banner - Pressable */}
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

                        {/* Back Button - Positioned absolutely */}
                        <TouchableOpacity
                            style={changeProfileStyles.backButton}
                            onPress={goBackToSettings}
                        >
                            <Ionicons name="arrow-back" size={24} color="#000000" />
                        </TouchableOpacity>
                    </View>

                    {/* Profile Circle - Same as profile page */}
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

                    {/* Form Fields Section */}
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
                                onFocus={() => handleInputFocus(usernameRef)}
                            />
                        </View>

                        {/* Old Password with visibility toggle */}
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

                        {/* New Password with visibility toggle */}
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

                        {/* Confirm Password with visibility toggle */}
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
                            style={changeProfileStyles.updateButton}
                            onPress={() => {
                                console.log('Profile updated');
                                goBackToSettings();
                            }}
                        >
                            <Text style={changeProfileStyles.updateButtonText}>Update Profile</Text>
                        </TouchableOpacity>
                    </View>
                    {/* Removed extra space at bottom */}
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}