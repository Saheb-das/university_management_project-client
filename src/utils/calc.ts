interface IStudentGrowth {
  year: number;
  _sum: {
    students: number;
  };
}

export function getTotalStudents(data: IStudentGrowth[]): string {
  const totalStudents = data.reduce((acc, cur) => {
    acc = acc + cur._sum.students;
    return acc;
  }, 0);

  return totalStudents.toString();
}

interface IRevenue {
  year: number;
  id: string;
  amount: number;
  source: string;
  collageId: string;
}
export function getCurYearRevenue(data: IRevenue[]) {
  const totalCurRevenue =
    data.find((item) => item.year === new Date().getFullYear())?.amount || 0;
  return totalCurRevenue.toString();
}

interface IAdmissionByYear {
  year: number;
  admissions: number;
}
export function getAdmissionYearByYear(
  data: IStudentGrowth[]
): IAdmissionByYear[] {
  const result = data
    .map((item) => ({
      year: item.year,
      admissions: item._sum.students,
    }))
    .sort((a, b) => a.year - b.year);
  return result;
}

interface IRevenueByYear {
  year: number;
  revenue: number;
}
export function getRevenueYearByYear(data: IRevenue[]): IRevenueByYear[] {
  const result = data
    .map((item) => ({
      year: item.year,
      revenue: item.amount,
    }))
    .sort((a, b) => a.year - b.year);
  return result || 0;
}
