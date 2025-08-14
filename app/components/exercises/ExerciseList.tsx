"use client";

import React from 'react';
import { Exercise } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface ExerciseListProps {
  exercises: Exercise[];
  onEdit?: (exercise: Exercise) => void;
  onDelete?: (id: string) => void;
}

export default function ExerciseList({ exercises, onEdit, onDelete }: ExerciseListProps) {
  return (
    <Card className="w-full max-w-lg mx-auto shadow-md">
      <CardHeader>
        <h3 className="text-lg font-semibold">All Exercises</h3>
      </CardHeader>
      <ScrollArea className="h-72 px-4">
        <CardContent className="space-y-4 py-2">
          {exercises.length === 0 ? (
            <p className="text-center text-gray-500">No exercises yet. Add some!</p>
          ) : (
            exercises.map((exercise) => (
              <div key={exercise.id} className="flex items-center justify-between p-3 border rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
                <div>
                  <p className="font-medium capitalize">{exercise.name}</p>
                  <p className="text-sm text-gray-600 capitalize">{exercise.type}</p>
                </div>
                <div className="flex space-x-2">
                  {onEdit && (
                    <Button variant="outline" size="sm" onClick={() => onEdit(exercise)}>
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button variant="destructive" size="sm" onClick={() => onDelete(exercise.id)}>
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </ScrollArea>
      <CardFooter>
        <p className="text-sm text-gray-500">Total exercises: {exercises.length}</p>
      </CardFooter>
    </Card>
  );
}
