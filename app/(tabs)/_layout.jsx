import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Dimensions } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          position: "absolute",
          bottom: height * 0.07,
          left: "50%",                    
          transform: [{ translateX: (width * 0.8 ) / 2 }], 
          width: width * 0.8,
          backgroundColor: "#fff",
          height: height * 0.08,
          borderRadius: width * 0.15,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: height * 0.006 },
        },

        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          height: height * 0.08,
        },

        tabBarIconStyle: {
          width: width * 0.12,
          height: width * 0.12,
        },

        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#aaa",
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
                <Ionicons name="home" size={30} color="black" />
            </TouchableOpacity>
            ),
        }}
      />

       <Tabs.Screen
        name="folders"
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              activeOpacity={0.6}
              style={{ flex: 1, justifyContent: "center", alignItems: "center"}}
            >    
              <Ionicons name="folder-open-outline" size={40} color="black"/>
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
                <Ionicons name="person-circle-outline" size={40} color="black" />
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
                <Ionicons name="cog-outline" size={40} color="black" />
            </TouchableOpacity>
            ),
        }}
      />
    </Tabs>
  );
}