import { View } from 'react-native';
import useAudio from '../hooks/useAudio';
import Loading from './Loading';
import Button from './elements/Button';
import { AudioUri } from '../types';

export default function PlayAudio({ uri }: { uri: AudioUri }) {
  const { isLoading, audioReady, play } = useAudio(uri);

  if (!audioReady) return null;

  return (
    <View className=''>
      {isLoading && <Loading />}
      <Button onPress={play} title='Play' type='secondary' />
    </View>
  );
}
