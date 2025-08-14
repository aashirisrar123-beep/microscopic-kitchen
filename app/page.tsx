"use client";

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Exercise, WorkoutLog } from '@/types';
import { getExercises, addExercise, deleteExercise, updateExercise, getWorkoutLogs, addWorkoutLog, deleteWorkoutLog, updateWorkoutLog } from '@/lib/utils';
import ExerciseList from '@/components/exercises/ExerciseList';
import ExerciseForm from '@/components/exercises/ExerciseForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LogViewer from '@/components/log/LogViewer';
import LogForm from '@/components/log/LogForm';
import ProgressOverview from '@/components/progress/ProgressOverview';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Dummy components for routes - will be replaced with actual implementations
const ExercisesPage = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    setExercises(getExercises());
  }, []);

  const handleAddExercise = (newExercise: Exercise) => {
    setExercises(prev => [...prev, newExercise]);
  };

  const handleDeleteExercise = (id: string) => {
    deleteExercise(id);
    setExercises(prev => prev.filter(ex => ex.id !== id));
    // TODO: Handle deletion of associated logs if necessary
  };

  const handleUpdateExercise = (updatedExercise: Exercise) => {
    updateExercise(updatedExercise);
    setExercises(prev => prev.map(ex => ex.id === updatedExercise.id ? updatedExercise : ex));
    setEditingExercise(null);
  };

  const handleCancelEdit = () => {
    setEditingExercise(null);
  };

  return (
    <div className="p-4 space-y-6">
      <ExerciseForm onAddExercise={handleAddExercise} />
      <ExerciseList 
        exercises={exercises}
        onDelete={handleDeleteExercise}
        onEdit={setEditingExercise}
      />
      
      <Dialog open={!!editingExercise} onOpenChange={(open) => !open && handleCancelEdit()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Exercise</DialogTitle>
          </DialogHeader>
          {editingExercise && (
            <ExerciseForm 
              initialExercise={editingExercise}
              onUpdateExercise={handleUpdateExercise}
              onCancelEdit={handleCancelEdit}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const WorkoutLogPage = () => {
  const [workoutLogs, setWorkoutLogs] = useState<WorkoutLog[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  useEffect(() => {
    setWorkoutLogs(getWorkoutLogs());
  }, []);

  const handleAddLog = (newLog: WorkoutLog) => {
    const addedLog = addWorkoutLog(newLog);
    setWorkoutLogs(prev => [...prev, addedLog]);
  };

  const handleDeleteLog = (id: string) => {
    deleteWorkoutLog(id);
    setWorkoutLogs(prev => prev.filter(log => log.id !== id));
  };

  // Filter logs for the selected date
  const logsForSelectedDate = selectedDate
    ? workoutLogs.filter(log => new Date(log.date).toDateString() === selectedDate.toDateString())
    : [];

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Daily Workout Log</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border w-full"
          />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <div>
            <LogForm onAddLog={handleAddLog} />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Logs for {selectedDate ? selectedDate.toLocaleDateString() : 'selected date'}</h3>
            <LogViewer logs={logsForSelectedDate} onDeleteLog={handleDeleteLog} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgressPage = () => {
  // Placeholder for Progress Page
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Progress Summary</h2>
      <ProgressOverview />
    </div>
  );
};

export default function Page() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
        <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-10">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold">
              Workout Tracker
            </div>
            <ul className="flex space-x-4">
              <li><Button asChild variant="link"><Link to="/">Exercises</Link></Button></li>
              <li><Button asChild variant="link"><Link to="/log">Log Workout</Link></Button></li>
              <li><Button asChild variant="link"><Link to="/progress">Progress</Link></Button></li>
            </ul>
          </nav>
        </header>

        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ExercisesPage />} />
            <Route path="/log" element={<WorkoutLogPage />} />
            <Route path="/progress" element={<ProgressPage />} />
          </Routes>
        </main>

        <footer className="bg-white dark:bg-gray-800 shadow-inner mt-8 py-4 text-center">
          <p>&copy; 2023 Workout Tracker. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}
