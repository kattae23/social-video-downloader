import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import {
  getFacebookVideoInfo,
  downloadVideo,
  shareVideo,
  VideoInfo,
  VideoQuality,
} from "@/utils/fbDownloader";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

interface VideoDownloaderProps {
  platform?: "facebook" | "youtube" | "instagram";
}

const VideoDownloader: React.FC<VideoDownloaderProps> = ({ platform = "facebook" }) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const getPlatformColor = () => {
    switch (platform) {
      case "facebook":
        return "#4267B2";
      case "youtube":
        return "#FF0000";
      case "instagram":
        return "#C13584";
      default:
        return "#4267B2";
    }
  };

  const getPlatformIcon = () => {
    switch (platform) {
      case "facebook":
        return "logo-facebook";
      case "youtube":
        return "logo-youtube";
      case "instagram":
        return "logo-instagram";
      default:
        return "logo-facebook";
    }
  };

  const getPlatformName = () => {
    switch (platform) {
      case "facebook":
        return "Facebook";
      case "youtube":
        return "YouTube";
      case "instagram":
        return "Instagram";
      default:
        return "Facebook";
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardContent = await Clipboard.getStringAsync();
      if (clipboardContent) {
        setUrl(clipboardContent);
      } else {
        Alert.alert("Error", "No hay texto en el portapapeles");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo pegar el enlace");
    }
  };

  const handleGetInfo = async () => {
    if (!url.trim()) {
      Alert.alert("Error", "Por favor ingresa un enlace de " + getPlatformName());
      return;
    }

    setLoading(true);
    setVideoInfo(null);

    try {
      const info = await getFacebookVideoInfo(url);
      setVideoInfo(info);
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.message || "No se pudo obtener información del video"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (quality: VideoQuality) => {
    if (!videoInfo) return;

    setDownloading(true);

    try {
      // Generate a filename based on the video title
      const filename = `${videoInfo.title
        .replace(/[^a-z0-9]/gi, "_")
        .toLowerCase()}_${quality.label}.mp4`;

      // Download the video
      const filePath = await downloadVideo(quality.url, filename);

      // Share the downloaded video
      await shareVideo(filePath);

      Alert.alert("Éxito", "¡Video descargado correctamente!");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Error al descargar el video");
    } finally {
      setDownloading(false);
    }
  };

  const platformColor = getPlatformColor();

  return (
    <View className="w-full bg-white rounded-xl p-5">
      <View className="flex-row items-center mb-4">
        <Ionicons name={getPlatformIcon()} size={24} color={platformColor} style={{ marginRight: 8 }} />
        <Text className="text-2xl font-semibold text-black">
          Descargador de {getPlatformName()}
        </Text>
      </View>

      <View className="flex-row mb-4">
        <View className="flex-1">
          <View className="flex-row border border-gray-300 rounded-l-lg p-2">
            <TextInput
              className="flex-1 text-base"
              placeholder={`Pegue el enlace del vídeo de ${getPlatformName()}...`}
              value={url}
              onChangeText={setUrl}
              autoCapitalize="none"
            />
          </View>
        </View>
        <TouchableOpacity
          className={`bg-[${platformColor}] rounded-r-lg justify-center items-center px-4`}
          style={{ backgroundColor: platformColor }}
          onPress={handlePaste}
        >
          <Text className="text-white font-medium">Pegar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className="rounded-lg py-3 items-center mb-4"
        style={{ backgroundColor: loading ? "#9CA3AF" : platformColor }}
        onPress={handleGetInfo}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <View className="flex-row items-center">
            <Ionicons name="download-outline" size={20} color="white" />
            <Text className="text-white font-medium ml-2">Descargar</Text>
          </View>
        )}
      </TouchableOpacity>

      {videoInfo && (
        <ScrollView className="mt-4">
          <View className="border border-gray-200 rounded-lg p-4">
            <Text className="text-lg font-medium mb-2">{videoInfo.title}</Text>

            {videoInfo.thumbnail && (
              <Image
                source={{ uri: videoInfo.thumbnail }}
                className="w-full h-48 rounded-lg mb-4"
                resizeMode="cover"
              />
            )}

            <Text className="font-medium mb-2">Seleccione la calidad:</Text>

            {videoInfo.qualities.map((quality, index) => (
              <TouchableOpacity
                key={index}
                className="bg-gray-100 rounded-lg p-3 mb-2 flex-row justify-between items-center"
                onPress={() => handleDownload(quality)}
                disabled={downloading}
              >
                <Text className="font-medium">{quality.label}</Text>
                <Ionicons name="download-outline" size={20} color={platformColor} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      <View className="mt-6">
        <Text className="text-xl font-medium mb-2">Cómo descargar</Text>

        <View className="flex-row items-center mb-2">
          <View className="w-8 h-8 rounded-full items-center justify-center mr-2" style={{ backgroundColor: platformColor }}>
            <Text className="text-white font-bold">1</Text>
          </View>
          <Text className="text-gray-700">
            Abre {getPlatformName()} y copia el enlace del vídeo.
          </Text>
        </View>

        <View className="flex-row items-center mb-2">
          <View className="w-8 h-8 rounded-full items-center justify-center mr-2" style={{ backgroundColor: platformColor }}>
            <Text className="text-white font-bold">2</Text>
          </View>
          <Text className="text-gray-700">
            Abra "Descargador de {getPlatformName()}" y pegue el enlace del vídeo.
          </Text>
        </View>

        <View className="flex-row items-center mb-2">
          <View className="w-8 h-8 rounded-full items-center justify-center mr-2" style={{ backgroundColor: platformColor }}>
            <Text className="text-white font-bold">3</Text>
          </View>
          <Text className="text-gray-700">
            Presione Descargar y elija el tipo que desea descargar.
          </Text>
        </View>

        <View className="flex-row items-center">
          <View className="w-8 h-8 rounded-full items-center justify-center mr-2" style={{ backgroundColor: platformColor }}>
            <Text className="text-white font-bold">4</Text>
          </View>
          <Text className="text-gray-700">
            ¡Hecho! La descarga se iniciará automáticamente.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default VideoDownloader;
