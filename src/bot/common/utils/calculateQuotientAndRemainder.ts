type CalculateQuotientAndRemainderParams = {
  dividend: number;
  divisor: number;
};
type CalculateQuotientAndRemainderReturn = {
  quotient: number;
  remainder: number;
};

export const calculateQuotientAndRemainder = ({
  dividend,
  divisor,
}: CalculateQuotientAndRemainderParams): CalculateQuotientAndRemainderReturn => {
  const quotient = Math.floor(dividend / divisor);
  const remainder = dividend % divisor;

  return {
    quotient,
    remainder,
  };
};
