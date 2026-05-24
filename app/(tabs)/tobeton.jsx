import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {  tobetonStyles } from "../../styles/tobetonstyles";

export default function Tobeton() {
    const router = useRouter();

  const buttons = [
    { title: "Chatbot", route: "/tobeton/chatbot" },
    { title: "Flashcards Generator", route: "/tobeton/flashcardsGenerator" },
    { title: "Quiz Generator", route: "/tobeton/quizGenerator" },
    { title: "Summarizer", route: "/tobeton/summarizer" },
    { title: "Suggestions", route: "/tobeton/suggestions" },
  ];

  return (
    <SafeAreaView style={tobetonStyles.container}>

      <TouchableOpacity onPress={() => router.back()} style={tobetonStyles.backBtn}>
        <Ionicons name="chevron-back" size={28} color="black" />
      </TouchableOpacity>

      <View style={tobetonStyles.menu}>
        {buttons.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={tobetonStyles.button}
            onPress={() => router.push(item.route)}
          >
            <Text style={tobetonStyles.buttonText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}


 