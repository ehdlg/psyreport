import { View } from 'react-native';
import { PropsWithChildren } from 'react';

export default function QuestionWrapper({ children }: PropsWithChildren) {
  return <View className='gap-y-4 p-4'>{children}</View>;
}
