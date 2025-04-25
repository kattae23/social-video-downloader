import { MaterialTopTabs } from "@/hooks/topTabs";
import { usePathname } from "expo-router";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

const Layout = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#4267B2", // Facebook blue
          width: "100%",
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarItemStyle: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          color: "#fff",
          textTransform: "none",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "#fff",
          height: 3,
        },
      }}
    >
      <MaterialTopTabs.Screen
        name="index"
        options={{
          title: "Facebook",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="logo-facebook"
              size={18}
              color="#fff"
              style={{ marginRight: 5 }}
            />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="youtube"
        options={{
          title: "YouTube",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="logo-youtube"
              size={18}
              color="#fff"
              style={{ marginRight: 5 }}
            />
          ),
        }}
      />
      <MaterialTopTabs.Screen
        name="instagram"
        options={{
          title: "Instagram",
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="logo-instagram"
              size={18}
              color="#fff"
              style={{ marginRight: 5 }}
            />
          ),
        }}
      />
    </MaterialTopTabs>
  );
};

export default Layout;
