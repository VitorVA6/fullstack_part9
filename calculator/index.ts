import express from "express";
const app = express();
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;
  
  if(isNaN(Number(height)) || isNaN(Number(weight))){
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }
  const heightNumber = Number(height);
  const weightNumber = Number(weight);

  const result = calculateBmi(heightNumber, weightNumber);
  return res.status(200).json({
    weight: weightNumber,
    height: heightNumber,
    bmi: result
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  console.log(daily_exercises, target);

  if(!daily_exercises || !target) return res.status(400).json({
    error: 'parameters missing'
  });

  if(isNaN(Number(target)) || !Array.isArray(daily_exercises)) return res.status(400).json({
    error: 'malformatted parameters'
  });

  const arr: number[] = [];

  for(let i = 0; i<daily_exercises.length; i++){
    if(isNaN(Number(daily_exercises[i]))) return res.status(400).json({
      error: 'malformatted parameters'
    });
    arr.push(Number(daily_exercises[i]));
  }

  const result = calculateExercises(arr, Number(target));

  return res.status(200).json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});