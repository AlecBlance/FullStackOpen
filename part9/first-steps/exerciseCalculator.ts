interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  exerciseRecord: number[];
  target: number;
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const exerciseRecord: number[] = args.slice(3).map(Number);
  const target: number = Number(args[2]);

  if (!isNaN(target) && exerciseRecord.every((i) => !isNaN(i))) {
    return {
      target: Number(args[2]),
      exerciseRecord,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

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

try {
  const { target, exerciseRecord } = parseArguments(process.argv);
  console.log(calculateExercises(exerciseRecord, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
