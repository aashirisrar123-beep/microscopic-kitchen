"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Exercise } from '@/types';
import { addExercise, updateExercise } from '@/lib/utils';

interface ExerciseFormProps {
  initialExercise?: Exercise | null;
  onAddExercise?: (exercise: Exercise) => void;
  onUpdateExercise?: (exercise: Exercise) => void;
  onCancelEdit?: () => void; // Callback to close the edit form/modal
}

export default function ExerciseForm({ initialExercise, onAddExercise, onUpdateExercise, onCancelEdit }: ExerciseFormProps) {
  const [name, setName] = useState(initialExercise?.name ?? '');
  const [type, setType] = useState<'Strength' | 'Cardio' | 'Bodyweight'>(initialExercise?.type ?? 'Strength');
  const [error, setError] = useState('');

  const isEditing = !!initialExercise;

  useEffect(() => {
    if (initialExercise) {
      setName(initialExercise.name);
      setType(initialExercise.type);
    } else {
      // Reset form for adding new exercise
      setName('');
      setType('Strength');
    }
  }, [initialExercise]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Exercise name cannot be empty.');
      return;
    }
    setError('');

    if (isEditing && initialExercise) {
      const updatedExercise = { ...initialExercise, name, type };
      updateExercise(updatedExercise);
      if (onUpdateExercise) {
        onUpdateExercise(updatedExercise);
      }
    } else {
      const newExercise = addExercise({ name, type });
      if (onAddExercise) {
        onAddExercise(newExercise);
      }
      setName('');
      setType('Strength');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md shadow-sm mb-6">
      <h3 className="text-lg font-semibold">{isEditing ? 'Edit Exercise' : 'Add New Exercise'}</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="exercise-name">Name</Label>
          <Input
            id="exercise-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Bench Press"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="exercise-type">Type</Label>
          <Select value={type} onValueChange={setType as any}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Strength">Strength</SelectItem>
              <SelectItem value="Cardio">Cardio</SelectItem>
              <SelectItem value="Bodyweight">Bodyweight</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end space-x-2">
          <Button type="submit" className="w-full">
            {isEditing ? 'Update Exercise' : 'Add Exercise'}
          </Button>
          {isEditing && onCancelEdit && (
            <Button type="button" variant="outline" onClick={onCancelEdit} className="w-full">
              Cancel
            </Button>
          )}
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
}
