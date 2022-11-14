export enum CourseType {
  VideoDers = 'Video dərs',
  CanliDers = 'Canlı dərs',
  AraliqImtahan = 'Aralıq imtahan',
  OxuMateriali = 'Oxu materialı',
  Tecrube = 'Təcrübə',
  Imtahan = 'İmtahan',
}

export interface Course {
  group: string;
  name: string;
  contact: string;
  score: {
    exam: number;
    participation: number;
    video: number;
    praktika: number;
  };
  sections: [
    {
      name: string;
      questions: [
        {
          question: string;
          type: keyof typeof CourseType;
          date: string;
          status: { text: string; color: string }[];
        },
      ];
      color?: string;
      information?: string;
    },
  ];
  result: {
    group: boolean;
    point: string;
    papers: boolean[];
  };
}
