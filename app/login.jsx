import React, { useState } from "react";
import Svg, { Polygon } from "react-native-svg";
import { View,Text,TouchableOpacity,TextInput,ToastAndroid,Image,Dimensions} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useFonts } from "expo-font";
import { Inter_400Regular,Inter_600SemiBold,Inter_700Bold,} from "@expo-google-fonts/inter";
import { loginStyles } from "../styles/loginstyles";

const { width, height } = Dimensions.get("window");

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) return null;

  const handleLogin = () => {
    if (username === "" || password === "") {
      ToastAndroid.show(
        "Username and password empty, Please enter username and password",
        ToastAndroid.SHORT
      );
      return;
    }

    if (username === "admin123" && password === "123") {
      router.push("/mainpage");
      ToastAndroid.show(
        `Login Successful! Welcome ${username}`,
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* BACKGROUND */}
      <Image
        source={require("../assets/gifs/writing.gif")}
        style={loginStyles.background}
        resizeMode="cover"
      />

      {/* DARK OVERLAY */}
      <View style={loginStyles.overlay} />

      {/* SVG DIAGONAL WHITE PANEL */}
      <Svg
        height="100%"
        width="100%"
        style={loginStyles.svg}
        pointerEvents="none"
      >
        <Polygon
          points={`
            0,0 
            ${width},0 
            ${width},${height * 0.4} 
            0,${height}
          `}
          fill="#EDEDED"
        />
      </Svg>

      {/* CONTENT */}
      <SafeAreaView style={loginStyles.safeArea}>

        {/* Back Button */}
        <TouchableOpacity
          style={loginStyles.topLeftButton}
          onPress={() => router.push("/")}
        >
          <Image
            source={require("../assets/icons/ic_left_arrow.png")}
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>

        {/* Header */}
        <View style={loginStyles.loginHeader}>
          <Text style={loginStyles.titleText}>Welcome Back!</Text>
        </View>

        {/* Inputs */}
        <View style={loginStyles.inputContainer}>
          <TextInput
            style={loginStyles.inputText}
            onChangeText={setUsername}
            placeholder="Username"
            value={username}
            placeholderTextColor="rgba(120,120,120,0.4)"
          />

          <TextInput
            style={loginStyles.inputText}
            onChangeText={setPassword}
            secureTextEntry
            value={password}
            placeholder="Password"
            placeholderTextColor="rgba(120,120,120,0.4)"
          />
        </View>

        {/* Button */}
        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity
            style={loginStyles.loginButton}
            onPress={handleLogin}
          >
            <Text style={loginStyles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}