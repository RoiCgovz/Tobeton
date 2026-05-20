import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image,
    Dimensions,
    ToastAndroid,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import Svg, { Polygon } from "react-native-svg";
import {
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
} from "@expo-google-fonts/inter";
import { folderPageStyles } from "../../styles/folderpagestyles";
import { router } from "expo-router";
import folderService from "../../services/folderService";

const { width, height } = Dimensions.get("window");

export default function FolderPage() {
    const [layout, setLayout] = useState("scroll");
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
    });

    useEffect(() => {
        loadFolders();
    }, []);

    const loadFolders = async () => {
        setLoading(true);
        const result = await folderService.getFolders();
        
        if (result.success) {
            setFolders(result.data);
        } else {
            ToastAndroid.show(
                result.error || "Failed to load folders",
                ToastAndroid.LONG
            );
        }
        
        setLoading(false);
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await loadFolders();
        setRefreshing(false);
    };

    // Filter folders based on search
    const filteredFolders = folders.filter(folder =>
        folder.folder_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        folder.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        folder.topic.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!fontsLoaded) return null;

    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="dark" />

            {/* BACKGROUND */}
            <Image
                source={require("../../assets/gifs/writing_background.gif")}
                style={folderPageStyles.background}
                resizeMode="cover"
            />

            {/* OVERLAY */}
            <View style={folderPageStyles.overlay} />

            {/* DIAGONAL */}
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

            <SafeAreaView style={folderPageStyles.container}>
                {/* HEADER */}
                <Text style={folderPageStyles.title}>My Folders</Text>

                {/* SEARCH */}
                <View style={folderPageStyles.searchBar}>
                    <Text style={{ color: "#888" }}>🔍</Text>
                    <TextInput
                        placeholder="Search Folders"
                        placeholderTextColor="#999"
                        style={folderPageStyles.searchInput}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* FOLDERS */}
                <View style={folderPageStyles.scrollContainer}>
                    {loading ? (
                        <View style={folderPageStyles.loadingContainer}>
                            <ActivityIndicator size="large" color="#6C63FF" />
                            <Text style={folderPageStyles.loadingText}>Loading folders...</Text>
                        </View>
                    ) : filteredFolders.length === 0 ? (
                        <View style={folderPageStyles.emptyContainer}>
                            <Text style={folderPageStyles.emptyText}>
                                {searchQuery ? "No matching folders found" : "No folders yet. Create your first folder!"}
                            </Text>
                        </View>
                    ) : (
                        <ScrollView 
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                            }
                        >
                            {layout === "grid" ? (
                                // 🔲 GRID VIEW
                                <View style={folderPageStyles.gridContainer}>
                                    {filteredFolders.map((folder) => (
                                        <TouchableOpacity
                                            key={folder.id}
                                            style={folderPageStyles.gridCard}
                                            onPress={() =>
                                                router.push({
                                                    pathname: "/folders/cards",
                                                    params: { 
                                                        folderId: folder.id,
                                                        folderName: folder.folder_name 
                                                    },
                                                })
                                            }
                                        >
                                            <Text style={folderPageStyles.folderTitle}>
                                                {folder.folder_name}
                                            </Text>
                                            <Text style={folderPageStyles.folderSubText}>
                                                {folder.subject} • {folder.topic}
                                            </Text>
                                            <Text style={folderPageStyles.folderSubText}>
                                                {folder.card_quantity || 0} cards
                                            </Text>
                                            <View style={folderPageStyles.difficultyBadge}>
                                                <Text style={folderPageStyles.difficultyBadgeText}>
                                                    {folder.difficulty}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ) : layout === "list" ? (
                                // 📋 LIST VIEW
                                <View>
                                    {filteredFolders.map((folder) => (
                                        <TouchableOpacity
                                            key={folder.id}
                                            style={folderPageStyles.listCard}
                                            onPress={() =>
                                                router.push({
                                                    pathname: "/folders/cards",
                                                    params: { 
                                                        folderId: folder.id,
                                                        folderName: folder.folder_name 
                                                    },
                                                })
                                            }
                                        >
                                            <View style={folderPageStyles.listItemContent}>
                                                <View style={folderPageStyles.listItemLeft}>
                                                    <Text style={folderPageStyles.folderTitle}>
                                                        {folder.folder_name}
                                                    </Text>
                                                    <Text style={folderPageStyles.folderSubText}>
                                                        {folder.subject} • {folder.topic}
                                                    </Text>
                                                </View>
                                                <View style={folderPageStyles.listItemRight}>
                                                    <Text style={folderPageStyles.cardCount}>
                                                        {folder.card_quantity || 0} cards
                                                    </Text>
                                                    <View style={folderPageStyles.difficultyBadgeSmall}>
                                                        <Text style={folderPageStyles.difficultyBadgeTextSmall}>
                                                            {folder.difficulty}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ) : (
                                // 📜 SCROLL VIEW
                                <View>
                                    {filteredFolders.map((folder) => (
                                        <TouchableOpacity
                                            key={folder.id}
                                            style={folderPageStyles.folderCard}
                                            onPress={() =>
                                                router.push({
                                                    pathname: "/folders/cards",
                                                    params: { 
                                                        folderId: folder.id,
                                                        folderName: folder.folder_name 
                                                    },
                                                })
                                            }
                                        >
                                            <Text style={folderPageStyles.folderTitle}>
                                                {folder.folder_name}
                                            </Text>
                                            <Text style={folderPageStyles.folderSubText}>
                                                {folder.subject} • {folder.topic}
                                            </Text>
                                            <View style={folderPageStyles.cardStats}>
                                                <Text style={folderPageStyles.folderSubText}>
                                                    📄 {folder.card_quantity || 0} cards
                                                </Text>
                                                <View style={folderPageStyles.difficultyBadge}>
                                                    <Text style={folderPageStyles.difficultyBadgeText}>
                                                        {folder.difficulty}
                                                    </Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </ScrollView>
                    )}
                </View>

                {/* FLOATING BUTTONS */}
                <View style={folderPageStyles.rightButtons}>
                    <TouchableOpacity
                        onPress={() => router.push("/folders/createFolder")}
                        style={folderPageStyles.squareBtn}
                    >
                        <Text style={folderPageStyles.plus}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={folderPageStyles.squareBtn}
                        onPress={onRefresh}
                    >
                        <Text>🔄</Text>
                    </TouchableOpacity>

                    {/* SWITCH BUTTON */}
                    <TouchableOpacity
                        style={folderPageStyles.squareBtn}
                        onPress={() => {
                            if (layout === "scroll") {
                                setLayout("list")
                                ToastAndroid.show("List View", ToastAndroid.SHORT);
                            }
                            else if (layout === "list"){
                                setLayout("grid")
                                ToastAndroid.show("Grid View", ToastAndroid.SHORT);
                            }
                            else {
                                setLayout("scroll")
                                ToastAndroid.show("Scroll View", ToastAndroid.SHORT);
                            }
                        }}
                    >
                        <Text>
                            {layout === "scroll" ? "☰" : layout === "list" ? "📋" : "🔲"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}