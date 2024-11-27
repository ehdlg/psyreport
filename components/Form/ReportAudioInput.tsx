import { View, Alert, Text } from 'react-native';
import { useCallback, useEffect } from 'react';
import { deleteAudio as deleteAudioFromStorage } from '../../storage';
import useRecord from '../../hooks/useRecord';
import useAudio from '../../hooks/useAudio';
import Button from '../elements/Button';
import Loading from '../Loading';

const RecordAudio = ({
  isRecording,
  stopRecording,
  startRecording,
}: {
  isRecording: boolean;
  stopRecording: () => void;
  startRecording: () => void;
}) => {
  return (
    <View>
      <Button
        title={isRecording ? 'Parar' : 'Grabar'}
        onPress={isRecording ? stopRecording : startRecording}
        type='primary'
      />
    </View>
  );
};

const ShowAudio = ({
  play: playRecording,
  delete: clearRecording,
}: {
  play: () => void;
  delete: () => void;
}) => {
  return (
    <View className='flex-row gap-x-6 justify-center items-center'>
      <Button title='Play' onPress={playRecording} type='primary' />
      <Button title='Borrar' onPress={clearRecording} type='tertiary' />
    </View>
  );
};

export default function ReportAudio({
  audioUri = null,
  handleAudioUri = () => {},
}: {
  audioUri: string | null;
  handleAudioUri: (newAudioUri: string | null) => void;
}) {
  const { recording, isRecording, startRecording, stopRecording } = useRecord();
  const { play, isLoading: isAudioLoading, error, audioReady } = useAudio(audioUri);

  const deleteAudio = useCallback(async () => {
    if (null == audioUri) return;
    try {
      await deleteAudioFromStorage(audioUri);
      handleAudioUri(null);
    } catch (error) {
      console.error(error);
    }
  }, [handleAudioUri, audioUri]);

  const stop = async () => {
    await stopRecording();

    const newUri = recording?.getURI() || null;

    handleAudioUri(newUri);
  };

  useEffect(() => {
    if (null == audioUri || isRecording || isAudioLoading || audioReady) return;

    const newUri = recording?.getURI() || null;

    if (audioUri === newUri) return;

    handleAudioUri(newUri);
  }, [recording, audioReady, handleAudioUri, audioUri, isRecording, isAudioLoading]);

  const deleteRecordingAndAudio = useCallback(() => {
    Alert.alert('¿Borrar audio?', 'Los cambios son irreversibles', [
      {
        style: 'cancel',
        text: 'Cancelar',
      },
      {
        style: 'destructive',
        onPress: deleteAudio,
        text: 'Confirmar',
      },
    ]);
  }, [deleteAudio]);

  if (isAudioLoading) return <Loading />;

  return (
    <View>
      {error && <Text className='my-4 text-lg text-red-500'>{error}</Text>}
      {!audioReady ? (
        <RecordAudio
          isRecording={isRecording}
          startRecording={startRecording}
          stopRecording={stop}
        />
      ) : (
        <ShowAudio delete={deleteRecordingAndAudio} play={play} />
      )}
    </View>
  );
}
