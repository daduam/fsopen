import express = require("express");
const app = express();

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (isNaN(weight) || isNaN(height) || weight === 0 || height === 0) {
    return res.json({ error: "malformatted parameters" });
  }

  return res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!req.body || !req.body.daily_exercises || !req.body.target) {
    return res.json({ error: "parameters missing" });
  } else {
    const hasNaN = req.body.daily_exercises.map((h: string) => Number(h)).includes(NaN);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (hasNaN || isNaN(Number(req.body.target))) {
      return res.json({ error: "malformatted parameters" });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const result = calculateExercises(req.body.daily_exercises, req.body.target);

  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});