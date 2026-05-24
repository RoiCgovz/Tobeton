import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Image,
    Dimensions,
    ToastAndroid,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";  
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { cardPageStyles } from "../../styles/cardstyles";
import { folderPageStyles } from "../../styles/folderpagestyles";
import Svg, { Polygon } from "react-native-svg";
import cardService from "../../services/cardService";

const { width, height } = Dimensions.get("window");

export default function CardsPage() {
    const { folderId, folderName } = useLocalSearchParams();
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    useFocusEffect(
        useCallback(() => {
            loadCards();
        }, [folderId])
    );

    const loadCards = async () => {
        if (!folderId) {
            console.warn("No folderId provided");
            setLoading(false);
            return;
        }

        setLoading(true);
        const result = await cardService.getCards(folderId);
        
        if (result.success) {
            setCards(result.data);
        } else {
            ToastAndroid.show(
                result.error || "Failed to load cards",
                ToastAndroid.LONG
            );
        }
        
        setLoading(false);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadCards();
        setRefreshing(false);
    };

    const handleDeleteCard = async (cardId) => {
        ToastAndroid.show("Deleting card...", ToastAndroid.SHORT);
        
        const result = await cardService.deleteCard(cardId);
        
        if (result.success) {
            ToastAndroid.show("Card deleted successfully", ToastAndroid.SHORT);
            loadCards();
        } else {
            ToastAndroid.show(result.error || "Failed to delete card", ToastAndroid.LONG);
        }
    };

    const cardCount = cards.length;

    return (
        <SafeAreaView style={cardPageStyles.container}>
            <StatusBar barStyle="dark-content" />

            <Image
                source={require("../../assets/gifs/writing_background.gif")}
                style={folderPageStyles.background}
                resizeMode="cover"
            />

            <View style={folderPageStyles.overlay} />

            <Svg height="100%" width="100%" style={folderPageStyles.svg}>
                <Polygon
                    points={`
                        0,0 
                        ${width},0 
                        ${width},${height * 0.4} 
                        ${-width * 0.3},${height} 
                        0,${height}
                      `}
                    fill="#EEE"
                />
            </Svg>

            <View style={cardPageStyles.contentContainer}>
                <View style={cardPageStyles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={28} color="black" />
                    </TouchableOpacity>
                    <Text style={cardPageStyles.title}>
                        {folderName ? String(folderName) : "Folders"}
                    </Text>
                    <TouchableOpacity onPress={() => 
                        router.push({
                            pathname: "/cards/createCards",
                            params: { folderId: folderId, folderName: folderName }
                        })
                    }>
                        <Ionicons name="add-outline" size={40} color="black" />
                    </TouchableOpacity>
                </View>

                <Text style={cardPageStyles.sectionTitle}>Learn</Text>
                <View style={cardPageStyles.learnRow}>
                    <TouchableOpacity style={cardPageStyles.learnBox}
                        onPress={() =>
                            router.push({
                                pathname: "/folders/quiz",
                                params: { folderId: folderId, folderName: folderName },
                            })
                        }
                    >
                        <MaterialCommunityIcons name="file-document-outline" size={45} color="black" />
                        <View style={cardPageStyles.clockOverlay}>
                            <MaterialCommunityIcons name="clock-outline" size={16} color="black" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={cardPageStyles.learnBox}
                        onPress={() =>
                            router.push({
                                pathname: "/folders/flashcards",
                                params: { folderId: folderId, folderName: folderName },
                            })
                        }
                    >
                        <View style={cardPageStyles.cardIconStack}>
                            <MaterialCommunityIcons name="cards-playing-outline" size={50} color="black" />
                            <Text style={cardPageStyles.cardIconNumber}>{cardCount}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <Text style={cardPageStyles.sectionTitle}>Cards ({cardCount})</Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >
                    {loading ? (
                        <View style={cardPageStyles.loadingContainer}>
                            <ActivityIndicator size="large" color="#6C63FF" />
                            <Text style={cardPageStyles.loadingText}>Loading cards...</Text>
                        </View>
                    ) : cards.length === 0 ? (
                        <View style={cardPageStyles.emptyContainer}>
                            <Text style={cardPageStyles.emptyText}>
                                No cards yet. Tap + to create your first card!
                            </Text>
                        </View>
                    ) : (
                        cards.map((card) => (
                            <TouchableOpacity
                                key={card.id}
                                style={cardPageStyles.card}
                                onPress={() =>
                                    router.push({
                                        pathname: "/cards/editCards",
                                        params: { 
                                            cardId: card.id,
                                            question: card.question,
                                            answer: card.answer,
                                            folderId: folderId,
                                            folderName: folderName
                                        },
                                    })
                                }
                                onLongPress={() => {
                                    ToastAndroid.show(
                                        "Press delete to remove card",
                                        ToastAndroid.SHORT
                                    );
                                }}
                            >
                                <View style={cardPageStyles.cardContent}>
                                    <Text style={cardPageStyles.cardText} numberOfLines={2}>
                                        {card.question || "No question"}
                                    </Text>
                                    <View style={cardPageStyles.cardActions}>
                                        <Ionicons name="chevron-forward" size={20} color="black" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    )}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}