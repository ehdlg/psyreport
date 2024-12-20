import Toast, { ToastOptions } from 'react-native-root-toast';
import { NewSelfReport, SelfReport, ToastType } from './types';
import { documentDirectory } from 'expo-file-system';

export const CURRENT_DATETIME = new Date(Date.now());

export const DISCOMFORT_LIMITS = {
  MIN: 0,
  MAX: 10,
};
export const DEFAULT_DISCOMFORT_VALUE = Math.floor(DISCOMFORT_LIMITS.MAX / 2);

export const DEFAULT_SELF_REPORT_VALUES: NewSelfReport = {
  date: CURRENT_DATETIME.toISOString(),
  precedent: {
    audio: null,
    text: null,
  },
  event: {
    discomfort: DEFAULT_DISCOMFORT_VALUE,
    text: null,
    audio: null,
  },
  reflections: {
    discomfort: DEFAULT_DISCOMFORT_VALUE,
    text: null,
    audio: null,
  },
  thoughts: {
    text: null,
    audio: null,
  },
  otherActions: {
    text: null,
    audio: null,
  },
};

export const STORAGE_KEY = 'selfreports';

export const INITIAL_ID = 1;

export const SELF_REPORT_QUESTIONS: Record<keyof Omit<NewSelfReport, 'id' | 'date'>, string> = {
  precedent: '¿Dónde estabas, qué hacías?',
  event: '¿Qué ocurrió?',
  reflections: '¿Qué pensaste pasado un tiempo?',
  thoughts: '¿Qué pensanste?',
  otherActions: '¿Qué hicieron despues las otras personas?',
};

export const ROUTES = {
  HOME: '/',
  NEW: '/new',
  REPORTS: '/reports',
};

export const FORM_QUESTIONS: Record<keyof NewSelfReport, { title: string; placeholder?: string }> =
  {
    date: {
      title: '¿Cuándo ocurrió?',
    },
    precedent: {
      title: 'Situación precedente',
      placeholder: 'Dónde estaba, qué hacía, con quién...',
    },
    event: {
      title: '¿Qué ocurrió?',
      placeholder: 'Qué hizo, cómo se sintió, qué penso en ese momento...',
    },
    thoughts: {
      title: '¿Que pensó después?',
      placeholder: 'Pasado un tiempo, qué pensó de la situación, su reacción...',
    },
    reflections: {
      title: '¿Cómo se sintió después?',
      placeholder: 'Describa como se sintió pasado un tiempo de la situacíon',
    },
    otherActions: {
      title: '¿Qué hicieron después las otras personas?',
      placeholder: 'Si había alguien involucrado, como actuó, que hizo o dijo pasado un tiempo',
    },
  };

export const INITAL_FORM_STEP = 0;

export const FORM_STEP: Record<keyof SelfReport, number> = {
  id: 0,
  date: 0,
  precedent: 1,
  event: 2,
  thoughts: 3,
  reflections: 4,
  otherActions: 5,
};

export const AUDIO_DIR = documentDirectory + 'audios';

export const AUDIO_EXTENSION = '.m4a';

export const DEFAULT_TOAST_OPTIONS: ToastOptions = {
  duration: Toast.durations.SHORT,
  animation: true,
};

export const TOAST_OPTIONS: Record<ToastType, ToastOptions> = {
  warning: {
    ...DEFAULT_TOAST_OPTIONS,
    backgroundColor: '#fef3c7',
    textColor: '#f59e0b',
  },
  success: {
    ...DEFAULT_TOAST_OPTIONS,
    backgroundColor: '#dcfce7',
    textColor: '#22c55e',
  },
  error: {
    ...DEFAULT_TOAST_OPTIONS,
    backgroundColor: '#fecaca',
    textColor: '#ef4444',
  },
  info: {
    ...DEFAULT_TOAST_OPTIONS,
    backgroundColor: '#e0e7ff',
    textColor: '#6366f1',
  },
};

export const DEFAULT_AUDIO_MESSAGE = 'Respuesta en formato audio';
