export interface StressLevel {
  level: 'low' | 'medium' | 'high';
  score: number;
  timestamp: number;
}

export interface FacialFeatures {
  eyeOpenness: number;
  mouthTension: number;
  browFurrow: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  forStressLevel: StressLevel['level'];
}
