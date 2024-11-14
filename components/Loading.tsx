import { ActivityIndicator, View } from 'react-native';

export default function Loading() {
  return (
    <View className='justify-center items-center mx-auto mt-10'>
      <ActivityIndicator color='#a5b4fc' size={50} />
    </View>
  );
}
