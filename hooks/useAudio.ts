import { Audio } from 'expo-av';
import { useCallback, useEffect, useState } from 'react';

export default function useAudio(uri: string | null) {
  const [audio, setAudio] = useState<Audio.Sound | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUri, setCurrentUri] = useState<string | null>(null);

  const getAudio = useCallback(async () => {
    if (null !== uri && uri === currentUri) return;

    setIsLoading(true);
    setError(null);
    setCurrentUri(uri);
    try {
      if (null == uri) {
        setAudio(null);

        return;
      }

      const { sound } = await Audio.Sound.createAsync({ uri });

      setAudio(sound);
    } catch (_error) {
      setError('No se encontró el audio correspondiente');
      setAudio(null);
    } finally {
      setIsLoading(false);
    }
  }, [uri, currentUri]);

  useEffect(() => {
    getAudio();
  }, [uri, getAudio]);

  const play = async () => {
    if (null == audio) return;

    await audio.playAsync();
  };

  return { play, error, isLoading, audioReady: null != audio && !isLoading };
}
