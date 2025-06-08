import { IAttendCount } from "@/features/attendance/types/attendance";

interface IPrevFiveYearsStats {
  year: number;
  totalAdmissions: number;
  totalCommission: string;
}

export function getAdmissionGrowthPercentage(
  stats: IPrevFiveYearsStats[]
): string | number | null {
  if (stats.length === 1) return "Present Year";
  if (stats.length < 2) return null;

  const last = stats[stats.length - 1];
  const prev = stats[stats.length - 2];

  if (prev.totalAdmissions === 0) return null;

  const growth =
    ((last.totalAdmissions - prev.totalAdmissions) / prev.totalAdmissions) *
    100;
  return `${+growth.toFixed(2)}% from last year`;
}

export function getCommissionGrowthPercentage(
  stats: IPrevFiveYearsStats[]
): string | number | null {
  if (stats.length === 1) return "Present Year";
  if (stats.length < 2) return null;

  const last = Number(stats[stats.length - 1].totalCommission);
  const prev = Number(stats[stats.length - 2].totalCommission);

  if (prev === 0) return null;

  const growth = ((last - prev) / prev) * 100;
  return `${+growth.toFixed(2)}% from last year`;
}

export function calculateGrowth(stats: IPrevFiveYearsStats[]) {
  const prevInfo = stats[stats.length - 2];
  const presentInfo = stats[stats.length - 1];

  let previous = 0;
  let present = 0;

  if (prevInfo) {
    previous = prevInfo.totalAdmissions;
  }

  if (presentInfo) {
    present = presentInfo.totalAdmissions;
  }

  if (previous === 0) {
    return (present - previous).toFixed(2) + "%";
  }

  const growth = ((present - previous) / previous) * 100;
  return growth.toFixed(2) + "%";
}

export function calcAttendance(data: IAttendCount): string {
  const { total, present } = data;

  if (total === undefined) return "";

  if (total === 0) return "class not started";

  return String(((present % total) * 100).toFixed(2));
}
