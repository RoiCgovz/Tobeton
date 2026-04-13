import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Image,
    Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { cardPageStyles } from "../../styles/cardstyles";
import { folderPageStyles } from "../../styles/folderpagestyles";
import Svg, { Polygon } from "react-native-svg";

const { width, height } = Dimensions.get("window");

export default function CardsPage() {
    const { folderName } = useLocalSearchParams();

    return (
        <SafeAreaView style={cardPageStyles.container}>
            <StatusBar barStyle="dark-content" />

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

            <View style={cardPageStyles.contentContainer}>

                <View style={cardPageStyles.header}>
                    <TouchableOpacity onPress={() => router.push("/(tabs)/folders")}>
                        <Ionicons name="chevron-back" size={28} color="black" />
                    </TouchableOpacity>
                    <Text style={cardPageStyles.title}>
                        {folderName ? String(folderName) : "Comprog"}
                    </Text>
                    <View style={{ width: 28 }} />
                </View>

                {/* LEARN SECTION */}
                <Text style={cardPageStyles.sectionTitle}>Learn</Text>
                <View style={cardPageStyles.learnRow}>
                    <TouchableOpacity style={cardPageStyles.learnBox}>
                        <MaterialCommunityIcons name="file-document-outline" size={45} color="black" />
                        <View style={cardPageStyles.clockOverlay}>
                            <MaterialCommunityIcons name="clock-outline" size={16} color="black" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={cardPageStyles.learnBox}>
                        <View style={cardPageStyles.cardIconStack}>
                            <MaterialCommunityIcons name="cards-playing-outline" size={50} color="black" />
                            <Text style={cardPageStyles.cardIconNumber}>1</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* CARDS SECTION */}
                <Text style={cardPageStyles.sectionTitle}>Cards</Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}>
                    {[1, 2, 3, 4, 5].map((item) => (
                        <TouchableOpacity key={item} style={cardPageStyles.card}>
                            <Text style={cardPageStyles.cardText}>(Sample Question)</Text>
                            <Ionicons name="chevron-forward" size={20} color="black" />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}