import React from "react";
import {
    View,
    Text,
    settingsPageStylesheet,
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

const { width, height } = Dimensions.get("window");

export default function SettingsPage() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
    });

    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={settingsPageStyles.container}>
            <StatusBar style="dark" />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Title */}
                <Text style={settingsPageStyles.title}>Settings</Text>

                {/* Profile Card */}
                <TouchableOpacity style={settingsPageStyles.card}>
                    <View style={settingsPageStyles.row}>
                        <Image
                            source={require("../../assets/icons/profilepic.png")}
                            style={settingsPageStyles.profileImage}
                        />

                        <View style={settingsPageStyles.textContainer}>
                            <Text style={settingsPageStyles.name}>Sample Username</Text>
                            <Text style={settingsPageStyles.subText}>Edit Details</Text>
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

