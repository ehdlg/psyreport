import { View } from 'react-native';
import Button from '../elements/Button';
import { useMicroStatus } from '../../store';
import { showToast } from '../../utils';
import { useCallback } from 'react';

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
  const { isUsingMicro } = useMicroStatus();
  const showMicroWarning = useCallback(() => {
    showToast({ message: 'Finaliza el audio antes de cambiar de sección', type: 'warning' });
  }, []);

  return (
    <View className='flex-row justify-around p-4 rounded-b-xl bg-slate-50 dark:bg-slate-700/20'>
      {step > stepLimits.MIN && (
        <Button
          type='secondary'
          title='Anterior'
          onPress={isUsingMicro ? showMicroWarning : formControl.prev}
        />
      )}
      {step === stepLimits.MAX ? (
        <Button
          type='primary'
          title='Enviar'
          onPress={isUsingMicro ? showMicroWarning : formControl.end}
        />
      ) : (
        <Button
          type='secondary'
          title='Siguiente'
          onPress={isUsingMicro ? showMicroWarning : formControl.next}
        />
      )}
    </View>
  );
}
