interface IApiRes {
  message: string;
  success: boolean;
}

export interface IAdmitsAndCommissions {
  count: number;
  sum: {
    commission: number | null;
  } | null;
}

export interface IPrevFiveYearsStats {
  year: number;
  totalAdmissions: number;
  totalCommission: string;
}

export interface IToppers {
  counsellorId: string;
  name: string;
  totalAdmissions: number;
  totalCommission: string;
}

export interface IAdmitsAndCommissionRes extends IApiRes {
  totalAdmitsAndComs: IAdmitsAndCommissions;
}

export interface IPrevFiveYearsStatsRes extends IApiRes {
  fiveYearsStats: IPrevFiveYearsStats[];
}

export interface IThreeToppersRes extends IApiRes {
  topThree: IToppers[];
}
