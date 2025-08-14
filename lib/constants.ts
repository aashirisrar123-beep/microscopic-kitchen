import { Exercise, WorkoutLog } from "../types";

export const initialExercises: Exercise[] = [
  { id: `ex-${Date.now()}-1`, name: "Bench Press", type: "Strength" },
  { id: `ex-${Date.now()}-2`, name: "Squat", type: "Strength" },
  { id: `ex-${Date.now()}-3`, name: "Running", type: "Cardio" },
  { id: `ex-${Date.now()}-4`, name: "Push-ups", type: "Bodyweight" },
];

export const initialWorkoutLogs: WorkoutLog[] = [
  {
    id: `wl-${Date.now()}-1`,
    date: "2023-10-25",
    exercises: [
      { exerciseId: "ex-1", sets: 3, reps: 10, weight: 80 },
      { exerciseId: "ex-3", duration: "30 min", distance: "5 km" },
    ],
  },
  {
    id: `wl-${Date.now()}-2`,
    date: "2023-10-26",
    exercises: [
      { exerciseId: "ex-2", sets: 4, reps: 8, weight: 90 },
      { exerciseId: "ex-4", sets: 3, reps: 15 },
    ],
  },
];
