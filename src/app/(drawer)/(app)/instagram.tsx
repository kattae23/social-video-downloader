import { View, SafeAreaView, ScrollView } from "react-native";
import VideoDownloader from "@/components/VideoDownloader";

export default function InstagramScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      <ScrollView>
        <View className="flex items-center p-4">
          <VideoDownloader platform="instagram" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
