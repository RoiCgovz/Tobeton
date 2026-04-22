import React, { useState } from "react";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming, runOnJS, } from "react-native-reanimated";
import { View, Text, TouchableOpacity, StatusBar, Image, Dimensions, } from "react-native";
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, } from "@expo-google-fonts/inter";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useLocalSearchParams, router } from "expo-router";
import { flashcardsStyles } from "../../styles/flashcardsStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const { width } = Dimensions.get("window");

// Card Flip function / animation
const FlipCard = ({ isFlipped, cardStyle, direction = "y", duration = 400, RegularContent, FlippedContent, }) => {
  const isDirectionX = direction === "x";

  // Front of card when flipped
  const frontStyle = useAnimatedStyle(() => {
    const spin = interpolate(isFlipped.value, [0, 1], [0, 180]);
    const rotate = withTiming(`${spin}deg`, { duration });

    return {
      transform: [
        { perspective: 1000 },
        isDirectionX ? { rotateX: rotate } : { rotateY: rotate },
      ],
      backfaceVisibility: "hidden",
    };
  });
  // Back of card when flipped
  const backStyle = useAnimatedStyle(() => {
    const spin = interpolate(isFlipped.value, [0, 1], [180, 360]);
    const rotate = withTiming(`${spin}deg`, { duration });

    return {
      transform: [
        { perspective: 1000 },
        isDirectionX ? { rotateX: rotate } : { rotateY: rotate },
      ],
      backfaceVisibility: "hidden",
    };
  });

  return (
    <View>
      {/* Front Card */}
      <Animated.View style={[flashcardsStyles.regularCardLayer, cardStyle, frontStyle,]}>
        {RegularContent}
      </Animated.View>

      {/* Back Card */}
      <Animated.View style={[flashcardsStyles.flippedCardLayer, cardStyle, backStyle,]}>
        {FlippedContent}
      </Animated.View>
    </View>
  );
};

export default function FlashcardsPage() {
  const { folderName } = useLocalSearchParams();

  // Hardcoded Card Contents to be replaced with the API DB later
  const cards = [
    { question: "What is Java?", answer: "A programming language" },
    { question: "What is OOP?", answer: "Object-Oriented Programming" },
    { question: "What is React?", answer: "A UI library" },
  ];

  // Tracking Card Number
  const [index, setIndex] = useState(0);
  const currentCard = cards[index];

  // Shared Values
  const isFlipped = useSharedValue(0);
  const translateX = useSharedValue(0);
  const panX = useSharedValue(0);

  // Flip Card Text
  const flipCard = () => {
    isFlipped.value = isFlipped.value ? 0 : 1;
  };

  // Update Card after moving
  const updateCard = (direction) => {
    setIndex((prev) => prev + direction);
    isFlipped.value = 0;
  };

  // Move to next card
  const nextCard = () => {
    if (index === cards.length - 1) return;

    translateX.value = withTiming(-width, { duration: 500 }, (finished) => {
      "worklet";
      if (!finished) return;

      runOnJS(updateCard)(1);

      translateX.value = width;

      translateX.value = withTiming(0, { duration: 500 });
    });
  };

  // Move to previous card
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

  // Slide gesture
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

  // Slide animation for moving cards
  const slideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value + panX.value }],
  }));

  // Load Fonts
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

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
            {folderName ? String(folderName): ""}
          </Text>

          <View style={{ width: 30 }} />
        </View>

        {/* Card */}
        <View style={flashcardsStyles.cardWrapper}>
          <GestureDetector gesture={panGesture}>
            <TouchableOpacity activeOpacity={1} onPress={flipCard}>
              <Animated.View style={slideStyle}>
                <FlipCard
                  isFlipped={isFlipped}
                  cardStyle={flashcardsStyles.card}
                  RegularContent={
                    <View>
                      <Text style={flashcardsStyles.cardText}>
                        {currentCard.question}
                      </Text>
                    </View>
                  }
                  FlippedContent={
                    <View style={flashcardsStyles.backCardFace}>
                      <Text style={flashcardsStyles.cardText}>
                        {currentCard.answer}
                      </Text>
                    </View>
                  }
                />
              </Animated.View>
            </TouchableOpacity>
          </GestureDetector>
          {/* CONTROLS */}
          <View style={flashcardsStyles.controls}>
            <TouchableOpacity onPress={prevCard}>
              <Ionicons name="chevron-back" size={40} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={nextCard}>
              <Ionicons name="chevron-forward" size={40} color="black" />
            </TouchableOpacity>
          </View>

          {/* PROGRESS */}
          <Text style={flashcardsStyles.progressText}>
            {index + 1} / {cards.length}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}