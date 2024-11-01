import { View, Text } from 'react-native';

export default function Header() {
  return (
    <View className='px-2 py-6 mb-4 border-b border-blue-200 drop-shadow-sm'>
      <Text className='inline-block font-serif text-2xl text-indigo-300'>PsyReport</Text>
    </View>
  );
}
