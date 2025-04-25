import { getFbVideoInfo } from "fb-downloader-scrapper";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export interface VideoQuality {
  label: string;
  url: string;
}

export interface VideoInfo {
  title: string;
  thumbnail: string;
  qualities: VideoQuality[];
}

export const getFacebookVideoInfo = async (url: string): Promise<VideoInfo> => {
  try {
    const videoInfo = await getFbVideoInfo(url);
    
    // Create quality options
    const qualities: VideoQuality[] = [];
    
    if (videoInfo.sd) {
      qualities.push({ label: 'SD', url: videoInfo.sd });
    }
    
    if (videoInfo.hd) {
      qualities.push({ label: 'HD', url: videoInfo.hd });
    }
    
    return {
      title: videoInfo.title || 'Facebook Video',
      thumbnail: videoInfo.thumbnail || '',
      qualities
    };
  } catch (error) {
    console.error('Error fetching video info:', error);
    throw new Error('No se pudo obtener información del video. Verifica que el enlace sea válido.');
  }
};

export const downloadVideo = async (url: string, filename: string): Promise<string> => {
  try {
    // Get the Downloads directory path
    const downloadDir = FileSystem.documentDirectory + 'Downloads/';
    
    // Create Downloads directory if it doesn't exist
    const dirInfo = await FileSystem.getInfoAsync(downloadDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(downloadDir, { intermediates: true });
    }
    
    // Full path for the downloaded file
    const filePath = downloadDir + filename;
    
    // Download the file
    const downloadResult = await FileSystem.downloadAsync(url, filePath);
    
    if (downloadResult.status !== 200) {
      throw new Error('Error al descargar el video');
    }
    
    return filePath;
  } catch (error) {
    console.error('Error downloading video:', error);
    throw error;
  }
};

export const shareVideo = async (filePath: string): Promise<void> => {
  try {
    if (!(await Sharing.isAvailableAsync())) {
      throw new Error('Sharing is not available on this device');
    }
    
    await Sharing.shareAsync(filePath);
  } catch (error) {
    console.error('Error sharing video:', error);
    throw error;
  }
};
