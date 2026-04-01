import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Svg, { Polygon } from "react-native-svg";
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, } from "@expo-google-fonts/inter";
import { mainPageStyles } from "../../styles/mainpagestyles";

const { width, height } = Dimensions.get("window");

export default function MainPage() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const icons = [
  {
    icon: require("../../assets/icons/icons8-trophy-100.png"),
    action: () => console.log("Stats"),
  },
  {
    icon: require("../../assets/icons/icons8-tetris-100.png"),
    action: () => console.log("Subjects"),
  },
  {
    icon: require("../../assets/icons/icons8-medal-100.png"),
    action: () => console.log("Achievements"),
  },
];

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />

      {/* BACKGROUND */}
      <Image
        source={require("../../assets/gifs/writing.gif")}
        style={mainPageStyles.background}
        resizeMode="cover"
      />

      {/* OVERLAY */}
      <View style={mainPageStyles.overlay} />

      {/* DIAGONAL */}
      <Svg height="100%" width="100%" style={mainPageStyles.svg}>
        <Polygon
          points={`
            0,0 
            ${width},0 
            ${width},${height * 0.4} 
            ${-width * 0.3},${height} 
            0,${height}
          `}
          fill="#EEE"
        />
      </Svg>

      {/* MAIN */}
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={mainPageStyles.scrollContainer}
        >
          {/* HEADER */}
          <View style={mainPageStyles.profileContainer}>
            <View style={mainPageStyles.leftSection}>
              <TouchableOpacity>
                <Image
                  source={require("../../assets/icons/profilepic.png")}
                  style={mainPageStyles.profileImage}
                />
              </TouchableOpacity>

              <View style={mainPageStyles.textContainer}>
                <Text style={mainPageStyles.greeting}>
                  Greetings Comrade,
                </Text>
                <Text style={mainPageStyles.name}>admin123</Text>
              </View>
            </View>

            <TouchableOpacity>
              <Image
                source={require("../../assets/icons/moon.png")}
                style={mainPageStyles.moonimage}
              />
            </TouchableOpacity>
          </View>

          {/* MAIN ROW */}
          <View style={mainPageStyles.mainRow}>

            {/* Icon Column */}
            <View style={mainPageStyles.iconColumn}>
              {icons.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={mainPageStyles.iconBox}
                  onPress={item.action}
                >
                  <Image
                    source={item.icon}
                    style={mainPageStyles.iconImage}
                  />
                </TouchableOpacity>
              ))}
            </View>

            {/* Folder ScrollView */}
            <View style={mainPageStyles.rightContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={mainPageStyles.subjectScroll}
              >
                <View style={mainPageStyles.subjectCard}>
                  <Image
                    source={require("../../assets/gifs/sixseven(2).gif")}
                    style={mainPageStyles.subjectImage}  
                  />
                  <Text style={mainPageStyles.subjectTitle}>
                    SIX SEVEN
                  </Text>

                  <View style={mainPageStyles.subjectStatsContainer}>
                    <Text style={mainPageStyles.subjectStat}>
                      Cards: 67
                    </Text>
                    <Text style={mainPageStyles.subjectStat}>
                      Score: 67%
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>

          {/* GRAPH */}
          <View style={mainPageStyles.graphContainer}>
            <Text style={mainPageStyles.graphTitle}>
              Daily Study Hours
            </Text>

            <View style={mainPageStyles.graphCard}>
              <View style={mainPageStyles.barRow}>
                <View style={mainPageStyles.barContainer}>
                  <View
                    style={[
                      mainPageStyles.bar,
                      { height: height * 0.1 },
                    ]}
                  />
                  <Text style={mainPageStyles.barLabel}>
                    Sept 21
                  </Text>
                </View>

                <View style={mainPageStyles.barContainer}>
                  <View
                    style={[
                      mainPageStyles.bar,
                      { height: height * 0.16 },
                    ]}
                  />
                  <Text style={mainPageStyles.barLabel}>
                    Sept 22
                  </Text>
                </View>

                <View style={mainPageStyles.barContainer}>
                  <View
                    style={[
                      mainPageStyles.bar,
                      { height: height * 0.12 },
                    ]}
                  />
                  <Text style={mainPageStyles.barLabel}>
                    Sept 23
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}