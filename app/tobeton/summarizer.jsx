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

export default function Summarizer() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const flatListRef = useRef(null);

  const send = () => {
    if (!input.trim()) return;

    const currentInput = input;

    setMessages(prev => [
      ...prev,
      { role: "user", text: currentInput },
      { role: "bot", text: "" },
    ]);

    setInput("");
    setIsTyping(true);

    const es = new EventSource(
      "http://192.168.1.5:5000/summary/summary-sse",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentInput }),
      }
    );

    let botText = "";

    const isPunctuation = (t) =>
      /^[,.)!?;:\]}\-]$/.test(t);

    es.addEventListener("message", (event) => {
      if (!event.data) return;

      if (event.data === "[DONE]") {
        setIsTyping(false);
        es.close();
        return;
      }

      const token = event.data;

      const lastChar = botText.slice(-1);

      const needsSpace =
        botText.length > 0 &&
        !isPunctuation(token) &&
        lastChar !== " " &&
        !/[(\[{]$/.test(lastChar);

      botText += needsSpace ? " " + token : token;

      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "bot",
          text: botText,
        };
        return updated;
      });
    });

    es.addEventListener("error", (err) => {
      console.error("[SSE ERROR]", err);
      setIsTyping(false);
      es.close();

      setMessages(prev => [
        ...prev,
        { role: "bot", text: "Error: Connection failed" },
      ]);
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

          {/* HEADER */}
          <View style={tobetonStyles.header}>
            <Text style={tobetonStyles.title}>Summarizer</Text>
          </View>

          {/* MESSAGES LIST */}
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

          {/* INPUT SECTION */}
          <View style={tobetonStyles.inputRow}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Enter Input..."
              style={tobetonStyles.input}
              multiline
              editable={!isTyping}
            />

            <TouchableOpacity
              onPress={send}
              style={tobetonStyles.sendBtn}
              disabled={isTyping}
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