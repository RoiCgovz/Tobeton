import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Svg, { Polygon } from "react-native-svg";
import { useFonts } from "expo-font";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { mainPageStyles } from "../../styles/mainpagestyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import statisticsService from "../../services/statisticsService";
import folderService from "../../services/folderService";

const { width, height } = Dimensions.get("window");

export default function MainPage() {
  const [username, setUsername] = useState("User");
  const [stats, setStats] = useState(null);
  const [totalFolders, setTotalFolders] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    
    // Load username
    try {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    } catch (error) {
      console.log("Error loading username:", error);
    }

    // Load statistics
    const statsResult = await statisticsService.getStatistics();
    if (statsResult.success) {
      setStats(statsResult.data);
    }

    // Load folders and cards count
    const foldersResult = await folderService.getFolders();
    if (foldersResult.success) {
      setTotalFolders(foldersResult.data.length);
      const totalCardCount = foldersResult.data.reduce((sum, folder) => sum + (folder.card_quantity || 0), 0);
      setTotalCards(totalCardCount);
    }

    // Load weekly stats (last 7 days)
    const weeklyResult = await statisticsService.getWeeklyStats?.() || { success: false };
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
      icon: require("../../assets/icons/icons8-tetris-100.png"),
      action: () => router.push("/folders"),
      label: "Folders"
    },
    {
      icon: require("../../assets/icons/icons8-medal-100.png"),
      action: () => router.push("/profile/stats"),
      label: "Stats"
    },
  ];

  // Calculate total study time
  const getTotalStudyTime = () => {
    const flashcardTime = stats?.total_flashcard_study_seconds || 0;
    const quizTime = (stats?.total_quizzes_taken || 0) * 30;
    const totalSeconds = flashcardTime + quizTime;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    } else {
      return `${totalSeconds}s`;
    }
  };

  // Get average score
  const getAverageScore = () => {
    return stats?.average_score_percent?.toFixed(0) || 0;
  };

  // Get bar height based on study minutes (max 200px)
  const getBarHeight = (minutes) => {
    const maxHeight = height * 0.16;
    const maxMinutes = 120; // 2 hours max
    const calculatedHeight = (minutes / maxMinutes) * maxHeight;
    return Math.min(calculatedHeight, maxHeight);
  };

  // Generate last 7 days labels
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push({
        label: date.toLocaleDateString('en-US', { weekday: 'short' }),
        fullDate: date.toISOString().split('T')[0]
      });
    }
    return days;
  };

  // Get study minutes for a specific day
  const getStudyMinutesForDay = (dateStr) => {
    const dayStat = weeklyStats.find(s => s.date === dateStr);
    if (dayStat) {
      const flashcardMinutes = (dayStat.flashcard_study_seconds || 0) / 60;
      const quizMinutes = (dayStat.quizzes_taken || 0) * 0.5; // 30 seconds per quiz
      return Math.floor(flashcardMinutes + quizMinutes);
    }
    return 0;
  };

  if (!fontsLoaded) return null;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEE' }}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={{ marginTop: 10, fontFamily: 'Inter_400Regular' }}>Loading...</Text>
      </View>
    );
  }

  const last7Days = getLast7Days();

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
              <TouchableOpacity onPress={() => router.push("/profile")}>
                <Image
                  source={require("../../assets/icons/profilepic.png")}
                  style={mainPageStyles.profileImage}
                />
              </TouchableOpacity>

              <View style={mainPageStyles.textContainer}>
                <Text style={mainPageStyles.greeting}>
                  Greetings Comrade,
                </Text>
                <Text style={mainPageStyles.name}>{username}</Text>
              </View>
            </View>

            <TouchableOpacity>
              <Image
                source={require("../../assets/icons/moon.png")}
                style={mainPageStyles.moonimage}
              />
            </TouchableOpacity>
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
                  <Image source={item.icon} style={mainPageStyles.iconImage} />
                </TouchableOpacity>
              ))}
            </View>

            {/* Quick Stats / Top Folder */}
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
                    Quick Stats
                  </Text>
                  <View style={mainPageStyles.subjectStatsContainer}>
                    <Text style={mainPageStyles.subjectStat}>
                      Quizzes: {stats?.total_quizzes_taken || 0}
                    </Text>
                    <Text style={mainPageStyles.subjectStat}>
                      Streak: 🔥 {stats?.streak || 0} days
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>

          {/* GRAPH - Daily Study Hours */}
          <View style={mainPageStyles.graphContainer}>
            <Text style={mainPageStyles.graphTitle}>
              Daily Study Activity
            </Text>

            <View style={mainPageStyles.graphCard}>
              <View style={mainPageStyles.barRow}>
                {last7Days.map((day, index) => (
                  <View key={index} style={mainPageStyles.barContainer}>
                    <View
                      style={[
                        mainPageStyles.bar,
                        { height: getBarHeight(getStudyMinutesForDay(day.fullDate)) }
                      ]}
                    />
                    <Text style={mainPageStyles.barLabel}>
                      {day.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}