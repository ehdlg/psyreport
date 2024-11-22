import { View, Text } from 'react-native';
import { PropsWithChildren } from 'react';

export default function QuestionWrapper({
  children,
  question,
}: PropsWithChildren & { question: string }) {
  return (
    <View className='gap-y-4 p-4'>
      <Text className='text-xl text-center text-slate-700 dark:text-slate-300'>{question}</Text>
      {children}
    </View>
  );
}
