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
    Alert,
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
import { Ionicons } from "@expo/vector-icons";

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

    const deleteFolder = async (id) => {
        try {
            const result = await folderService.deleteFolder(id);

            if (result.success) {
                setFolders((prev) => prev.filter((f) => f.id !== id));
                ToastAndroid.show("Folder deleted", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show(
                    result.error || "Delete failed",
                    ToastAndroid.SHORT
                );
            }
        } catch (err) {
            ToastAndroid.show("Network error", ToastAndroid.SHORT);
        }
    };

    const confirmDelete = (id, name) => {
        Alert.alert(
            "Delete Folder",
            `Delete "${name}"? This cannot be undone.`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => deleteFolder(id),
                },
            ]
        );
    };


    const editFolder = (folder) => {
        router.push({
            pathname: "/folders/UpdateFolderPage",
            params: {
                id: folder.id,
                folder_name: folder.folder_name,
                subject: folder.subject,
                topic: folder.topic,
                difficulty: folder.difficulty,
            },
        });
    };

    const filteredFolders = folders.filter(folder =>
        folder.folder_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        folder.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        folder.topic.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!fontsLoaded) return null;

    return (
        <View style={{ flex: 1 }}>
            <StatusBar style="dark" />

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

            <SafeAreaView style={folderPageStyles.container}>
                <Text style={folderPageStyles.title}>My Folders</Text>

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

                <View style={folderPageStyles.scrollContainer}>
                    {loading ? (
                        <View style={folderPageStyles.loadingContainer}>
                            <ActivityIndicator size="large" color="#6C63FF" />
                            <Text style={folderPageStyles.loadingText}>
                                Loading folders...
                            </Text>
                        </View>
                    ) : filteredFolders.length === 0 ? (
                        <View style={folderPageStyles.emptyContainer}>
                            <Text style={folderPageStyles.emptyText}>
                                {searchQuery
                                    ? "No matching folders found"
                                    : "No folders yet. Create your first folder!"}
                            </Text>
                        </View>
                    ) : (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                        >
                            {layout === "grid" ? (
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
                                                        folderName: folder.folder_name,
                                                    },
                                                })
                                            }
                                            onLongPress={() =>
                                                Alert.alert(
                                                    "Folder Options",
                                                    folder.folder_name,
                                                    [
                                                        { text: "Cancel", style: "cancel" },
                                                        {
                                                            text: "Edit",
                                                            onPress: () => editFolder(folder),
                                                        },
                                                        {
                                                            text: "Delete",
                                                            style: "destructive",
                                                            onPress: () =>
                                                                confirmDelete(folder.id, folder.folder_name),
                                                        },
                                                    ]
                                                )
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
                                                        folderName: folder.folder_name,
                                                    },
                                                })
                                            }
                                            onLongPress={() =>
                                                Alert.alert(
                                                    "Folder Options",
                                                    folder.folder_name,
                                                    [
                                                        { text: "Cancel", style: "cancel" },
                                                        {
                                                            text: "Edit",
                                                            onPress: () => editFolder(folder),
                                                        },
                                                        {
                                                            text: "Delete",
                                                            style: "destructive",
                                                            onPress: () =>
                                                                confirmDelete(folder.id, folder.folder_name),
                                                        },
                                                    ]
                                                )
                                            }
                                        >
                                            <View style={folderPageStyles.listCardContent}>
                                                <Text style={folderPageStyles.listFolderTitle}>
                                                    {folder.folder_name}
                                                </Text>

                                                <View style={folderPageStyles.listCardFooter}>
                                                    <Text style={folderPageStyles.listCardCount}>
                                                        📄 {folder.card_quantity || 0} cards
                                                    </Text>
                                                    <View style={folderPageStyles.listDifficultyBadge}>
                                                        <Text style={folderPageStyles.listDifficultyText}>
                                                            {folder.difficulty || "Beginner"}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            ) : (
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
                                                        folderName: folder.folder_name,
                                                    },
                                                })
                                            }
                                            onLongPress={() =>
                                                Alert.alert(
                                                    "Folder Options",
                                                    folder.folder_name,
                                                    [
                                                        { text: "Cancel", style: "cancel" },
                                                        {
                                                            text: "Edit",
                                                            onPress: () => editFolder(folder),
                                                        },
                                                        {
                                                            text: "Delete",
                                                            style: "destructive",
                                                            onPress: () =>
                                                                confirmDelete(folder.id, folder.folder_name),
                                                        },
                                                    ]
                                                )
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
                        <Ionicons name="refresh-outline" size={22} color="#000" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={folderPageStyles.squareBtn}
                        onPress={() => {
                            if (layout === "scroll") setLayout("list");
                            else if (layout === "list") setLayout("grid");
                            else setLayout("scroll");
                        }}
                    >
                     <Ionicons
  name={
    layout === "scroll"
      ? "reorder-three-outline"
      : layout === "list"
      ? "list-outline"
      : "grid-outline"
  }
  size={22}
  color="#000"
/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}