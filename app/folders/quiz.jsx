import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { quizstyles } from "../../styles/quizStyels";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function QuizPage() {
    const { folderName } = useLocalSearchParams();

    return (
        <SafeAreaView style={quizstyles.container}>

            {/* HEADER */}
            
                    {/* Header */}
                    <View style={quizstyles.header}>
                      <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="chevron-back" size={28} color="black" />
                      </TouchableOpacity>
            
                      <Text style={quizstyles.title}>
                        {folderName ? String(folderName): ""}
                      </Text>
            
                      <View style={{ width: 30 }} />
                    </View>

            {/* QUESTION CARD */}
            <View style={quizstyles.card}>
                <Text style={quizstyles.questionText}>(Sample Question)</Text>
            </View>

            {/* OPTIONS */}
            <View style={quizstyles.optionsRow}>
                <TouchableOpacity style={quizstyles.optionLeft} />
                <TouchableOpacity style={quizstyles.optionRight} />
            </View>

            {/* NEXT BUTTON */}
            <TouchableOpacity style={quizstyles.optionBottom}>
                <Text style={quizstyles.nextText}></Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}