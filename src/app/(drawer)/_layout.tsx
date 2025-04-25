import React from "react";
import { Drawer } from "expo-router/drawer";
import { SafeAreaView, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const CustomDrawerContent = () => {
  return (
    <SafeAreaView className="flex-1 top-20 bg-white">
      <View className="flex flex-col items-center justify-center gap-4 p-4 mx-5">
        <View className="w-20 h-20 bg-blue-500 rounded-full items-center justify-center mb-2">
          <Ionicons name="cloud-download-outline" size={40} color="white" />
        </View>
        <Text className="text-2xl font-semibold">Social Downloader</Text>
        <Text className="text-xl text-zinc-500 font-light text-center">
          Descarga videos de tus redes sociales favoritas.
        </Text>
      </View>
      <View className="flex flex-col justify-center p-4 mx-5">
        <Text className="text-xl font-semibold">Versión</Text>
        <Text className="text-xl font-light text-zinc-500">1.0.0</Text>
        <Text className="text-xl font-semibold mt-5">Creador</Text>
        <Text className="text-xl font-light text-zinc-500">Kattae23</Text>
      </View>
      <View className="flex flex-col justify-center p-4 mx-5">
        <Text className="text-xl font-light text-zinc-500">
          Esta aplicación te permite descargar videos de Facebook, YouTube e
          Instagram directamente a tu dispositivo.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default function TabLayout() {
  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        drawerPosition: "right",
        drawerActiveBackgroundColor: "#4267B2", // Facebook blue
        headerBackgroundContainerStyle: { backgroundColor: "#4267B2" },
        drawerActiveTintColor: "#fff",
        drawerInactiveBackgroundColor: "#fff",
        drawerInactiveTintColor: "#fff",
        drawerItemStyle: {
          backgroundColor: "#fff",
        },
        headerTitle: "Video Downloader",
        headerTintColor: "#fff",
        headerStyle: {
          backgroundColor: "#4267B2",
        },
      }}
    >
      <Drawer.Screen
        name="(app)" // This is the name of the page and must match the url from root
        options={{
          drawerLabel: "Home",
          title: "Video Downloader",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color="#4267B2" />
          ),
        }}
      />
      <StatusBar style="light" />
    </Drawer>
  );
}
