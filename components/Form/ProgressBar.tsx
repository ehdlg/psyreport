import { View } from 'react-native';
import { StepIndicatorStatus } from '../../types';
import StepIndicator from '../elements/StepIndicator';

export default function ProgressBar({
  currentStep,
  numberOfSteps: stepNumber,
}: {
  currentStep: number;
  numberOfSteps: number;
}) {
  const steps = Array.from({ length: stepNumber }, (_, index) => index);
  return (
    <View className='flex-row gap-x-4 mx-auto w-10/12'>
      {steps.map((step) => {
        const status: StepIndicatorStatus =
          step === currentStep ? 'current' : step > currentStep ? 'todo' : 'done';

        return <StepIndicator key={step} status={status} />;
      })}
    </View>
  );
}
