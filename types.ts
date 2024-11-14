export type SelfReport = {
  id: number;
  date: string;
  precedent: string;
  event: {
    discomfort: number;
    text: string;
  };
  thoughts: string;
  reflections: {
    discomfort: number | null;
    text: string | null;
  };
  otherActions: string | null;
};

export type NewSelfReport = Omit<SelfReport, 'id'>;

export type ButtonType = 'primary' | 'secondary' | 'tertiary';

export type StepIndicatorStatus = 'current' | 'done' | 'todo';

export type FormValues = Omit<SelfReport, 'id'> & Partial<Pick<SelfReport, 'id'>>;
