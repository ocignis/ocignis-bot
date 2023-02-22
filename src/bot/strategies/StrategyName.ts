export const STRATEGY_NAMES = ['SMA', 'CustomStrategy'] as const;

export type StrategyName = (typeof STRATEGY_NAMES)[number];
