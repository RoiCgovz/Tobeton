import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { quizstyles } from "../../styles/quizStyels";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import quizService from "../../services/quizService";
import statisticsService from "../../services/statisticsService";

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
    const [quizFinished, setQuizFinished] = useState(false);
    const [quizTime, setQuizTime] = useState(0);
    const [isTakingQuiz, setIsTakingQuiz] = useState(false);
    const quizTimeRef = useRef(0);
    const savedQuizTimeRef = useRef(false);

    useEffect(() => {
        loadQuiz();
    }, [folderId]);

    useEffect(() => {
        if (quiz && !showResult && !quizFinished) {
            setIsTakingQuiz(true);
            setQuizTime(0);
            quizTimeRef.current = 0;
            savedQuizTimeRef.current = false;
        } else {
            setIsTakingQuiz(false);
        }
    }, [quiz, showResult, quizFinished]);

    useEffect(() => {
        let interval;
        if (isTakingQuiz && quiz && !showResult && !quizFinished) {
            interval = setInterval(() => {
                setQuizTime(prev => {
                    const newTime = prev + 1;
                    quizTimeRef.current = newTime;
                    return newTime;
                });
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isTakingQuiz, quiz, showResult, quizFinished]);

    useEffect(() => {
        return () => {
            saveQuizTime();
        };
    }, []);

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

        if (result?.error === "NO_MORE_CARDS") {
            setQuiz(null);
            setQuizFinished(true);

            await saveQuizTime();

            if (questionsAnswered > 0) {
                const finalScore = Math.round((score / questionsAnswered) * 100);
                ToastAndroid.show(
                    `Quiz Finished! Score: ${finalScore}%`,
                    ToastAndroid.LONG
                );
            } else {
                ToastAndroid.show("No more questions available", ToastAndroid.SHORT);
            }

            setLoading(false);
            return;
        }

        // normal success path
        if (result?.success !== false && result?.data) {
            setQuiz(result.data);
            setCurrentQuizId(result.data.id);
        } else {
            // fallback safety
            setQuizFinished(true);
            setQuiz(null);
        }

        setLoading(false);
    };

    const saveQuizTime = async () => {
        const finalTime = quizTimeRef.current;
        if (finalTime > 0 && !savedQuizTimeRef.current) {
            await statisticsService.updateQuizStudyTime(finalTime);
            savedQuizTimeRef.current = true;
        }
    };

    const handleAnswer = async (answer) => {
        if (submitting || !canAnswer || quizFinished) return;

        await saveQuizTime();

        setSelectedAnswer(answer);
        setSubmitting(true);
        setCanAnswer(false);

        const result = await quizService.submitQuizAnswer(quiz.id, answer);

        if (result.success) {
            const correct = result.data.is_correct === 1;
            setIsCorrect(correct);
            setShowResult(true);
            setQuestionsAnswered(prev => prev + 1);

            await statisticsService.updateQuizStatistics({ is_correct: correct });

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
        if (quizFinished) return;
        loadQuiz();
    };

    const exitQuiz = async () => {
        await saveQuizTime();

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

    if (quizFinished) {
        return (
            <SafeAreaView style={quizstyles.container}>
                <View style={quizstyles.emptyContainer}>
                    <MaterialCommunityIcons name="check-circle-outline" size={80} color="#000" />
                    <Text style={quizstyles.doneQuiz}>Quiz Completed 🎉</Text>

                    {questionsAnswered > 0 && (
                        <Text style={quizstyles.percentScore}>
                            Final Score: {score}/{questionsAnswered} (
                            {Math.round((score / questionsAnswered) * 100)}%)
                        </Text>
                    )}

                    <TouchableOpacity style={quizstyles.backButton} onPress={exitQuiz}>
                        <Text style={quizstyles.backButtonText}>Exit</Text>
                    </TouchableOpacity>
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
                    <TouchableOpacity style={quizstyles.backButton} onPress={exitQuiz}>
                        <Text style={quizstyles.backButtonText}>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={quizstyles.container}>
            <View style={quizstyles.header}>
                <TouchableOpacity onPress={exitQuiz}>
                    <Ionicons name="chevron-back" size={28} color="black" />
                </TouchableOpacity>
                <Text style={quizstyles.title}>
                    {folderName ? String(folderName) : "Quiz"}
                </Text>
                <View style={{ width: 30 }} />
            </View>

            {questionsAnswered > 0 && (
                <View style={quizstyles.scoreContainer}>
                    <Text style={quizstyles.scoreText}>
                        Score: {score}/{questionsAnswered} (
                        {Math.round((score / questionsAnswered) * 100)}%)
                    </Text>
                </View>
            )}

            <View style={quizstyles.card}>
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
                    {quiz?.question}
                </Text>

                {showResult && !isCorrect && (
                    <Text style={quizstyles.correctAnswerBelow}>
                        Answer: {quiz?.correct_answer}
                    </Text>
                )}
            </View>

            {!showResult ? (
                <>
                    <View style={quizstyles.optionsRow}>
                        <TouchableOpacity
                            style={quizstyles.optionLeft}
                            onPress={() => handleAnswer(quiz?.choice_a)}
                            disabled={submitting || !canAnswer}
                        >
                            <Text style={quizstyles.optionText}>{quiz?.choice_a}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={quizstyles.optionRight}
                            onPress={() => handleAnswer(quiz?.choice_b)}
                            disabled={submitting || !canAnswer}
                        >
                            <Text style={quizstyles.optionText}>{quiz?.choice_b}</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={quizstyles.optionBottom}
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