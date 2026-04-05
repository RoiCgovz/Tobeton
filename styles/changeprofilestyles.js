import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const changeProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    bannerContainer: {
        width: width,
        height: height * 0.25,
        backgroundColor: '#e0e0e0',
    },
    bannerPicture: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    profileIconContainer: {
        alignItems: 'center',
        marginTop: -50,
        marginBottom: 20,
    },
    profileCircleWrapper: {
        position: 'relative',
    },
    profileCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#e0e0e0',
        borderWidth: 3,
        borderColor: '#ffffff',
        overflow: 'hidden',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    formContainer: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 30,
    },
    sectionTitle: {
        color: '#000000',
        fontSize: 24,
        fontFamily: 'Inter_700Bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        color: '#333333',
        fontSize: 14,
        fontFamily: 'Inter_600SemiBold',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        color: '#000000',
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    // Password container styles
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    passwordInput: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        color: '#000000',
        fontSize: 16,
        fontFamily: 'Inter_400Regular',
    },
    eyeIcon: {
        padding: 12,
    },
    updateButton: {
        backgroundColor: '#000000',
        borderRadius: 25,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 20,
    },
    updateButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontFamily: 'Inter_600SemiBold',
    },
});