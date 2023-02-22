export type GetCoinsBalancesHelperReturn = {
  balance_BUSD: number;
};

export type GetCoinsBalancesHelper = () => Promise<GetCoinsBalancesHelperReturn>;
