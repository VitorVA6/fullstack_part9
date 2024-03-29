const calculateBmi = (height: number, weight: number): string => {
  const bmi = (weight) / Math.pow(height/100, 2);
  if(bmi < 18.5) return 'Underweight';
  else if(bmi <= 24.9) return 'Normal (Healthy weight)';
  else if(bmi <= 29.9) return 'Overweight';
  else return 'Obese';
};

export default calculateBmi;