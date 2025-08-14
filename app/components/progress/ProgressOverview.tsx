"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { getExercises, getWorkoutLogs } from '@/lib/utils';
import { Exercise, WorkoutLog } from '@/types';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation'; // Assuming Next.js router context, but using react-router-dom here.
// If using react-router-dom, we need to import Link from 'react-router-dom'
import { Link } from 'react-router-dom';

interface ProgressOverviewProps {}

export default function ProgressOverview({}: ProgressOverviewProps) {
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalExercisesLogged, setTotalExercisesLogged] = useState(0);
  const [uniqueExercisesCount, setUniqueExercisesCount] = useState(0);
  // const router = useRouter(); // For Next.js, but we're using react-router-dom

  useEffect(() => {
    const logs = getWorkoutLogs();
    const exercises = getExercises();

    setTotalWorkouts(logs.length);

    let exercisesCount = 0;
    logs.forEach(log => {
      exercisesCount += log.exercises.length;
    });
    setTotalExercisesLogged(exercisesCount);
    setUniqueExercisesCount(exercises.length);
  }, []);

  // Placeholder for more detailed progress views or charts
  // const handleViewDetails = () => {
  //   // Navigate to a detailed progress page
  //   // router.push('/progress/details'); // Next.js router
  //   console.log('Navigate to details');
  // };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle>Progress Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-md bg-gray-50 text-center">
            <p className="text-sm font-medium text-gray-600">Total Workouts</p>
            <p className="text-3xl font-bold">{totalWorkouts}</p>
          </div>
          <div className="p-4 border rounded-md bg-gray-50 text-center">
            <p className="text-sm font-medium text-gray-600">Total Exercises Logged</p>
            <p className="text-3xl font-bold">{totalExercisesLogged}</p>
          </div>
          <div className="p-4 border rounded-md bg-gray-50 text-center">
            <p className="text-sm font-medium text-gray-600">Unique Exercises</p>
            <p className="text-3xl font-bold">{uniqueExercisesCount}</p>
          </div>
        </div>
        
        {/* Placeholder for charts or more detailed stats */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="text-lg font-semibold mb-3">Detailed Progress (Coming Soon)</h4>
          <p className="text-gray-500">Features like personal best tracking, workout trends, and graphical representations will be added here.</p>
          {/* Example button to navigate to a hypothetical detailed page */}
          {/* <Button variant="outline" onClick={handleViewDetails}>View Details</Button> */}
        </div>
      </CardContent>
      <CardFooter>
        {/* Additional summary info or actions can go here */}
      </CardFooter>
    </Card>
  );
}
