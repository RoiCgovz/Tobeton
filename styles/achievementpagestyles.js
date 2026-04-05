import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const achievementPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#F8F9FA',
        borderBottomWidth: 1,
        borderBottomColor: '#E4E6EB',
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: 'Inter_700Bold',
        color: '#1C1E21',
    },
    placeholderRight: {
        width: 40,
    },
    gridContainer: {
        padding: 20,
        paddingBottom: 32,
    },
    columnWrapper: {
        justifyContent: 'space-between',
    },
    card: {
        width: (width - 60) / 2,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#F0F2F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardName: {
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
        color: '#1C1E21',
        marginBottom: 4,
        textAlign: 'center',
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#F0F2F5',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        marginTop: 8,
    },
    progressText: {
        fontSize: 12,
        fontFamily: 'Inter_600SemiBold',
        color: '#65676B',
    },
});