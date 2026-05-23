import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const tobetonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    backBtn: {
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 10,
        paddingTop: 30,
        paddingLeft: 5,
    },
    menu: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 50,
        gap: 25,

    },
    button: {
        width: "75%",
        backgroundColor: "#ffffffff",
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: "center",
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: "#000",
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },

    featurescontainer: { flex: 1, padding: 10 },
    message: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        maxWidth: "80%"
    },

    user: { alignSelf: "flex-end", backgroundColor: "#cfe9ff" },
    bot: { alignSelf: "flex-start", backgroundColor: "#e5e5e5" },

    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    sendBtn: {
        marginLeft: 10,
        backgroundColor: "black",
        padding: 10,
        borderRadius: 10
    },

    card: {
        padding: 15,
        backgroundColor: "#e5e5e5",
        marginVertical: 5,
        borderRadius: 10
    },

    bottom: { padding: 10, alignItems: "center" },
    btn: { backgroundColor: "black", padding: 10, marginTop: 10, borderRadius: 10 },
    saveBtn: { backgroundColor: "green", padding: 10, marginTop: 10, borderRadius: 10, paddingHorizontal: 30 },

});