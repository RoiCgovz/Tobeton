import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ToastAndroid } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { styles } from "../styles/styles";
import { loginStyles } from "../styles/loginstyles";
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold,} from "@expo-google-fonts/inter";
import { Image } from "react-native";
import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null; 
  }
  
  const handleLogin = () =>{
    if (username === "" || password === "") {
      ToastAndroid.show("Username and password empty, Please enter username and password", ToastAndroid.SHORT)
      return;
    }
    if (username === "admin123" && password === "123"){
      router.push("/mainpage")
      ToastAndroid.show(`Login Successful! Welcome ${username}`, ToastAndroid.SHORT);
    }

  }

  return (
    <LinearGradient
      colors={["#FFFFFF", "#7FAFD4"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }} >

      <SafeAreaView style={styles.safeArea}>

        {/* Back Btn  */}
        <TouchableOpacity style={loginStyles.topLeftButton} onPress={() => router.push("/")}>
           <Image
            source={require("../assets/icons/ic_left_arrow.png")}
            style={{ marginTop: 15, width: 30, height: 30 }}
            />
        </TouchableOpacity>

        {/* Header/Title Text */}
        <View style={loginStyles.loginHeader}>
          <View>
            <Text style={loginStyles.titleText}>Welcome</Text>
            <Text style={loginStyles.backText}>             Back!</Text>
          </View>
        </View>

        {/* Input Boxes */}
        <View style={loginStyles.inputContainer}>
           <View>
            <TextInput
                style = {loginStyles.inputText}
                onChangeText={setUsername}
                placeholder="Enter Username: "
                value={username}
                placeholderTextColor="rgba(120,120,120,0.4)"
            />
           </View>
           <View>
            <TextInput
                style = {loginStyles.inputText}
                onChangeText={setPassword}
                secureTextEntry={true}
                value={password} 
                placeholder="Enter Password: "
                placeholderTextColor="rgba(120,120,120,0.4)"
            />
           </View>
        </View>

        {/* Login btn */}
        <View style={loginStyles.buttonContainer}>
          <TouchableOpacity 
            style={loginStyles.loginButton}
            onPress={handleLogin}
          >
            <Text style={loginStyles.buttonText}>
             Login
            </Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}