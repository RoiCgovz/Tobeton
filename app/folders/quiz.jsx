import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { quizstyles } from "../../styles/quizStyels";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import quizService from "../../services/quizService";

const { width, height } = Dimensions.get("window");

export default function QuizPage() {
    const { folderId, folderName } = useLocalSearchParams();

    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [score, setScore] = useState(0);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [canAnswer, setCanAnswer] = useState(true);
    const [currentQuizId, setCurrentQuizId] = useState(null);


    // Load quiz when page opens
    useEffect(() => {
        loadQuiz();
    }, [folderId]);

    const loadQuiz = async () => {
        if (!folderId) {
            ToastAndroid.show("Folder ID not found", ToastAndroid.SHORT);
            router.back();
            return;
        }

        setLoading(true);
        setCanAnswer(true);
        setSelectedAnswer(null);
        setShowResult(false);

        const result = await quizService.createQuiz(folderId);

        if (result.success) {
            setQuiz(result.data);
            setCurrentQuizId(result.data.id);
        } else {
            ToastAndroid.show(result.error || "Failed to load quiz", ToastAndroid.LONG);
            router.back();
        }

        setLoading(false);
    };

    const handleAnswer = async (answer) => {
        if (submitting || !canAnswer) return;

        setSelectedAnswer(answer);
        setSubmitting(true);
        setCanAnswer(false);

        const result = await quizService.submitQuizAnswer(quiz.id, answer);

        if (result.success) {
            const correct = result.data.is_correct === 1;
            setIsCorrect(correct);
            setShowResult(true);
            setQuestionsAnswered(prev => prev + 1);

            if (correct) {
                setScore(prev => prev + 1);
                ToastAndroid.show("Correct! 🎉", ToastAndroid.SHORT);
            } else {
                ToastAndroid.show(`Incorrect! Correct: ${quiz?.correct_answer}`, ToastAndroid.LONG);
            }
        } else {
            ToastAndroid.show(result.error || "Failed to submit answer", ToastAndroid.LONG);
            setCanAnswer(true);
        }

        setSubmitting(false);
    };

    const nextQuestion = () => {
        loadQuiz();
    };

    const exitQuiz = async () => {
        if (currentQuizId && !showResult) {
            await quizService.deleteQuiz(currentQuizId);
        }

        if (questionsAnswered > 0) {
            const finalScore = Math.round((score / questionsAnswered) * 100);
            ToastAndroid.show(`Quiz completed! Score: ${finalScore}%`, ToastAndroid.LONG);
        }
        router.back();
    };

    if (loading) {
        return (
            <SafeAreaView style={quizstyles.container}>
                <View style={quizstyles.loadingContainer}>
                    <ActivityIndicator size="large" color="#6C63FF" />
                    <Text style={quizstyles.loadingText}>Loading quiz...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!quiz) {
        return (
            <SafeAreaView style={quizstyles.container}>
                <View style={quizstyles.emptyContainer}>
                    <MaterialCommunityIcons name="file-question-outline" size={80} color="#ccc" />
                    <Text style={quizstyles.emptyText}>No quiz available</Text>
                    <Text style={quizstyles.emptySubText}>Need at least 3 cards in this folder</Text>
                    <TouchableOpacity style={quizstyles.backButton} onPress={exitQuiz}>
                        <Text style={quizstyles.backButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={quizstyles.container}>
            {/* HEADER */}
            <View style={quizstyles.header}>
                <TouchableOpacity onPress={exitQuiz}>
                    <Ionicons name="chevron-back" size={28} color="black" />
                </TouchableOpacity>
                <Text style={quizstyles.title}>
                    {folderName ? String(folderName) : "Quiz"}
                </Text>
                <View style={{ width: 30 }} />
            </View>

            {/* Score Display */}
            {questionsAnswered > 0 && (
                <View style={quizstyles.scoreContainer}>
                    <Text style={quizstyles.scoreText}>
                        Score: {score}/{questionsAnswered} ({Math.round((score / questionsAnswered) * 100)}%)
                    </Text>
                </View>
            )}

            {/* QUESTION CARD with Status Indicator at Top Middle */}
            <View style={quizstyles.card}>
                {/* Small Status Indicator at Top Middle */}
                {showResult && (
                    <View style={[
                        quizstyles.statusIndicator,
                        isCorrect ? quizstyles.statusCorrect : quizstyles.statusIncorrect
                    ]}>
                        <Text style={quizstyles.statusText}>
                            {isCorrect ? "✓ CORRECT" : "✗ WRONG"}
                        </Text>
                    </View>
                )}

                <Text style={quizstyles.questionText}>
                    {quiz?.question || "Loading..."}
                </Text>

                {/* Show correct answer below question if wrong */}
                {showResult && !isCorrect && (
                    <Text style={quizstyles.correctAnswerBelow}>
                        Answer: {quiz?.correct_answer}
                    </Text>
                )}
            </View>

            {/* OPTIONS - Show Next button after answering */}
            {!showResult ? (
                <>
                    <View style={quizstyles.optionsRow}>
                        <TouchableOpacity
                            style={[
                                quizstyles.optionLeft,
                                selectedAnswer === quiz?.choice_a && quizstyles.selectedOption
                            ]}
                            onPress={() => handleAnswer(quiz?.choice_a)}
                            disabled={submitting || !canAnswer}
                        >
                            <Text style={quizstyles.optionText}>{quiz?.choice_a}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                quizstyles.optionRight,
                                selectedAnswer === quiz?.choice_b && quizstyles.selectedOption
                            ]}
                            onPress={() => handleAnswer(quiz?.choice_b)}
                            disabled={submitting || !canAnswer}
                        >
                            <Text style={quizstyles.optionText}>{quiz?.choice_b}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={[
                            quizstyles.optionBottom,
                            selectedAnswer === quiz?.choice_c && quizstyles.selectedOption
                        ]}
                        onPress={() => handleAnswer(quiz?.choice_c)}
                        disabled={submitting || !canAnswer}
                    >
                        <Text style={quizstyles.optionText}>{quiz?.choice_c}</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <TouchableOpacity style={quizstyles.nextButton} onPress={nextQuestion}>
                    <Text style={quizstyles.nextButtonText}>Next Question</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
}