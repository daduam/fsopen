export const parseArguments = (args: Array<string>): void => {
  if (args.length < 4) {
    throw new Error("too few arguments: expects two args, height(cm) and weight(kg)");
  } else if (args.length > 4) {
    throw new Error("too many arguments: expects two args, height(cm) and weight(kg)");
  } else if (isNaN(Number(args[2]))) {
    throw new Error(`height ${args[2]} must be a number`);
  } else if (isNaN(Number(args[3]))) {
    throw new Error(`weight ${args[3]} must be a number`);
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / ((height / 100) ** 2);

  if (bmi < 15) {
    return "Very severely underweight";
  } else if (bmi < 16) {
    return "Severely underweight";
  } else if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal (healthy weight)";
  } else if (bmi < 30) {
    return "Overweight";
  } else if (bmi < 35) {
    return "Obese Class I (Moderately obese)";
  } else if (bmi < 40) {
    return "Obese Class II (Severely obese)";
  } else {
    return "Obese Class III (Very severely obese)";
  }
};
