type CalculateRoiParams = {
  startValue: number;
  endValue: number;
};
type CalculateRoiReturn = {
  absolute: number;
  relative: number;
};

export const calculateRoi = ({ startValue, endValue }: CalculateRoiParams): CalculateRoiReturn => {
  const absoluteProfit = endValue - startValue;
  const relativeProfit = (absoluteProfit / startValue) * 100;

  return {
    absolute: absoluteProfit,
    relative: relativeProfit,
  };
};
