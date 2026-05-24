import React, { useState, useEffect } from "react";
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
    console.log("🔵 loadData started");

    try {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
        console.log("🔵 Username loaded:", storedUsername);
      }
    } catch (error) {
      console.log("Error loading username:", error);
    }

    const statsResult = await statisticsService.getStatistics();
    console.log("🔵 Stats result success:", statsResult.success);
    if (statsResult.success) {
      console.log("🔵 Stats data:", statsResult.data);
      setStats(statsResult.data);
    }

    const foldersResult = await folderService.getFolders();
    console.log("🔵 Folders result success:", foldersResult.success);
    if (foldersResult.success) {
      console.log("🔵 Folders count:", foldersResult.data.length);
      setTotalFolders(foldersResult.data.length);
      const totalCardCount = foldersResult.data.reduce((sum, folder) => sum + (folder.card_quantity || 0), 0);
      setTotalCards(totalCardCount);
      console.log("🔵 Total cards:", totalCardCount);
    }

    const weeklyResult = await statisticsService.getWeeklyStats();
    console.log("🔵 Weekly result:", weeklyResult);
    console.log("🔵 Weekly success:", weeklyResult.success);
    if (weeklyResult.success) {
      console.log("🔵 Weekly data length:", weeklyResult.data?.length);
      console.log("🔵 Weekly data:", JSON.stringify(weeklyResult.data));
      setWeeklyStats(weeklyResult.data);
    } else {
      console.log("🔵 Weekly result error:", weeklyResult.error);
    }

    setLoading(false);
    console.log("🔵 loadData finished");
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

  const getAverageScore = () => {
    return stats?.average_score_percent?.toFixed(0) || 0;
  };

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push({
        label: date.toLocaleDateString('en-US', { weekday: 'short' }),
        fullDate: date.toISOString().split('T')[0],
        day: date.getDate()
      });
    }
    return days;
  };

  // ✅ FIXED: Use actual flashcard_seconds + quiz_seconds from daily_statistics
  const getStudyHoursForDay = (dateStr) => {
    const dayStat = weeklyStats.find(s => s.date === dateStr);
    if (dayStat) {
      const totalSeconds = (dayStat.flashcard_seconds || 0) + (dayStat.quiz_seconds || 0);
      return totalSeconds / 3600; // Convert to hours
    }
    return 0;
  };

  const last7Days = getLast7Days();
  const studyHours = last7Days.map(day => getStudyHoursForDay(day.fullDate));
  const maxHours = Math.max(...studyHours, 1);

  // Graph dimensions
  const graphWidth = width - 80;
  const graphHeight = 150;
  const paddingLeft = 21;
  const paddingRight = 20;
  const paddingBottom = 25;

  // Calculate points for line graph
  const getPoints = () => {
    const stepX = (graphWidth - paddingLeft - paddingRight) / (studyHours.length - 1);
    return studyHours.map((hours, index) => ({
      x: paddingLeft + (index * stepX),
      y: graphHeight - paddingBottom - ((hours / maxHours) * (graphHeight - paddingBottom - 20))
    }));
  };

  const points = getPoints();

  if (!fontsLoaded) return null;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EEE' }}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={{ marginTop: 10, fontFamily: 'Inter_400Regular' }}>Loading...</Text>
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
                <Text style={mainPageStyles.greeting}>Greetings Comrade,</Text>
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
                  <Text style={mainPageStyles.subjectTitle}>Quick Stats</Text>
                  <View style={mainPageStyles.subjectStatsContainer}>
                    <Text style={mainPageStyles.subjectStat}>Quizzes: {stats?.total_quizzes_taken || 0}</Text>
                    <Text style={mainPageStyles.subjectStat}>Streak: 🔥 {stats?.streak || 0} days</Text>
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

          {/* LINE GRAPH - Daily Study Hours */}
          <View style={mainPageStyles.graphContainer}>
            <Text style={mainPageStyles.graphTitle}>Daily Study Hours</Text>

            <View style={mainPageStyles.graphCard}>
              <Svg width={graphWidth} height={graphHeight}>
                {/* Y-axis */}
                <Line
                  x1={paddingLeft - 5}
                  y1={10}
                  x2={paddingLeft - 5}
                  y2={graphHeight - paddingBottom + 5}
                  stroke="#666"
                  strokeWidth={1}
                />

                {/* X-axis */}
                <Line
                  x1={paddingLeft - 5}
                  y1={graphHeight - paddingBottom + 5}
                  x2={graphWidth}
                  y2={graphHeight - paddingBottom + 5}
                  stroke="#666"
                  strokeWidth={1}
                />

                {/* Y-axis labels */}
                <SvgText
                  x={paddingLeft - 8}
                  y={10}
                  fontSize="10"
                  fill="#666"
                  textAnchor="end"
                >
                  {maxHours.toFixed(1)}h
                </SvgText>
                <SvgText
                  x={paddingLeft - 8}
                  y={(graphHeight - paddingBottom + 5 + 10) / 2}
                  fontSize="10"
                  fill="#666"
                  textAnchor="end"
                >
                  {(maxHours / 2).toFixed(1)}h
                </SvgText>
                <SvgText
                  x={paddingLeft - 8}
                  y={graphHeight - paddingBottom + 5}
                  fontSize="10"
                  fill="#666"
                  textAnchor="end"
                >
                  0h
                </SvgText>

                {/* Grid lines */}
                <Line
                  x1={paddingLeft - 2}
                  y1={10}
                  x2={graphWidth}
                  y2={10}
                  stroke="#DDD"
                  strokeWidth={0.5}
                  strokeDasharray="4,4"
                />
                <Line
                  x1={paddingLeft - 2}
                  y1={(graphHeight - paddingBottom + 5 + 10) / 2}
                  x2={graphWidth}
                  y2={(graphHeight - paddingBottom + 5 + 10) / 2}
                  stroke="#DDD"
                  strokeWidth={0.5}
                  strokeDasharray="4,4"
                />

                {/* Line connecting points */}
                <Polygon
                  points={points.map(p => `${p.x},${p.y}`).join(' ')}
                  fill="none"
                  stroke="#333"
                  strokeWidth={2.5}
                />

                {/* Area under line (optional) */}
                <Polygon
                  points={[
                    `${points[0]?.x || paddingLeft},${graphHeight - paddingBottom + 5}`,
                    ...points.map(p => `${p.x},${p.y}`),
                    `${points[points.length - 1]?.x || graphWidth},${graphHeight - paddingBottom + 5}`
                  ].join(' ')}
                  fill="#333"
                  fillOpacity={0.1}
                />

                {/* Points and X-axis labels */}
                {points.map((point, index) => (
                  <React.Fragment key={index}>
                    <Circle
                      cx={point.x}
                      cy={point.y}
                      r={4}
                      fill="#333"
                    />
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