import { View, Text } from 'react-native';

export default function Header() {
  return (
    <View className='p-2 mb-4 border-b drop-shadow-sm border-neutral-200'>
      <Text className='inline-block font-serif text-2xl italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-300'>
        PsyReport
      </Text>
    </View>
  );
}
