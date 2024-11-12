import { NewSelfReport } from './types';

export const CURRENT_DATETIME = new Date(Date.now());

export const FEELING_LIMITS = {
  MIN: 1,
  MAX: 10,
};
export const DEFAULT_FEELING_VALUE = Math.floor(FEELING_LIMITS.MAX / 2);

export const DEFAULT_REPORT_VALUES: NewSelfReport = {
  date: CURRENT_DATETIME.toISOString(),
  antecedent: '',
  event: {
    feeling: DEFAULT_FEELING_VALUE,
    text: '',
  },
  reflections: {
    feeling: DEFAULT_FEELING_VALUE,
    text: '',
  },
  thoughts: '',
};

export const STORAGE_KEY = 'reports';

export const INITIAL_ID = 1;

export const SELF_REPORT_QUESTIONS: Record<keyof Omit<NewSelfReport, 'id' | 'date'>, string> = {
  antecedent: '¿Dónde estabas, qué hacías?',
  event: '¿Qué ocurrió?',
  reflections: '¿Qué pensaste pasado un tiempo?',
  thoughts: '¿Qué pensanste?',
};
