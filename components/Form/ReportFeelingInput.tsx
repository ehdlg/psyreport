import { View, Text, TouchableOpacity } from 'react-native';
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
      <View className='flex-row gap-x-6 justify-center'>
        <TouchableOpacity onPress={updateFeeling(feelingValue - 1)}>
          <Text className='text-xl text-neutral-700'>-</Text>
        </TouchableOpacity>
        <Text className='text-2xl text-neutral-700'>{feelingValue}</Text>
        <TouchableOpacity onPress={updateFeeling(feelingValue + 1)}>
          <Text className='text-xl text-neutral-700'>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
