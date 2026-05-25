import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import EventSource from "react-native-sse";
import { tobetonStyles } from "../../styles/tobetonstyles";
import AuthService from "../../services/authService";

export default function StudySuggestions() {
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const flatListRef = useRef(null);
  const esRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const currentInput = input;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: currentInput },
      { role: "bot", text: "Loading..." },
    ]);

    setInput("");
    setIsTyping(true);

    try {
      const token = await AuthService.getToken();

      const res = await fetch(
        "http://192.168.1.5:5000/suggestion/study-suggestions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            message: currentInput,
          }),
        }
      );

      const data = await res.json();

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "bot",
          text: data.response, // ✅ THIS IS THE FIX
        };
        return updated;
      });

    } catch (err) {
      console.log(err);

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "bot",
          text: "Error getting suggestions",
        };
        return updated;
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={tobetonStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={tobetonStyles.container}>
          {/* BACK BUTTON */}
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} />
          </TouchableOpacity>

          {/* HEADER */}
          <View style={tobetonStyles.header}>
            <Text style={tobetonStyles.title}>Study Suggestions</Text>
          </View>

          {/* MESSAGES */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(_, i) => i.toString()}
            contentContainerStyle={{ paddingBottom: 10 }}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
            renderItem={({ item }) => (
              <View
                style={[
                  tobetonStyles.message,
                  item.role === "user"
                    ? tobetonStyles.user
                    : tobetonStyles.bot,
                ]}
              >
                <Text>{item.text}</Text>
              </View>
            )}
          />

          {/* INPUT */}
          <View style={tobetonStyles.inputRow}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Ask for study suggestions..."
              style={tobetonStyles.input}
              multiline
            />

            <TouchableOpacity
              onPress={sendMessage}
              style={tobetonStyles.sendBtn}
            >
              <Text style={{ color: "#fff" }}>
                {isTyping ? "..." : "Send"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}