export type PositionType = 'long' | 'short';

type PositionNeutral = {
  status: 'neutral';
};

type PositionOpen = {
  status: 'open';
  // open
  positionType: PositionType;
  entryOrderType: OrderType;
  entryTime: number;
  entryPrice: number;
  entryQuantity: number;
};

export type PositionClosed = {
  status: 'closed';
  // open
  positionType: PositionType;
  entryOrderType: OrderType;
  entryTime: number;
  entryPrice: number;
  entryQuantity: number;
  // close
  exitOrderType: OrderType;
  exitTime: number;
  exitPrice: number;
  exitQuantity: number;
  roiAbsolute: number;
  roiRelative: number;
};

export type Position = PositionNeutral | PositionOpen | PositionClosed;

const ORDER_TYPE = ['MARKET', 'LIMIT'] as const;

export type OrderType = (typeof ORDER_TYPE)[number];
