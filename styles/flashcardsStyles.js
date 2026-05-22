import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const flashcardsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
  },

  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 30,
  },

  xIcon: {
    width: width * 0.05,
    height: height * 0.05,
    marginTop: 5,
  },

  title: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
  },

  card: {
    width: "100%",
    height: height * 0.6,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  cardWrapper: {
    flex: 1,
    justifyContent: "center",
  },

  regularCardLayer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderWidth: 2,
    borderColor: "#000",
    zIndex: 1,
  },

  flippedCardLayer: {
    width: "100%",
    height: "100%",
    borderWidth: 2,
    borderColor: "#000",
    zIndex: 2,
  },

  cardText: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "Inter_600SemiBold",
    paddingHorizontal: 10,
  },

  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 40,
    paddingHorizontal: 40,
  },

  progressText: {
    textAlign: "center",
    marginTop: 0,
    fontSize: 16,
    fontFamily: "Inter_400Regular",
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 15,
    gap: 8,
  },

  timerText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#666',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
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
    height: 400,
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

  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  cardLabel: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#6C63FF',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  flipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6C63FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    gap: 8,
  },

  flipButtonText: {
    color: 'white',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },

  progressContainer: {
    marginTop: 20,
    alignItems: 'center',
    gap: 8,
  },

  progressBar: {
    width: width * 0.7,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#6C63FF',
    borderRadius: 3,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  modeIndicator: {
    alignItems: 'center',
    marginBottom: 5,
  },

  modeText: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
    color: '#6C63FF',
    backgroundColor: '#F0F0FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: height * 0.8,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: 'black',
  },

  searchInputContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },

  searchInput: {
    flex: 1,
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontFamily: 'Inter_400Regular',
    fontSize: 16,
  },

  searchButton: {
    backgroundColor: '#6C63FF',
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchResults: {
    maxHeight: height * 0.5,
  },

  searchResultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },

  searchResultQuestion: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: 'black',
    marginBottom: 5,
  },

  searchResultAnswer: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#666',
  },

  noResultsContainer: {
    padding: 40,
    alignItems: 'center',
  },

  noResultsText: {
    fontSize: 16,
    color: '#999',
    fontFamily: 'Inter_400Regular',
  },
  searchResultCount: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#666',
    marginBottom: 10,
    paddingHorizontal: 5,
  },

  noResultsSubText: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#bbb',
    marginTop: 8,
    textAlign: 'center',
  },
});