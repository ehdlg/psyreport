import { View, Text, TouchableOpacity } from 'react-native';
import { FEELING_LIMITS } from '../../constants';

const Icon = ({
  text,
  updateFeeling,
  feelingValue,
}: {
  text: '+' | '-';
  updateFeeling: () => void;
  feelingValue: number;
}) => {
  const disabledButton =
    (text === '+' && FEELING_LIMITS.MAX === feelingValue) ||
    (text === '-' && FEELING_LIMITS.MIN === feelingValue);

  return (
    <TouchableOpacity
      onPress={updateFeeling}
      className={`flex-row justify-center items-center text-center rounded-full border border-neutral-200 bg-neutral-50 size-10 ${
        disabledButton && 'opacity-25'
      }`}
      disabled={disabledButton}
    >
      <Text className='text-2xl text-neutral-500'>{text}</Text>
    </TouchableOpacity>
  );
};
export default function ReportFeelingInput({
  updateFeeling,
  feelingValue,
}: {
  updateFeeling: (newValue: number) => () => void;
  feelingValue: number;
}) {
  return (
    <View className='gap-y-2 mt-8'>
      <Text className='text-center text-neutral-500'>¿Cómo te sentiste en ese momento?</Text>
      {/* TODO: use + and - svg instead */}
      <View className='flex-row gap-x-6 justify-center items-center'>
        <Icon
          feelingValue={feelingValue}
          text='-'
          updateFeeling={updateFeeling(feelingValue - 1)}
        />
        <Text className='text-2xl text-neutral-700'>{feelingValue}</Text>
        <Icon
          feelingValue={feelingValue}
          text='+'
          updateFeeling={updateFeeling(feelingValue + 1)}
        />
      </View>
    </View>
  );
}
