import { Slot } from 'expo-router';
import { View } from 'react-native';
import Header from '../components/Header';

export default function Layout() {
  return (
    <>
      <Header />
      <View className='justify-between px-2 h-screen'>
        <Slot />
      </View>
    </>
  );
}
