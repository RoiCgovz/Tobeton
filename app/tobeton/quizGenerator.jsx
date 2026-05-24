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

export default function QuizGenerator() {
  const router = useRouter();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const esRef = useRef(null);
  const flatListRef = useRef(null);
  const quizRef = useRef([]);

  // ======================
  // SAVE QUIZ
  // ======================
  const saveQuiz = async () => {
    try {
      const token = await AuthService.getToken();

      if (!token) {
        ToastAndroid.show("Not logged in", ToastAndroid.SHORT);
        return;
      }

      const payload = quizRef.current;

      if (!payload.length) {
        ToastAndroid.show("No quiz to save", ToastAndroid.SHORT);
        return;
      }

      const res = await fetch(
        "http://192.168.1.5:5000/quiz/save-bulk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            folder_id: 1,
            quizzes: payload,
          }),
        }
      );

      const data = await res.json().catch(() => null);

      if (res.ok) {
        ToastAndroid.show(
          `Saved ${payload.length} quizzes`,
          ToastAndroid.SHORT
        );
      } else {
        ToastAndroid.show(
          data?.error || "Save failed",
          ToastAndroid.SHORT
        );
      }
    } catch (err) {
      ToastAndroid.show("Network error", ToastAndroid.SHORT);
    }
  };

  // ======================
  // SEND MESSAGE (SSE)
  // ======================
 const sendMessage = () => {
  if (!input.trim()) return;

  const prompt = input;

  setMessages((prev) => [
    ...prev,
    { role: "user", text: prompt },
    { role: "bot", text: "" },
  ]);

  setInput("");
  setIsGenerating(true);

  quizRef.current = [];

  let botText = "";

  if (esRef.current) esRef.current.close();

  const es = new EventSource(
    "http://192.168.1.5:5000/quizAI/quiz-sse",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt }),
    }
  );

  esRef.current = es;

  es.addEventListener("message", (event) => {
    if (!event.data) return;

    try {
      const data = JSON.parse(event.data);

      if (data.type === "quiz") {
        const q = data.payload;

        if (!q?.question || !q?.options) return;

        quizRef.current.push(q);

        const text =
          `Q: ${q.question}\n` +
          `• ${q.options[0]}\n` +
          `• ${q.options[1]}\n` +
          `• ${q.options[2]}`;

        botText += (botText ? "\n\n" : "") + text;

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

      console.log(event.data);

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

  // ======================
  // UI
  // ======================
  return (
    <KeyboardAvoidingView
      style={tobetonStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={tobetonStyles.container}>
          {/* BACK */}
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} />
          </TouchableOpacity>

          {/* HEADER */}
          <View style={tobetonStyles.header}>
            <Text style={tobetonStyles.title}>Quiz Generator</Text>
          </View>

          {/* MESSAGES */}
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

          {/* SAVE BUTTON */}
          <TouchableOpacity onPress={saveQuiz} style={tobetonStyles.saveBtn}>
            <Text style={{ color: "#fff" }}>
              Save ({quizRef.current.length})
            </Text>
          </TouchableOpacity>

          {/* INPUT */}
          <View style={tobetonStyles.inputRow}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Generate quiz..."
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