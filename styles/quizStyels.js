import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const quizstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    padding: width * 0.05,
  },

  back: {
    fontSize: width * 0.06,
    marginBottom: height * 0.01,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 40,
  },

  title: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },

  card: {
    height: height * 0.5,
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: height * 0.04,
    elevation: 4,
    position: "relative",
  },

  questionText: {
    fontSize: width * 0.045,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 20,
  },

  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.03,
    gap: 15,
  },

  optionLeft: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },

  optionRight: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },

  optionBottom: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },

  optionText: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    color: "#333",
    textAlign: "center",
  },

  selectedOption: {
    backgroundColor: "#6C63FF",
    borderColor: "#6C63FF",
  },

  nextText: {
    color: "#fff",
    fontWeight: "600",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    fontFamily: 'Inter_400Regular',
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 16,
  },

  emptyText: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#999',
  },

  emptySubText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#bbb',
    textAlign: 'center',
  },

  backButton: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },

  backButtonText: {
    color: 'white',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
  },

  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  resultCard: {
    width: '100%',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    gap: 16,
    marginBottom: 30,
  },

  correctResult: {
    backgroundColor: '#E8F5E9',
    borderWidth: 1,
    borderColor: '#4CAF50',
  },

  incorrectResult: {
    backgroundColor: '#FFEBEE',
    borderWidth: 1,
    borderColor: '#F44336',
  },

  resultText: {
    fontSize: 24,
    fontFamily: 'Inter_700Bold',
    color: '#333',
  },

  correctAnswerText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
    textAlign: 'center',
  },

  nextButton: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },

  nextButtonText: {
    color: 'white',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
  },

  scoreContainer: {
    backgroundColor: '#6C63FF',
    marginHorizontal: 20,
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
  },

  scoreText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
  },

  statusIndicator: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    zIndex: 10,
  },

  statusCorrect: {
    backgroundColor: '#4CAF50',
  },

  statusIncorrect: {
    backgroundColor: '#F44336',
  },

  statusText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Inter_700Bold',
  },

  correctAnswerBelow: {
    marginTop: 16,
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#F44336',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});