const [, , target, ...hours] = process.argv;
let dailyHours: Array<number> = [];

if (!target || hours.length === 0) {
  throw new Error("too few arguments: expects at least 2 numbers, target and exercise hour(s)");
} else {
  if (isNaN(Number(target))) {
    throw new Error("bad argument type: args should be numbers");
  }
  dailyHours = hours.map(h => {
    if (isNaN(Number(h))) {
      throw new Error("bad argument type: hours should be numbers");
    }
    return Number(h);
  });
}

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

  let rating: number = 1;
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

console.log(calculateExercises(dailyHours, Number(target)));
