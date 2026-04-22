import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image,
    Dimensions,
    ToastAndroid,
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

const { width, height } = Dimensions.get("window");

export default function FolderPage() {
    const [layout, setLayout] = useState("scroll");

    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
    });

    if (!fontsLoaded) return null;

    const folders = [{ name: "Comprog", count: 67 },
    { name: "DSA", count: 7 },
    { name: "Math", count: 15 },
    { name: "Science", count: 5 },
    { name: "History", count: 3 },
    ];
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
                    />
                </View>

                {/* FOLDERS */}
                <View style={folderPageStyles.scrollContainer}>
                    {layout === "grid" ? (
                        // 🔲 GRID VIEW
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={folderPageStyles.gridContainer}>
                                {folders.map((folder, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={folderPageStyles.gridCard}
                                        onPress={() =>
                                            router.push({
                                                pathname: "/folders/cards",
                                                params: { folderName: folder.name },
                                            })
                                        }
                                    >
                                        <Text style={folderPageStyles.folderTitle}>
                                            {folder.name}
                                        </Text>
                                        <Text style={folderPageStyles.folderSubText}>
                                            {folder.count} cards
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    ) : (
                        // 📜 SCROLL + 📋 LIST
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {folders.map((folder, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={
                                        layout === "list"
                                            ? folderPageStyles.listCard
                                            : folderPageStyles.folderCard
                                    }
                                    onPress={() =>
                                        router.push({
                                            pathname: "/folders/cards",
                                            params: { folderName: folder.name },
                                        })
                                    }
                                >
                                    <Text style={folderPageStyles.folderTitle}>
                                        {folder.name}
                                    </Text>

                                    <Text style={folderPageStyles.folderSubText}>
                                        {folder.count} cards
                                    </Text>

                                    <Text style={folderPageStyles.folderSubText}>
                                        67% Score
                                    </Text>
                                </TouchableOpacity>
                            ))}
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

                        <TouchableOpacity style={folderPageStyles.squareBtn}>
                            <Text>🖼️</Text>
                        </TouchableOpacity>

                        {/* SWITCH BUTTON */}
                        <TouchableOpacity
                            style={folderPageStyles.squareBtn}
                            onPress={() => {
                                if (layout === "scroll") {
                                    setLayout("list")
                                    ToastAndroid.show(
                                            "List View",
                                            ToastAndroid.SHORT
                                        );
                                }
                                else if (layout === "list"){
                                    setLayout("grid")
                                    ToastAndroid.show(
                                            "Grid View",
                                            ToastAndroid.SHORT
                                        );
                                }
                                else {
                                    setLayout("scroll")
                                    ToastAndroid.show(
                                            "Scroll View",
                                            ToastAndroid.SHORT
                                        );
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