import { PropsWithChildren } from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function SecondaryButton({
  onPress,
  title,
}: PropsWithChildren & { onPress: () => any; title: string }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className='justify-center px-2 py-1 rounded border border-neutral-300'
    >
      <Text className='font-bold text-indigo-300'>{title}</Text>
    </TouchableOpacity>
  );
}
