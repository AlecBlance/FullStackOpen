import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);
  const isValid: boolean = !isNaN(height) && !isNaN(weight);

  if (!(isValid && height && weight))
    return res.json({ error: "malformatted parameters" });

  return res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight),
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!(daily_exercises && target && daily_exercises.length)) {
    return res.json({
      error: "parameters missing",
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  if (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    daily_exercises.some((i: number) => isNaN(Number(i))) ||
    isNaN(Number(target))
  ) {
    return res.json({ error: "malformatted parameters" });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return res.json(calculateExercises(daily_exercises, target));
});

app.listen(3002, () => {
  console.log("server running in http://localhost:3000");
});
