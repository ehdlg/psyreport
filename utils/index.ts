import Toast from 'react-native-root-toast';
import { INITAL_FORM_STEP, FORM_STEP, TOAST_OPTIONS } from '../constants';
import { SelfReport, ToastType } from '../types';

export function formatDateWithTime(date: Date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year}, ${hours}:${minutes}`;
}

export function getEditStep(report: SelfReport) {
  for (const [key, value] of Object.entries(report)) {
    if (
      (typeof value === 'string' && value.length === 0) ||
      (typeof value === 'object' && null != value && null != value.text && value.text.length === 0)
    ) {
      return FORM_STEP[key as keyof SelfReport] || INITAL_FORM_STEP;
    }
  }

  return INITAL_FORM_STEP;
}

export const showToast = ({ message, type }: { message: string; type: ToastType }) => {
  const toastOptions = TOAST_OPTIONS[type];

  Toast.show(message, toastOptions);
};
