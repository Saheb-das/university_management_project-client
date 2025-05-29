interface IApiRes {
  message: string;
  success: boolean;
}

export interface IRevenue {
  id: string;
  year: number;
  amount: number;
  source: string;
  collageId: string;
}

export interface IRevenuesByRangeRes extends IApiRes {
  revenues: IRevenue[];
}
