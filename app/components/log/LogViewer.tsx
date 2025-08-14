"use client";

import React from 'react';
import { WorkoutLog, Exercise } from '@/types';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { getExercises } from '@/lib/utils'; // To fetch exercise names

interface LogViewerProps {
  logs: WorkoutLog[];
  onDeleteLog?: (id: string) => void;
  // Add onEditLog prop if needed for editing functionality
}

export default function LogViewer({ logs, onDeleteLog }: LogViewerProps) {
  const exercisesMap = React.useMemo(() => {
    const allExercises = getExercises();
    const map = new Map<string, Exercise>();
    allExercises.forEach(ex => map.set(ex.id, ex));
    return map;
  }, []);

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle>Workout History</CardTitle>
      </CardHeader>
      <ScrollArea className="h-96 px-4">
        <CardContent className="space-y-6 py-4">
          {logs.length === 0 ? (
            <p className="text-center text-gray-500">No workout logs for this date yet.</p>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-lg capitalize">
                    {new Date(log.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <div className="flex space-x-2">
                    {/* Add Edit button here if editing is implemented */}
                    {onDeleteLog && (
                      <Button variant="destructive" size="sm" onClick={() => onDeleteLog(log.id)}>
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
                <div className="space-y-3 pl-4 border-l-2 border-gray-200">
                  {log.exercises.map((workoutExercise, index) => {
                    const exercise = exercisesMap.get(workoutExercise.exerciseId);
                    const exerciseName = exercise ? exercise.name : 'Unknown Exercise';
                    const exerciseType = exercise ? exercise.type : '';

                    return (
                      <div key={workoutExercise.exerciseId + '-' + index} className="text-sm">
                        <p className="font-medium capitalize">{exerciseName} ({exerciseType})</p>
                        <ul className="list-disc ml-5">
                          {workoutExercise.sets !== undefined && <li>Sets: {workoutExercise.sets}</li>}
                          {workoutExercise.reps !== undefined && <li>Reps: {workoutExercise.reps}</li>}
                          {workoutExercise.weight !== undefined && <li>Weight: {workoutExercise.weight} kg</li>}
                          {workoutExercise.duration && <li>Duration: {workoutExercise.duration}</li>}
                          {workoutExercise.distance && <li>Distance: {workoutExercise.distance}</li>}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </ScrollArea>
      <CardFooter>
        <p className="text-sm text-gray-500">Total sessions logged: {logs.length}</p>
      </CardFooter>
    </Card>
  );
}
