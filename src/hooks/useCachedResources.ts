import { FontAwesome, Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect } from 'react';
import { Image } from 'react-native';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  function cacheImages(images: any) {
    return images.map((image: any) => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        const imageAssets = cacheImages([require('~/assets/images/backgroundImage.png')]);
        SplashScreen.preventAutoHideAsync();
        await Promise.all([
          Font.loadAsync({
            ...FontAwesome.font,
            ...Ionicons.font,
            ...SimpleLineIcons.font,
            'nunito': require('~/assets/fonts/Nunito-Regular.ttf'),
            'nunito-semi': require('~/assets/fonts/Nunito-SemiBold.ttf')
          }),
          ...imageAssets
        ]);
      } catch (error) {
        console.warn(error);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
