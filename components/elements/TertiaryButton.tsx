import { PropsWithChildren } from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function TertiaryButton({
  onPress,
  title,
}: PropsWithChildren & { onPress: () => any; title: string }) {
  return (
    <TouchableOpacity onPress={onPress} className='px-6 py-4 rounded'>
      <Text className='font-bold text-neutral-500'>{title}</Text>
    </TouchableOpacity>
  );
}
