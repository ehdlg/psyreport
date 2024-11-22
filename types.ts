export type SelfReport = {
  id: number;
  date: string;
  precedent: {
    text: string | null;
    audio: string | null;
  };
  event: {
    discomfort: number;
    text: string | null;
    audio: string | null;
  };
  thoughts: {
    text: string | null;
    audio: string | null;
  };
  reflections: {
    audio: string | null;
    discomfort: number | null;
    text: string | null;
  };
  otherActions: {
    audio: string | null;
    text: string | null;
  };
};

export type NewSelfReport = Omit<SelfReport, 'id'>;

export type ButtonType = 'primary' | 'secondary' | 'tertiary';

export type StepIndicatorStatus = 'current' | 'done' | 'todo';

export type FormValues = Omit<SelfReport, 'id'> & Partial<Pick<SelfReport, 'id'>>;
