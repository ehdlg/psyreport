import { View, Text, TouchableOpacity } from 'react-native';
import { DISCOMFORT_LIMITS } from '../../constants';

const Icon = ({
  text,
  updateDiscomfort,
  discomfortValue,
}: {
  text: '+' | '-';
  updateDiscomfort: () => void;
  discomfortValue: number;
}) => {
  const disabledButton =
    (text === '+' && DISCOMFORT_LIMITS.MAX === discomfortValue) ||
    (text === '-' && DISCOMFORT_LIMITS.MIN === discomfortValue);

  return (
    <TouchableOpacity
      onPress={updateDiscomfort}
      className={`flex-row justify-center items-center text-center rounded-full border border-slate-200 bg-slate-100 dark:bg-slate-700/30 dark:border-slate-700 size-10 ${
        disabledButton && 'opacity-25'
      }`}
      disabled={disabledButton}
    >
      <Text className='text-2xl text-slate-600 dark:text-slate-400'>{text}</Text>
    </TouchableOpacity>
  );
};
export default function ReportDiscomfortInput({
  updateDiscomfort,
  discomfortValue,
}: {
  updateDiscomfort: (newValue: number) => () => void;
  discomfortValue: number;
}) {
  return (
    <View className='gap-y-2 mt-8'>
      <Text className='text-center text-slate-600 dark:text-slate-300'>
        ¿Cómo te sentiste en ese momento?
      </Text>
      <View className='flex-row gap-x-6 justify-center items-center'>
        <Icon
          discomfortValue={discomfortValue}
          text='-'
          updateDiscomfort={updateDiscomfort(discomfortValue - 1)}
        />
        <Text className='text-2xl text-slate-600 dark:text-slate-300'>{discomfortValue}</Text>
        <Icon
          discomfortValue={discomfortValue}
          text='+'
          updateDiscomfort={updateDiscomfort(discomfortValue + 1)}
        />
      </View>
    </View>
  );
}
