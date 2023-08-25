interface BmiValue {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): BmiValue => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  const height: number = Number(args[2]);
  const weight: number = Number(args[3]);

  if (!isNaN(height) && !isNaN(weight)) {
    return {
      height,
      weight,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = (weight / height / height) * 10000;
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal (healthy weight)";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
