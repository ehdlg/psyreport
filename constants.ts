import { NewSelfReport } from './types';

export const CURRENT_DATETIME = new Date(Date.now());

export const DISCOMFORT_LIMITS = {
  MIN: 1,
  MAX: 10,
};
export const DEFAULT_DISCOMFORT_VALUE = Math.floor(DISCOMFORT_LIMITS.MAX / 2);

export const DEFAULT_SELF_REPORT_VALUES: NewSelfReport = {
  date: CURRENT_DATETIME.toISOString(),
  precedent: '',
  event: {
    discomfort: DEFAULT_DISCOMFORT_VALUE,
    text: '',
  },
  reflections: {
    discomfort: DEFAULT_DISCOMFORT_VALUE,
    text: '',
  },
  thoughts: '',
  otherActions: '',
};

export const STORAGE_KEY = 'reports';

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
