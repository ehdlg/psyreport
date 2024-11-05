import { View } from 'react-native';
import { StepIndicatorStatus } from '../../types';

export default function StepIndicator({ status }: { status: StepIndicatorStatus }) {
  const BASIC_STYLES =
    'flex-1 py-1 rounded-xl border border-neutral-200 transition ease-in duration-150';
  const styles: Record<StepIndicatorStatus, string> = {
    current: 'bg-neutral-200 border-trasnparent',
    done: 'bg-indigo-300 border-white',
    todo: 'bg-neutral-100/30',
  };

  return <View className={`${BASIC_STYLES} ${styles[status]}`}></View>;
}
