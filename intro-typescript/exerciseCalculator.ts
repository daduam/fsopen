interface ExerciseBreakdown {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: Array<number>, target: number): ExerciseBreakdown => {
  const periodLength = dailyHours.length;
  const totalHours = dailyHours.reduce((tot, h) => tot + h);
  const average = totalHours / periodLength;

  let rating: number =  1;
  let ratingDescription = "Not good at all, my paddy";
  if (average >= target) {
    rating = 3;
    ratingDescription = "Com' on...I trust!!!";
  }
  else if ((average / target) >= 0.5) {
    rating = 2;
    ratingDescription = "Echill, but you go fit do better";
  }

  return {
    periodLength,
    trainingDays: dailyHours.filter(h => h != 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
