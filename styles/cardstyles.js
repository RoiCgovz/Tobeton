import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const cardPageStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },


    contentContainer: {
        flex: 1,
        paddingHorizontal: 25,
        zIndex: 1, // Ensures text stays above the slant
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 30,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#000",
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 20,
        marginTop: 10,
    },
    learnRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 50,
        marginBottom: 40,
    },
    learnBox: {
        width: 100,
        height: 100,
        backgroundColor: "#FFF",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        // Elevation for Android
        elevation: 5,
    },
    cardIconStack: {
        justifyContent: "center",
        alignItems: "center",
    },
    cardIconNumber: {
        position: "absolute",
        fontSize: 14,
        fontWeight: "bold",
        top: 12,
    },
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FFF",
        paddingVertical: 25,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginBottom: 15,
        // Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardText: {
        fontSize: 16,
        fontWeight: "600",
    },
    clockOverlay: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    }

});