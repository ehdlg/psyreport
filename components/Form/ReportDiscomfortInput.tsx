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
      className={`flex-row justify-center items-center text-center rounded-full border border-neutral-200 bg-neutral-50 size-10 ${
        disabledButton && 'opacity-25'
      }`}
      disabled={disabledButton}
    >
      <Text className='text-2xl text-neutral-500'>{text}</Text>
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
      <Text className='text-center text-neutral-500'>¿Cómo te sentiste en ese momento?</Text>
      {/* TODO: use + and - svg instead */}
      <View className='flex-row gap-x-6 justify-center items-center'>
        <Icon
          discomfortValue={discomfortValue}
          text='-'
          updateDiscomfort={updateDiscomfort(discomfortValue - 1)}
        />
        <Text className='text-2xl text-neutral-700'>{discomfortValue}</Text>
        <Icon
          discomfortValue={discomfortValue}
          text='+'
          updateDiscomfort={updateDiscomfort(discomfortValue + 1)}
        />
      </View>
    </View>
  );
}
