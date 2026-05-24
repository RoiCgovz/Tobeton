import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {  tobetonStyles } from "../../styles/tobetonstyles";

export default function Chatbot() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    const botMsg = { role: "bot", text: "AI response will appear here..." };

    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  return (
    <SafeAreaView style={tobetonStyles.container}>

      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={28} />
      </TouchableOpacity>

      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        style={{ flex: 1 }}
        renderItem={({ item }) => (
          <View style={[
            tobetonStyles.message,
            item.role === "user" ? tobetonStyles.user : tobetonStyles.bot
          ]}>
            <Text>{item.text}</Text>
          </View>
        )}
      />

      <View style={tobetonStyles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Enter Input..."
          style={tobetonStyles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={tobetonStyles.sendBtn}>
          <Text style={{ color: "#fff" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

