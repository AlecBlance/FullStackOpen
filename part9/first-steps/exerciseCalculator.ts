interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  exerciseRecord: number[],
  target: number
): ExerciseResult => {
  const periodLength: number = exerciseRecord.length;
  const average: number =
    exerciseRecord.reduce((accu, exerciseDay) => accu + exerciseDay, 0) /
    periodLength;
  const trainingDays: number = exerciseRecord.filter(
    (exerciseDay) => exerciseDay !== 0
  ).length;
  const success: boolean = average >= target;

  const getRating = (): number => {
    if (average < target * 0.5) return 1;
    if (average < target) return 2;
    return 3;
  };

  const getDesc = (rating: number): string => {
    if (rating === 1) return "More more more!!!";
    if (rating === 2) return "not too bad but could be better";
    return "You rock!";
  };

  const rating: number = getRating();
  const ratingDescription: string = getDesc(rating);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
