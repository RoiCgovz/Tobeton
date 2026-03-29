import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { styles } from "../styles/styles";
import { useFonts } from "expo-font";
import Svg, { Polygon } from "react-native-svg";
import {
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

const { width, height } = Dimensions.get("window");

export default function Home() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Background GIF */}
      <Image
        source={require("../assets/gifs/writing_background.gif")}
        resizeMode="cover"
        style={styles.backgroundGif}
      />

      <View style={styles.overlay} />

      <Svg height="100%" width="100%" style={styles.svg}>
        <Polygon
          points={`0,${height * 0.30} ${width},${height * 0.68} ${width},${height} 0,${height}`}
          fill="white"
        />
      </Svg>

      <StatusBar style="dark" />

      {/* Logo and Name */}
      <View style={styles.header}>
        <Image
          source={require("../assets/gifs/ic_assishelplogo.gif")}
          style={styles.logoImage}
        />
        <View>
          <Text style={styles.title}>TOBE</Text>
          <Text style={styles.title}>          TON</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.orContinueText}>or continue using</Text>

      {/* Social Buttons */}
      <View style={styles.socialRow}>
        <Image
          source={require("../assets/icons/appleLogo.png")}
          style={styles.socialIcon}
        />
        <Image
          source={require("../assets/icons/googleLogo.png")}
          style={styles.socialIcon}
        />
      </View>

      <Text style={styles.registerText}>
        Don't have an account yet?{" "}
        <Text style={{ color: "#007AFF" }}>Register here.</Text>
      </Text>
    </SafeAreaView>
  );
}