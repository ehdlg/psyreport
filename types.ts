export type SelfReport = {
  id: number;
  date: Date;
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
