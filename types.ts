export type Feeling = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type SelfReport = {
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
