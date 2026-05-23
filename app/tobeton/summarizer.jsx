import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {  tobetonStyles } from "../../styles/tobetonstyles";
export default function Summarizer() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { role: "user", text: input },
      { role: "bot", text: "Summary..." }
    ]);

    setInput("");
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 10 }}>

      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={28} />
      </TouchableOpacity>

      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View style={{
            alignSelf: item.role === "user" ? "flex-end" : "flex-start",
            backgroundColor: item.role === "user" ? "#cfe9ff" : "#e5e5e5",
            padding: 10,
            borderRadius: 10,
            marginVertical: 5,
            maxWidth: "80%"
          }}>
            <Text>{item.text}</Text>
          </View>
        )}
      />

      <View style={tobetonStyles.inputRow}>
        <TextInput
          placeholder="Enter Input..."
          value={input}
          onChangeText={setInput}
          style={tobetonStyles.input}
          multiline
        />

        <TouchableOpacity onPress={send} style={tobetonStyles.sendBtn}>
          <Text style={{ color: "#fff" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

