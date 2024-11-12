export type SelfReport = {
  id: number;
  date: string;
  antecedent: string;
  event: {
    feeling: number;
    text: string;
  };
  thoughts: string;
  reflections: {
    feeling: number | null;
    text: string | null;
  };
};

export type NewSelfReport = Omit<SelfReport, 'id'>;

export type ButtonType = 'primary' | 'secondary' | 'tertiary';

export type StepIndicatorStatus = 'current' | 'done' | 'todo';
