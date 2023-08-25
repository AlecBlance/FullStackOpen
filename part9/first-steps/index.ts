import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);
  const isValid: boolean = !isNaN(height) && !isNaN(weight);

  if (!isValid || !height || !weight)
    return res.json({ error: "malformatted parameters" });

  return res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight),
  });
});

app.listen(3002, () => {
  console.log("server running in http://localhost:3000");
});
