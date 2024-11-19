import { Slot } from 'expo-router';
import { View } from 'react-native';
import { useColorScheme } from 'nativewind';
import Header from '../components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootSiblingParent } from 'react-native-root-siblings';

export default function Layout() {
  const { setColorScheme } = useColorScheme();

  setColorScheme('system');

  return (
    <RootSiblingParent>
      <SafeAreaView edges={['top']} className='dark:bg-slate-800'>
        <Header />
        <View className='gap-y-20 justify-start px-4 h-screen'>
          <Slot />
        </View>
      </SafeAreaView>
    </RootSiblingParent>
  );
}
