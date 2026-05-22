import React, { useState, useEffect, useCallback } from "react";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming, runOnJS } from "react-native-reanimated";
import { View, Text, TouchableOpacity, StatusBar, Image, Dimensions, ActivityIndicator, ToastAndroid, Modal, TextInput, FlatList } from "react-native";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { flashcardsStyles } from "../../styles/flashcardsStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import flashcardService from "../../services/flashcardService";

const { width, height } = Dimensions.get("window");

// Card Flip function / animation
const FlipCard = ({ isFlipped, cardStyle, direction = "y", duration = 400, RegularContent, FlippedContent }) => {
  const isDirectionX = direction === "x";

  const frontStyle = useAnimatedStyle(() => {
    const spin = interpolate(isFlipped.value, [0, 1], [0, 180]);
    const rotate = withTiming(`${spin}deg`, { duration });
    return {
      transform: [{ perspective: 1000 }, isDirectionX ? { rotateX: rotate } : { rotateY: rotate }],
      backfaceVisibility: "hidden",
    };
  });

  const backStyle = useAnimatedStyle(() => {
    const spin = interpolate(isFlipped.value, [0, 1], [180, 360]);
    const rotate = withTiming(`${spin}deg`, { duration });
    return {
      transform: [{ perspective: 1000 }, isDirectionX ? { rotateX: rotate } : { rotateY: rotate }],
      backfaceVisibility: "hidden",
    };
  });

  return (
    <View>
      <Animated.View style={[flashcardsStyles.regularCardLayer, cardStyle, frontStyle]}>
        {RegularContent}
      </Animated.View>
      <Animated.View style={[flashcardsStyles.flippedCardLayer, cardStyle, backStyle]}>
        {FlippedContent}
      </Animated.View>
    </View>
  );
};

export default function FlashcardsPage() {
  const { folderId, folderName } = useLocalSearchParams();

  const [cards, setCards] = useState([]);
  const [originalCards, setOriginalCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [studyTime, setStudyTime] = useState(0);
  const [isStudying, setIsStudying] = useState(false);
  const [randomMode, setRandomMode] = useState(true); // Randomizer mode on/off
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Shared Values
  const isFlipped = useSharedValue(0);
  const translateX = useSharedValue(0);
  const panX = useSharedValue(0);

  // Load Fonts
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  // Load flashcards from backend
  const loadFlashcards = async () => {
    if (!folderId) {
      console.warn("No folderId provided");
      setLoading(false);
      return;
    }

    setLoading(true);

    // Load in order first
    const orderResult = await flashcardService.getFlashcardsByFolder(folderId);

    if (orderResult.success) {
      setOriginalCards(orderResult.data);

      // If random mode is on, shuffle
      if (randomMode) {
        const shuffled = [...orderResult.data];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setCards(shuffled);
      } else {
        setCards(orderResult.data);
      }

      setIndex(0);
      isFlipped.value = 0;
    } else {
      ToastAndroid.show(orderResult.error || "Failed to load flashcards", ToastAndroid.LONG);
    }

    setLoading(false);
  };

  // Toggle random mode
  const toggleRandomMode = async () => {
    const newMode = !randomMode;
    setRandomMode(newMode);

    if (newMode) {
      // Shuffle current cards
      const shuffled = [...cards];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setCards(shuffled);
      ToastAndroid.show("Random mode: ON - Cards shuffled", ToastAndroid.SHORT);
    } else {
      // Restore original order
      setCards([...originalCards]);
      ToastAndroid.show("Random mode: OFF - Cards in original order", ToastAndroid.SHORT);
    }
    setIndex(0);
    isFlipped.value = 0;
  };

  // Search flashcards
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      ToastAndroid.show("Enter a search term", ToastAndroid.SHORT);
      return;
    }

    const result = await flashcardService.searchFlashcards(searchQuery);
    if (result.success && result.data.length > 0) {
      setSearchResults(result.data);
    } else {
      ToastAndroid.show("No matching flashcards found", ToastAndroid.SHORT);
      setSearchResults([]);
    }
  };

  // Jump to a specific card from search
  const jumpToCard = (cardId) => {
    const cardIndex = cards.findIndex(card => card.id === cardId);
    if (cardIndex !== -1) {
      setIndex(cardIndex);
      isFlipped.value = 0;
      setSearchModalVisible(false);
      setSearchQuery("");
      ToastAndroid.show("Jumped to card", ToastAndroid.SHORT);
    } else {
      ToastAndroid.show("Card not in current list", ToastAndroid.SHORT);
    }
  };

  // Auto-refresh when screen focuses
  useFocusEffect(
    useCallback(() => {
      loadFlashcards();
      return () => {
        if (isStudying && studyTime > 0) {
          flashcardService.markFlashcardStudied(studyTime);
        }
      };
    }, [folderId, randomMode])
  );

  // Track study time
  useEffect(() => {
    let interval;
    if (isStudying && cards.length > 0) {
      interval = setInterval(() => {
        setStudyTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStudying, cards.length]);

  // Start study session
  useEffect(() => {
    if (cards.length > 0) {
      setIsStudying(true);
    }
    return () => {
      if (isStudying && studyTime > 0) {
        flashcardService.markFlashcardStudied(studyTime);
      }
    };
  }, [cards.length]);

  const currentCard = cards[index];

  const flipCard = () => {
    isFlipped.value = isFlipped.value ? 0 : 1;
  };

  const updateCard = (direction) => {
    setIndex((prev) => prev + direction);
    isFlipped.value = 0;
  };

  const nextCard = () => {
    if (index === cards.length - 1) {
      ToastAndroid.show("You've completed all flashcards!", ToastAndroid.SHORT);
      return;
    }

    translateX.value = withTiming(-width, { duration: 500 }, (finished) => {
      "worklet";
      if (!finished) return;
      runOnJS(updateCard)(1);
      translateX.value = width;
      translateX.value = withTiming(0, { duration: 500 });
    });
  };

  const prevCard = () => {
    if (index === 0) return;
    translateX.value = withTiming(width, { duration: 500 }, (finished) => {
      "worklet";
      if (!finished) return;
      runOnJS(updateCard)(-1);
      translateX.value = -width;
      translateX.value = withTiming(0, { duration: 500 });
    });
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      panX.value = e.translationX;
    })
    .onEnd((e) => {
      const threshold = 80;
      if (e.translationX < -threshold && index < cards.length - 1) {
        panX.value = withTiming(-width, { duration: 200 }, () => {
          runOnJS(updateCard)(1);
          panX.value = width;
          panX.value = withTiming(0);
        });
      } else if (e.translationX > threshold && index > 0) {
        panX.value = withTiming(width, { duration: 200 }, () => {
          runOnJS(updateCard)(-1);
          panX.value = -width;
          panX.value = withTiming(0);
        });
      } else {
        panX.value = withTiming(0);
      }
    });

  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value + panX.value }],
  }));

  // Format study time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={flashcardsStyles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={flashcardsStyles.contentContainer}>

        {/* Header */}
        <View style={flashcardsStyles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={28} color="black" />
          </TouchableOpacity>

          <Text style={flashcardsStyles.title}>
            {folderName ? String(folderName) : "Flashcards"}
          </Text>

          <View style={flashcardsStyles.headerIcons}>
            {/* Search Button */}
            <TouchableOpacity onPress={() => setSearchModalVisible(true)} style={{ marginRight: 15 }}>
              <Ionicons name="search-outline" size={28} color="black" />
            </TouchableOpacity>

            {/* Random Mode Toggle Button */}
            <TouchableOpacity onPress={toggleRandomMode}>
              <Ionicons
                name="shuffle-outline"
                size={28}
                color={randomMode ? "#6C63FF" : "black"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Random Mode Indicator */}
        <View style={flashcardsStyles.modeIndicator}>
          <Text style={flashcardsStyles.modeText}>
            {randomMode ? "Random Mode" : "Order Mode"}
          </Text>
        </View>

        {/* Study Timer */}
        {isStudying && cards.length > 0 && (
          <View style={flashcardsStyles.timerContainer}>
            <Ionicons name="timer-outline" size={20} color="#666" />
            <Text style={flashcardsStyles.timerText}>Study Time: {formatTime(studyTime)}</Text>
          </View>
        )}

        {/* Card */}
        <View style={flashcardsStyles.cardWrapper}>
          {loading ? (
            <View style={flashcardsStyles.loadingContainer}>
              <ActivityIndicator size="large" color="#6C63FF" />
              <Text style={flashcardsStyles.loadingText}>Loading flashcards...</Text>
            </View>
          ) : cards.length === 0 ? (
            <View style={flashcardsStyles.emptyContainer}>
              <Ionicons name="albums-outline" size={80} color="#ccc" />S
              <Text style={flashcardsStyles.emptyText}>No flashcards in this folder</Text>
              <Text style={flashcardsStyles.emptySubText}>Create cards to start studying!</Text>
            </View>
          ) : (
            <GestureDetector gesture={panGesture}>
              <TouchableOpacity activeOpacity={1} onPress={flipCard}>
                <Animated.View style={slideStyle}>
                  <FlipCard
                    isFlipped={isFlipped}
                    cardStyle={flashcardsStyles.card}
                    RegularContent={
                      <View style={flashcardsStyles.cardContent}>
                        <Text style={flashcardsStyles.cardLabel}>Question</Text>
                        <Text style={flashcardsStyles.cardText}>
                          {currentCard?.question || "No question"}
                        </Text>
                      </View>
                    }
                    FlippedContent={
                      <View style={flashcardsStyles.backCardFace}>
                        <Text style={flashcardsStyles.cardLabel}>Answer</Text>
                        <Text style={flashcardsStyles.cardText}>
                          {currentCard?.answer || "No answer"}
                        </Text>
                      </View>
                    }
                  />
                </Animated.View>
              </TouchableOpacity>
            </GestureDetector>
          )}

          {cards.length > 0 && (
            <>
              {/* CONTROLS */}
              <View style={flashcardsStyles.controls}>
                <TouchableOpacity onPress={prevCard} disabled={index === 0}>
                  <Ionicons name="chevron-back" size={40} color={index === 0 ? "#ccc" : "black"} />
                </TouchableOpacity>

                <TouchableOpacity onPress={flipCard} style={flashcardsStyles.flipButton}>
                  <Ionicons name="sync-outline" size={24} color="white" />
                  <Text style={flashcardsStyles.flipButtonText}>Flip</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={nextCard} disabled={index === cards.length - 1}>
                  <Ionicons name="chevron-forward" size={40} color={index === cards.length - 1 ? "#ccc" : "black"} />
                </TouchableOpacity>
              </View>

              {/* PROGRESS */}
              <View style={flashcardsStyles.progressContainer}>
                <View style={flashcardsStyles.progressBar}>
                  <View style={[flashcardsStyles.progressFill, { width: `${((index + 1) / cards.length) * 100}%` }]} />
                </View>
                <Text style={flashcardsStyles.progressText}>
                  {index + 1} / {cards.length} cards
                </Text>
              </View>
            </>
          )}
        </View>
      </View>

      {/* Search Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={searchModalVisible}
        onRequestClose={() => setSearchModalVisible(false)}
      >
        <View style={flashcardsStyles.modalOverlay}>
          <View style={flashcardsStyles.modalContent}>
            <View style={flashcardsStyles.modalHeader}>
              <Text style={flashcardsStyles.modalTitle}>Search Flashcards</Text>
              <TouchableOpacity onPress={() => setSearchModalVisible(false)}>
                <Ionicons name="close" size={28} color="black" />
              </TouchableOpacity>
            </View>

            <View style={flashcardsStyles.searchInputContainer}>
              <TextInput
                style={flashcardsStyles.searchInput}
                placeholder="Type question or answer..."
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
              />
              <TouchableOpacity style={flashcardsStyles.searchButton} onPress={handleSearch}>
                <Ionicons name="search" size={24} color="white" />
              </TouchableOpacity>
            </View>

            {searchResults.length > 0 && (
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id.toString()}
                style={flashcardsStyles.searchResults}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={flashcardsStyles.searchResultItem}
                    onPress={() => jumpToCard(item.id)}
                  >
                    <Text style={flashcardsStyles.searchResultQuestion} numberOfLines={2}>
                      {item.question}
                    </Text>
                    <Text style={flashcardsStyles.searchResultAnswer} numberOfLines={1}>
                      {item.answer}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}

            {searchResults.length === 0 && searchQuery && (
              <View style={flashcardsStyles.noResultsContainer}>
                <Text style={flashcardsStyles.noResultsText}>No flashcards found</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}