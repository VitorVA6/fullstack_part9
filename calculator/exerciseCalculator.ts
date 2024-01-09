interface ExercisesData {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (arr: number[], target: number): ExercisesData => {
  const periodLength = arr.length;
  const trainingDays = arr.filter(el => el !== 0).length;
  const average = arr.reduce((acum, current) => current + acum, 0)/periodLength;
  const success = average >= target;
  const normalizedRating = average/target + 1;
  let rating = 0;
  let ratingDescription = '';
  if(normalizedRating >=1 && normalizedRating <= 1.5){
    rating = 1.5;
    ratingDescription = 'Is bad, you need to study more';
  }
  else if(normalizedRating <= 2){
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  }
  else if(normalizedRating <= 2.5){
    rating = 2.5;
    ratingDescription = 'thats good, you reached the target';
  }
  else{
    rating = 3;
    ratingDescription = 'wonderful, you far exceeded the target';
  }

  return {
    rating,
    ratingDescription,
    periodLength,
    trainingDays,
    average,
    success,
    target
  };
};

export default calculateExercises;