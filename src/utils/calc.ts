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

/**
 *  calculate late fine
 */
const semTime = {
  odd: "31-12",
  even: "30-06",
};

// Helper to count non-Sunday days between two dates
function countLateDays(from: Date, to: Date) {
  let count = 0;
  let current = new Date(from);

  while (current <= to) {
    const day = current.getDay();
    if (day !== 0) count++; // 0 = Sunday
    current.setDate(current.getDate() + 1);
  }

  return count;
}

export function calculateLateFine(semType: "odd" | "even", perDayFine: number) {
  const today = new Date();

  const deadline = getPaymentLastDate(semType);

  // If today is after the deadline, calculate late fine
  if (today > deadline) {
    const lateDays = countLateDays(
      new Date(deadline.getTime() + 86400000),
      today
    ); // Start from next day
    const fine = lateDays * perDayFine;
    return { lateDays, fine };
  } else {
    return { lateDays: 0, fine: 0 };
  }
}

export function getPaymentLastDate(semType: "odd" | "even") {
  const today = new Date();
  const [dd, mm] = semTime[semType].split("-");

  const year =
    semType === "odd"
      ? today.getFullYear() + 1 // next year
      : today.getFullYear(); // current year

  const lastDate = new Date(`${year}-${mm}-${dd}`);
  return lastDate;
}
