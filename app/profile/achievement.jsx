import React, { useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
    BackHandler,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { achievementPageStyles } from "../../styles/achievementpagestyle";

const { width } = Dimensions.get("window");

const achievementsData = [
    {
        id: "1",
        name: "Welcome Warrior",
        icon: "trophy-outline",
        current: 1,
        total: 10,
    },
    {
        id: "2",
        name: "Social Butterfly",
        icon: "people-outline",
        current: 5,
        total: 5,
    },
    {
        id: "3",
        name: "Content Creator",
        icon: "videocam-outline",
        current: 3,
        total: 10,
    },
];

const AchievementCard = ({ item }) => {
    const isCompleted = item.current === item.total;

    return (
        <TouchableOpacity style={achievementPageStyles.card}>
            <View style={achievementPageStyles.cardIconContainer}>
                <Ionicons name={item.icon} size={32} color="#000000" />
            </View>

            <Text style={achievementPageStyles.cardName} numberOfLines={2}>
                {item.name}
            </Text>

            <View style={achievementPageStyles.progressContainer}>
                <Text style={achievementPageStyles.progressText}>
                    {item.current}/{item.total}
                </Text>
                {isCompleted && (
                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                )}
            </View>
        </TouchableOpacity>
    );
};

export default function AchievementPage() {
    const renderItem = ({ item }) => <AchievementCard item={item} />;

    const goBackToProfile = () => {
        router.dismissTo('/profile');
    };

    // Handle Android hardware back button
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            goBackToProfile();
            return true; // Prevent default behavior (exiting app)
        });

        return () => backHandler.remove(); // Cleanup
    }, []);

    return (
        <SafeAreaView style={achievementPageStyles.container}>
            <StatusBar style="dark" />

            <View style={achievementPageStyles.header}>
                <TouchableOpacity
                    style={achievementPageStyles.backButton}
                    onPress={goBackToProfile}
                >
                    <Ionicons name="arrow-back" size={24} color="#000000" />
                </TouchableOpacity>

                <Text style={achievementPageStyles.headerTitle}>
                    Achievements
                </Text>

                <View style={achievementPageStyles.placeholderRight} />
            </View>

            <FlatList
                data={achievementsData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={achievementPageStyles.gridContainer}
                columnWrapperStyle={achievementPageStyles.columnWrapper}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}