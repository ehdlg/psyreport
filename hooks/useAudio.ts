import { Audio } from 'expo-av';
import { useCallback, useEffect, useState } from 'react';

export default function useAudio(uri: string | null) {
  const [audio, setAudio] = useState<Audio.Sound | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getAudio = useCallback(async () => {
    setIsLoading(true);
    setError(null);
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
  }, [uri]);

  useEffect(() => {
    getAudio();
  }, [uri, getAudio]);

  const play = async () => {
    if (null == audio) return;

    await audio.playAsync();
  };

  return { play, error, isLoading, audioReady: null != audio && !isLoading };
}
