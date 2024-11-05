import { Slot } from 'expo-router';
import { View } from 'react-native';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function Layout() {
  return (
    <RootSiblingParent>
      <SafeAreaView edges={['top']}>
        <Header />
        <View className='gap-y-28 justify-start px-4 h-screen'>
          <Slot />
        </View>
      </SafeAreaView>
    </RootSiblingParent>
  );
}
