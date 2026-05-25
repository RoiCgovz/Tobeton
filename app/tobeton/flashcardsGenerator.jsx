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
  ToastAndroid,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import EventSource from "react-native-sse";
import { tobetonStyles } from "../../styles/tobetonstyles";
import AuthService from "../../services/authService";

export default function FlashCardsGenerator() {
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const flatListRef = useRef(null);
  const esRef = useRef(null);

  const cardsRef = useRef([]);
  const folderRef = useRef(null);

  const saveCards = async () => {
    try {
      const token = await AuthService.getToken();

      if (!token) {
        ToastAndroid.show("Not logged in", ToastAndroid.SHORT);
        return;
      }

      if (!cardsRef.current.length) {
        ToastAndroid.show("No flashcards to save", ToastAndroid.SHORT);
        return;
      }

      const folder = folderRef.current || {};

      const res = await fetch(
        "http://192.168.1.5:5000/flashcards/save-cards",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            subject: folder.subject,
            topic: folder.topic,
            cards: cardsRef.current,
          }),
        }
      );

      const data = await res.json().catch(() => null);

      if (res.ok) {
        ToastAndroid.show(
          `Saved ${cardsRef.current.length} flashcards`,
          ToastAndroid.SHORT
        );
      } else {
        ToastAndroid.show(data?.error || "Save failed", ToastAndroid.SHORT);
      }
    } catch (err) {
      ToastAndroid.show("Network error", ToastAndroid.SHORT);
    }
  };
  const sendMessage = () => {
    if (!input.trim()) return;

    const currentInput = input;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: currentInput },
      { role: "bot", text: "" },
    ]);

    setInput("");
    setIsGenerating(true);

    cardsRef.current = [];
    folderRef.current = null;

    if (esRef.current) esRef.current.close();

    const es = new EventSource(
      "http://192.168.1.5:5000/flashcardsAI/flashcards-sse",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentInput }),
      }
    );

    esRef.current = es;

    let botText = "";

    es.addEventListener("message", (event) => {
      if (!event.data) return;

      try {
        const data = JSON.parse(event.data);

    
      if (data.type === "final") {
        const folder = data.payload.folder;

        folderRef.current = {
          subject: folder.subject,
          topic: folder.topic,
          folder_name: folder.folder_name,
        };

        cardsRef.current = data.payload.cards || [];
      }
        if (data.type === "card") {
          const raw = data.payload;

          const card = {
            question: raw.question || raw.Question || raw.q,
            answer: raw.answer || raw.Answer || raw.a,
          };

          if (!card.question || !card.answer) return;

          cardsRef.current.push(card);

          const cardText = `Q: ${card.question}\nA: ${card.answer}`;
          botText += (botText ? "\n\n" : "") + cardText;

          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "bot",
              text: botText,
            };
            return updated;
          });
        }

        if (data.type === "done") {
          setIsGenerating(false);
          es.close();
          esRef.current = null;
        }
      } catch (err) {
        console.log("Parse error:", err);
      }
    });

    es.addEventListener("error", (err) => {
      console.log("SSE Error:", err);
      setIsGenerating(false);
      es.close();
    });
  };

  return (
    <KeyboardAvoidingView
      style={tobetonStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={tobetonStyles.container}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} />
          </TouchableOpacity>

          <View style={tobetonStyles.header}>
            <Text style={tobetonStyles.title}>Flashcards</Text>
          </View>

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(_, i) => i.toString()}
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

          <TouchableOpacity onPress={saveCards} style={tobetonStyles.saveBtn}>
            <Text style={{ color: "#fff" }}>
              Save ({cardsRef.current.length})
            </Text>
          </TouchableOpacity>

          <View style={tobetonStyles.inputRow}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Generate flashcards..."
              style={tobetonStyles.input}
              multiline
            />

            <TouchableOpacity
              onPress={sendMessage}
              style={tobetonStyles.sendBtn}
            >
              <Text style={{ color: "#fff" }}>
                {isGenerating ? "..." : "Send"}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}