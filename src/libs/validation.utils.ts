import AppValidation from "./api-validation";

export const validateSkipAndTake = (skipValue: number, takeValue: number) => {
  const isSkipValid = Number.isInteger(skipValue) && skipValue >= 0;
  const isTakeValid = Number.isInteger(takeValue) && takeValue >= 0;
  if (!(isSkipValid && isTakeValid)) {
    throw new AppValidation('Skip and Take values should be positive integers.', 400);
  }
};