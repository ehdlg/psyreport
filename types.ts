export type Feeling = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type SelfReport = {
  id: number;
  date: Date;
  antecedent: string;
  event: {
    feeling: Feeling;
    text: string;
  };
  thoughts: string;
  reflections: {
    feeling: Feeling | null;
    text: string | null;
  };
};

export type NewSelfReport = Omit<SelfReport, 'id'>;

export type ButtonType = 'primary' | 'secondary' | 'tertiary';
