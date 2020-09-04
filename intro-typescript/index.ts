import express = require("express");
const app = express();

import { calculateBmi } from "./bmiCalculator";

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
  })
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});