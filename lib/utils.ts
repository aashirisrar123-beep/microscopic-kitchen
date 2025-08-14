import { Exercise, WorkoutLog } from "../types";
import { initialExercises, initialWorkoutLogs } from "./constants";
import { v4 as uuidv4 } from 'uuid';

const EXERCISES_KEY = 'workoutTracker_exercises';
const WORKOUT_LOGS_KEY = 'workoutTracker_workoutLogs';

// Exercises
export const getExercises = (): Exercise[] => {
  const exercises = localStorage.getItem(EXERCISES_KEY);
  if (exercises) {
    return JSON.parse(exercises);
  } else {
    // Initialize with mock data if no data exists
    localStorage.setItem(EXERCISES_KEY, JSON.stringify(initialExercises));
    return initialExercises;
  }
};

export const addExercise = (exercise: Omit<Exercise, 'id'>): Exercise => {
  const newExercise: Exercise = { ...exercise, id: `ex-${uuidv4()}` };
  const exercises = getExercises();
  const updatedExercises = [...exercises, newExercise];
  localStorage.setItem(EXERCISES_KEY, JSON.stringify(updatedExercises));
  return newExercise;
};

export const updateExercise = (updatedExercise: Exercise): void => {
  const exercises = getExercises();
  const filteredExercises = exercises.filter(ex => ex.id !== updatedExercise.id);
  localStorage.setItem(EXERCISES_KEY, JSON.stringify([...filteredExercises, updatedExercise]));
};

export const deleteExercise = (id: string): void => {
  const exercises = getExercises();
  const filteredExercises = exercises.filter(ex => ex.id !== id);
  localStorage.setItem(EXERCISES_KEY, JSON.stringify(filteredExercises));
  // Also need to handle deleting logs associated with this exercise if necessary
};

// Workout Logs
export const getWorkoutLogs = (): WorkoutLog[] => {
  const logs = localStorage.getItem(WORKOUT_LOGS_KEY);
  if (logs) {
    return JSON.parse(logs);
  }
  // Initialize with mock data if no data exists
  // Note: Using mock data here might overwrite existing logs if not handled carefully. 
  // It's better to only initialize if the key doesn't exist.
  localStorage.setItem(WORKOUT_LOGS_KEY, JSON.stringify(initialWorkoutLogs));
  return initialWorkoutLogs;
};

export const addWorkoutLog = (log: Omit<WorkoutLog, 'id'>): WorkoutLog => {
  const newLog: WorkoutLog = { ...log, id: `wl-${uuidv4()}` };
  const logs = getWorkoutLogs();
  const updatedLogs = [...logs, newLog];
  localStorage.setItem(WORKOUT_LOGS_KEY, JSON.stringify(updatedLogs));
  return newLog;
};

export const updateWorkoutLog = (updatedLog: WorkoutLog): void => {
  const logs = getWorkoutLogs();
  const filteredLogs = logs.filter(log => log.id !== updatedLog.id);
  localStorage.setItem(WORKOUT_LOGS_KEY, JSON.stringify([...filteredLogs, updatedLog]));
};

export const deleteWorkoutLog = (id: string): void => {
  const logs = getWorkoutLogs();
  const filteredLogs = logs.filter(log => log.id !== id);
  localStorage.setItem(WORKOUT_LOGS_KEY, JSON.stringify(filteredLogs));
};
