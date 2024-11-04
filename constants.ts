export const CURRENT_DATETIME = new Date(Date.now());

export const FEELING_LIMITS = {
  MIN: 1,
  MAX: 10,
};
export const DEFAULT_FEELING_VALUE = FEELING_LIMITS.MAX / 2;

export const DEFAULT_REPORT_VALUES = {
  date: CURRENT_DATETIME,
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
