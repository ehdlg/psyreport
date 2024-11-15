import { View } from 'react-native';
import Button from '../elements/Button';

export default function Control({
  step,
  formControl,
  stepLimits,
}: {
  step: number;
  formControl: {
    next: () => Promise<void>;
    prev: () => void;
    end: (e?: React.FormEvent<HTMLFormElement>) => void;
  };
  stepLimits: { MIN: number; MAX: number };
}) {
  return (
    <View className='flex-row justify-around p-4 rounded-b-xl bg-slate-50 dark:bg-slate-700/20'>
      {step > stepLimits.MIN && (
        <Button type='secondary' title='Anterior' onPress={formControl.prev} />
      )}
      {step === stepLimits.MAX ? (
        <Button type='primary' title='Enviar' onPress={formControl.end} />
      ) : (
        <Button type='secondary' title='Siguiente' onPress={formControl.next} />
      )}
    </View>
  );
}
