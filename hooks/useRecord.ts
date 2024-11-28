import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { RecordingOptionsPresets } from 'expo-av/build/Audio';
import { useMicroStatus } from '../store';

export default function useRecord() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const { setMicroStatus } = useMicroStatus();

  useEffect(() => {
    return () => {
      if (null == recording) return;

      recording.getStatusAsync().then(({ isDoneRecording }) => {
        if (isDoneRecording) return;

        recording.stopAndUnloadAsync().finally(() => {
          setRecording(null);
          setMicroStatus(false);
        });
      });
    };
  }, [recording, setMicroStatus]);

  useEffect(
    function updateMicroStatus() {
      setMicroStatus(isRecording);
    },
    [isRecording, setMicroStatus]
  );

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') return;

      setIsRecording(true);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(RecordingOptionsPresets.HIGH_QUALITY);

      setRecording(recording);
    } catch (error) {
      console.error(error);
    }
  };

  const stopRecording = async () => {
    if (null == recording) return;

    setIsRecording(false);

    await recording.stopAndUnloadAsync();
  };

  const clearRecording = () => setRecording(null);

  const playRecording = async () => {
    if (null == recording || isRecording) return;

    try {
      const { sound } = await recording.createNewLoadedSoundAsync();

      sound.replayAsync();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    recording,
    startRecording,
    stopRecording,
    clearRecording,
    isRecording,
    playRecording,
  };
}
