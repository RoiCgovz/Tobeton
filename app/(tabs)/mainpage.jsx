import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Svg, { Polygon, Line, Circle, Text as SvgText } from "react-native-svg";
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { mainPageStyles } from "../../styles/mainpagestyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import statisticsService from "../../services/statisticsService";
import folderService from "../../services/folderService";

const PROFILE_KEY = "@profile_pic";

const { width, height } = Dimensions.get("window");

export default function MainPage() {
  const [username, setUsername] = useState("User");
  const [stats, setStats] = useState(null);
  const [totalFolders, setTotalFolders] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const [profilePic, setProfilePic] = useState(null);

 useFocusEffect(
  useCallback(() => {
    loadData();
    loadProfilePic();
  }, [])
);
  const loadProfilePic = async () => {
    try {
      const saved = await AsyncStorage.getItem(PROFILE_KEY);
      if (saved) setProfilePic(saved);
    } catch (e) {}
  };

  const loadData = async () => {
    setLoading(true);

    try {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    } catch (error) {}

    const statsResult = await statisticsService.getStatistics();
    if (statsResult.success) {
      setStats(statsResult.data);
    }

    const foldersResult = await folderService.getFolders();
    if (foldersResult.success) {
      setTotalFolders(foldersResult.data.length);
      const totalCardCount = foldersResult.data.reduce(
        (sum, folder) => sum + (folder.card_quantity || 0),
        0
      );
      setTotalCards(totalCardCount);
    }

    const weeklyResult = await statisticsService.getWeeklyStats();
    if (weeklyResult.success) {
      setWeeklyStats(weeklyResult.data);
    }

    setLoading(false);
  };

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const icons = [
    {
      icon: require("../../assets/icons/icons8-trophy-100.png"),
      action: () => router.push("/profile/achievement"),
      label: "Achievements"
    },
    {
      icon: require("../../assets/icons/icons8-folder-100.png"),
      action: () => router.push("/folders"),
      label: "Folders"
    },
  ];

  const getTotalStudyTime = () => {
    const flashcardTime = stats?.total_flashcard_study_seconds || 0;
    const quizTime = (stats?.total_quizzes_taken || 0) * 30;
    const totalSeconds = flashcardTime + quizTime;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m`;
    return `${totalSeconds}s`;
  };

  const getAverageScore = () => {
    return stats?.average_score_percent?.toFixed(0) || 0;
  };

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push({
        label: date.toLocaleDateString("en-US", { weekday: "short" }),
        fullDate: date.toISOString().split("T")[0],
        day: date.getDate(),
      });
    }
    return days;
  };

  const getStudyHoursForDay = (dateStr) => {
    const dayStat = weeklyStats.find(s => s.date === dateStr);
    if (dayStat) {
      const totalSeconds = (dayStat.flashcard_seconds || 0) + (dayStat.quiz_seconds || 0);
      return totalSeconds / 3600;
    }
    return 0;
  };

  const last7Days = getLast7Days();
  const studyHours = last7Days.map(day => getStudyHoursForDay(day.fullDate));
  const maxHours = Math.max(...studyHours, 1);

  const graphWidth = width - 80;
  const graphHeight = 150;
  const paddingLeft = 21;
  const paddingRight = 20;
  const paddingBottom = 25;

  const getPoints = () => {
    const stepX = (graphWidth - paddingLeft - paddingRight) / (studyHours.length - 1);
    return studyHours.map((hours, index) => ({
      x: paddingLeft + index * stepX,
      y: graphHeight - paddingBottom - ((hours / maxHours) * (graphHeight - paddingBottom - 20)),
    }));
  };

  const points = getPoints();

  if (!fontsLoaded) return null;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#EEE" }}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={{ marginTop: 10, fontFamily: "Inter_400Regular" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="light" />

      <Image
        source={require("../../assets/gifs/writing.gif")}
        style={mainPageStyles.background}
        resizeMode="cover"
      />

      <View style={mainPageStyles.overlay} />

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

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={mainPageStyles.scrollContainer}>

          {/* HEADER */}
          <View style={mainPageStyles.profileContainer}>
            <View style={mainPageStyles.leftSection}>
              <TouchableOpacity onPress={() => router.push("/profile")}>
                <Image
                  source={
                    profilePic
                      ? { uri: profilePic }
                      : require("../../assets/icons/profilepic.png")
                  }
                  style={mainPageStyles.profileImage}
                />
              </TouchableOpacity>

              <View style={mainPageStyles.textContainer}>
                <Text style={mainPageStyles.greeting}>Greetings Comrade,</Text>
                <Text style={mainPageStyles.name}>{username}</Text>
              </View>
            </View>
          </View>

          {/* MAIN ROW */}
          <View style={mainPageStyles.mainRow}>
            <View style={mainPageStyles.iconColumn}>
              {icons.map((item, index) => (
                <TouchableOpacity key={index} style={mainPageStyles.iconBox} onPress={item.action}>
                  <Image source={item.icon} style={mainPageStyles.iconImage} />
                </TouchableOpacity>
              ))}
            </View>

            <View style={mainPageStyles.rightContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={mainPageStyles.subjectScroll}>
                <View style={mainPageStyles.subjectCard}>
                  <Text style={mainPageStyles.subjectTitle}>Quick Stats</Text>
                  <View style={mainPageStyles.subjectStatsContainer}>
                    <Text style={mainPageStyles.subjectStat}>Quizzes: {stats?.total_quizzes_taken || 0}</Text>
                    <Text style={mainPageStyles.subjectStat}>Streak: {stats?.streak || 0} days</Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>

          {/* STATS SUMMARY */}
          <View style={mainPageStyles.statsSummary}>
            <View style={mainPageStyles.statCard}>
              <Text style={mainPageStyles.statValue}>{totalFolders}</Text>
              <Text style={mainPageStyles.statLabel}>Folders</Text>
            </View>
            <View style={mainPageStyles.statCard}>
              <Text style={mainPageStyles.statValue}>{totalCards}</Text>
              <Text style={mainPageStyles.statLabel}>Cards</Text>
            </View>
            <View style={mainPageStyles.statCard}>
              <Text style={mainPageStyles.statValue}>{getAverageScore()}%</Text>
              <Text style={mainPageStyles.statLabel}>Avg Score</Text>
            </View>
            <View style={mainPageStyles.statCard}>
              <Text style={mainPageStyles.statValue}>{getTotalStudyTime()}</Text>
              <Text style={mainPageStyles.statLabel}>Study Time</Text>
            </View>
          </View>

          {/* GRAPH */}
          <View style={mainPageStyles.graphContainer}>
            <Text style={mainPageStyles.graphTitle}>Daily Study Hours</Text>

            <View style={mainPageStyles.graphCard}>
              <Svg width={graphWidth} height={graphHeight}>

                <Line x1={paddingLeft - 5} y1={10} x2={paddingLeft - 5} y2={graphHeight - paddingBottom + 5} stroke="#666" strokeWidth={1} />
                <Line x1={paddingLeft - 5} y1={graphHeight - paddingBottom + 5} x2={graphWidth} y2={graphHeight - paddingBottom + 5} stroke="#666" strokeWidth={1} />

                <Polygon
                  points={points.map(p => `${p.x},${p.y}`).join(" ")}
                  fill="none"
                  stroke="#333"
                  strokeWidth={2.5}
                />

                <Polygon
                  points={[
                    `${points[0]?.x || paddingLeft},${graphHeight - paddingBottom + 5}`,
                    ...points.map(p => `${p.x},${p.y}`),
                    `${points[points.length - 1]?.x || graphWidth},${graphHeight - paddingBottom + 5}`
                  ].join(" ")}
                  fill="#333"
                  fillOpacity={0.1}
                />

                {points.map((point, index) => (
                  <React.Fragment key={index}>
                    <Circle cx={point.x} cy={point.y} r={4} fill="#333" />
                    <SvgText
                      x={point.x}
                      y={graphHeight - paddingBottom + 18}
                      fontSize="10"
                      fill="#666"
                      textAnchor="middle"
                    >
                      {last7Days[index].label}
                    </SvgText>
                  </React.Fragment>
                ))}
              </Svg>
            </View>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}