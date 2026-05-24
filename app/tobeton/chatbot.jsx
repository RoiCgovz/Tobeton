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

export default function Chatbot() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    const botMsg = { role: "bot", text: "" };

    const currentInput = input;

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
    setIsTyping(true);

    let botText = "";

    const es = new EventSource(
      "http://192.168.1.5:5000/chatbot/chatbot-sse",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentInput }),
      }
    );

    es.addEventListener("message", (event) => {
      if (!event.data) return;

      if (event.data === "[DONE]") {
        setIsTyping(false);
        es.close();
        return;
      }

      const chunk = event.data;

      const needsSpace =
        botText.length > 0 &&
        !botText.endsWith(" ") &&
        !/^[.,!?%]/.test(chunk) &&
        !chunk.startsWith(" ");

      botText += (needsSpace ? " " : "") + chunk;

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          text: botText,
        };
        return updated;
      });
    });

    es.addEventListener("error", (err) => {
      console.log("SSE Error:", err);
      setIsTyping(false);
      es.close();
    });
  };

  return (
    <KeyboardAvoidingView
      style={tobetonStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={tobetonStyles.container}>

          {/* BACK BUTTON */}
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} />
          </TouchableOpacity>


          <View style={tobetonStyles.header}>
            <Text style={tobetonStyles.title}>Chatbot</Text>
          </View>

          {/* MESSAGES */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(_, i) => i.toString()}
            style={{ flex: 1 }}
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

          {/* INPUT (NOW USING YOUR STYLES) */}
          <View style={tobetonStyles.inputRow}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Enter Input..."
              style={tobetonStyles.input}
              multiline
            />

            <TouchableOpacity
              onPress={sendMessage}
              style={tobetonStyles.sendBtn}
            >
              <Text style={{ color: "#fff" }}>Send</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}