
export interface Exercise {
  id: string;
  name: string;
  type: 'Strength' | 'Cardio' | 'Bodyweight';
}

export interface WorkoutLog {
  id: string;
  date: string; // YYYY-MM-DD
  exercises: WorkoutExercise[];
}

export interface WorkoutExercise {
  exerciseId: string;
  sets?: number;
  reps?: number;
  weight?: number; // in kg
  duration?: string; // e.g., "30 min"
  distance?: string; // e.g., "5 km"
}
