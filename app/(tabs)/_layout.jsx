import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle:{
            position: "absolute",
            margin: 40,
            width: "80%",
            backgroundColor: "#2e82db",
            height: 60,
            borderRadius: 30,
            borderTopWidth: 0,
            elevation: 10,
            shadowColor: "#000",
            shadowOpacity: 0.15,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 5 }
        },

        tabBarItemStyle:{
          justifyContent: "center",
          alignItems: "center",
          height: 60,
        },

        tabBarIconStyle:{
          width: 50,
          height: 50,
        },

        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#fff"
      }}
    >

      <Tabs.Screen
        name="mainpage"
        options={{
            tabBarButton: (props) => (
            <TouchableOpacity
                {...props}
                activeOpacity={0.6}
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
                <Ionicons name="home" size={30} color="white" />
            </TouchableOpacity>
            ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
            tabBarButton: (props) => (
            <TouchableOpacity
                {...props}
                activeOpacity={0.6}
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
                <Ionicons name="profile" size={40} color="white" />
            </TouchableOpacity>
            ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
            tabBarButton: (props) => (
            <TouchableOpacity
                {...props}
                activeOpacity={0.6}
                style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            >
                <Ionicons name="settings" size={40} color="white" />
            </TouchableOpacity>
            ),
        }}
      />

    </Tabs>
  );
}