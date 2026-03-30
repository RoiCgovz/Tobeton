import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const settingsPageStyles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        paddingHorizontal: width * 0.04,
    },

    title: {
        fontSize: width * 0.06,
        fontFamily: "Inter_700Bold",
        marginVertical: height * 0.02,
    },

    section: {
        fontSize: width * 0.035,
        fontFamily: "Inter_600SemiBold",
        marginTop: height * 0.025,
        marginBottom: height * 0.01,
        color: "#555",
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: width * 0.04,
        padding: width * 0.04,
        marginBottom: height * 0.015,

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
    },

    textContainer: {
        flex: 1,
        marginLeft: width * 0.03,
    },

    profileImage: {
        width: width * 0.14,
        height: width * 0.14,
        borderRadius: (width * 0.14) / 2,
    },

    name: {
        fontSize: width * 0.045,
        fontFamily: "Inter_600SemiBold",
    },

    subText: {
        fontSize: width * 0.03,
        color: "#888",
        fontFamily: "Inter_400Regular",
    },

    optionText: {
        flex: 1,
        marginLeft: width * 0.03,
        fontSize: width * 0.04,
        fontFamily: "Inter_400Regular",
    },

    fontIcon: {
        fontSize: width * 0.045,
        fontFamily: "Inter_600SemiBold",
        width: width * 0.06,
        textAlign: "center",
    },

});