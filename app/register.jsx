import React, { useState } from "react";
import Svg, { Polygon } from "react-native-svg";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useFonts } from "expo-font";
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { regStyles } from "../styles/regstyles";

const { width, height } = Dimensions.get("window");

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      ToastAndroid.show(
        "Please fill in all fields",
        ToastAndroid.SHORT
      );
      return;
    }

    if (password !== confirmPassword) {
      ToastAndroid.show(
        "Passwords do not match",
        ToastAndroid.SHORT
      );
      return;
    }

    ToastAndroid.show(
      `Account created for ${username}`,
      ToastAndroid.SHORT
    );

    router.push("/login");
  };

  return (
    <View style={{ flex: 1 }}>
      {/* BACKGROUND */}
      <Image
        source={require("../assets/gifs/writing.gif")}
        style={regStyles.background}
        resizeMode="cover"
      />

      {/* OVERLAY */}
      <View style={regStyles.overlay} />

      {/* SVG PANEL */}
      <Svg
        height="100%"
        width="100%"
        style={regStyles.svg}
        pointerEvents="none"
      >
        <Polygon
          points={`0,0 ${width},0 ${width},${height * 0.4} 0,${height}`}
          fill="#EDEDED"
        />
      </Svg>

      <SafeAreaView style={regStyles.safeArea}>
        {/* Back Button */}
        <TouchableOpacity
          style={regStyles.topLeftButton}
          onPress={() => router.push("/")}
        >
          <Image
            source={require("../assets/icons/ic_left_arrow.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>

        {/* Header */}
        <View style={regStyles.regHeader}>
          <Text style={regStyles.titleText}>Start studying with</Text>
          <Text style={regStyles.titleText}>Tobeton</Text>
        </View>

        {/* Inputs */}
        <View style={regStyles.inputContainer}>
          <TextInput
            style={regStyles.inputText}
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
            placeholderTextColor="rgba(120,120,120,0.4)"
          />

          <TextInput
            style={regStyles.inputText}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="rgba(120,120,120,0.4)"
          />

          <TextInput
            style={regStyles.inputText}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry
            placeholder="Confirm Password"
            placeholderTextColor="rgba(120,120,120,0.4)"
          />
        </View>

        {/* Button */}
        <View style={regStyles.buttonContainer}>
          <TouchableOpacity
            style={regStyles.regButton}
            onPress={handleRegister}
          >
            <Text style={regStyles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}