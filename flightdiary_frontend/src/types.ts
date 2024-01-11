export interface DiaryEntry {
  id: number;
  date: string;
  weather: 'sunny' | 'rainy' | 'cloudy' | 'stormy' | 'windy';
  visibility: 'great' | 'good' | 'ok' | 'poor';
  comment: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>;