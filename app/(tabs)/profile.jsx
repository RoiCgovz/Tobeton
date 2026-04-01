import React from "react";
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
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function ProfilePage() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
    });

    if (!fontsLoaded) return null;

    return (
        <SafeAreaView style={profilePageStyles.container}>
            <StatusBar style="light" />

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Wrapper for banner and add button */}
                <View style={{ position: 'relative' }}>
                    {/* Black Banner - Pressable */}
                    <TouchableOpacity
                        style={profilePageStyles.bannerContainer}
                        onPress={() => console.log('Banner pressed')}
                        activeOpacity={0.7}
                    >
                        <Image
                            source={require("../../assets/gifs/kimi_no_nawa.gif")}
                            style={profilePageStyles.bannerPicture}
                        />
                    </TouchableOpacity>

                    {/* Add Button - Separate Pressable (Positioned absolutely) */}
                    <TouchableOpacity
                        style={profilePageStyles.addButton}
                        onPress={() => console.log('Add button pressed')}
                    >
                        <Text style={profilePageStyles.addButtonText}>+ Add</Text>
                    </TouchableOpacity>
                </View>

                {/* White Profile Circle - Pressable */}
                <View style={profilePageStyles.profileIconContainer}>
                    <View style={profilePageStyles.profileCircleWrapper}>
                        <TouchableOpacity
                            style={profilePageStyles.profileCircle}
                            onPress={() => console.log('Profile picture pressed')}
                            activeOpacity={0.6}
                        >
                            <Image
                                source={require("../../assets/gifs/sixseven.gif")}
                                style={profilePageStyles.profileImage}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Profile Stats Section */}
                <View style={profilePageStyles.profileStats}>
                    <Text style={profilePageStyles.username}>SIX SEVEN</Text>

                    <View style={profilePageStyles.statsRow}>
                        <View style={profilePageStyles.statItem}>
                            <Text style={profilePageStyles.statNumber}>1.2k</Text>
                            <Text style={profilePageStyles.statLabel}>Following</Text>
                        </View>
                        <View style={profilePageStyles.statItem}>
                            <Text style={profilePageStyles.statNumber}>67</Text>
                            <Text style={profilePageStyles.statLabel}>Friends</Text>
                        </View>
                        <View style={profilePageStyles.statItem}>
                            <Text style={profilePageStyles.statNumber}>12</Text>
                            <Text style={profilePageStyles.statLabel}>Achievements</Text>
                        </View>
                    </View>


                </View>

                {/* Trippy Cards Section - 2x2 Grid */}
                <View style={profilePageStyles.cardsSection}>
                    <Text style={profilePageStyles.sectionTitle}>Your Collection</Text>

                    <View style={profilePageStyles.cardsGrid}>
                        {/* Card 1 - Top Right (Achievements Card) */}
                        <TouchableOpacity style={profilePageStyles.trippyCard}>
                            <View style={profilePageStyles.cardIconContainer}>
                                <Ionicons name="trophy-outline" size={32} color="#000000" />
                            </View>
                            <Text style={profilePageStyles.cardTitle}>Achievements</Text>
                            <Text style={profilePageStyles.cardSubtitle}>12 unlocked</Text>
                        </TouchableOpacity>

                        {/* Card 2 - Top Left - Placeholder */}
                        <TouchableOpacity style={profilePageStyles.trippyCard}>
                            <View style={profilePageStyles.cardIconContainer}>
                                <Ionicons name="add-circle-outline" size={32} color="#CCCCCC" />
                            </View>
                            <Text style={profilePageStyles.cardTitle}>Coming Soon</Text>
                            <Text style={profilePageStyles.cardSubtitle}>Stay tuned</Text>
                        </TouchableOpacity>

                        {/* Card 3 - Bottom Left - Placeholder */}
                        <TouchableOpacity style={profilePageStyles.trippyCard}>
                            <View style={profilePageStyles.cardIconContainer}>
                                <Ionicons name="lock-closed-outline" size={32} color="#CCCCCC" />
                            </View>
                            <Text style={profilePageStyles.cardTitle}>Locked</Text>
                            <Text style={profilePageStyles.cardSubtitle}>Complete more</Text>
                        </TouchableOpacity>

                        {/* Card 4 - Bottom Right - Placeholder */}
                        <TouchableOpacity style={profilePageStyles.trippyCard}>
                            <View style={profilePageStyles.cardIconContainer}>
                                <Ionicons name="star-outline" size={32} color="#CCCCCC" />
                            </View>
                            <Text style={profilePageStyles.cardTitle}>Rewards</Text>
                            <Text style={profilePageStyles.cardSubtitle}>Coming soon</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Additional Content Placeholder */}
                <View style={profilePageStyles.placeholderContent}>
                    <Text style={profilePageStyles.placeholderText}>More content coming soon...</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}