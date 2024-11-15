import { View } from 'react-native';
import { StepIndicatorStatus } from '../../types';

export default function StepIndicator({ status }: { status: StepIndicatorStatus }) {
  const BASIC_STYLES =
    'flex-1 py-1 rounded-xl border border-slate-200 dark:border-slate-600 transition ease-in duration-150';
  const styles: Record<StepIndicatorStatus, string> = {
    current: 'bg-slate-200 border-indigo-200 dark:bg-slate-700 dark:border-indigo-300',
    done: 'bg-indigo-300 border-transparent',
    todo: 'bg-slate-100 dark:bg-slate-600/30 dark:border-transparent border-slate-200',
  };

  return <View className={`${BASIC_STYLES} ${styles[status]}`}></View>;
}
