import { TransWithSalaryOrFee } from "@/features/transactions/types/transaction";

export function getlatestSemNo(payHistory: TransWithSalaryOrFee[]) {
  let lastSem = 0;
  if (!payHistory || payHistory.length === 0) {
    return lastSem + 1;
  } else {
    payHistory.forEach((item) => {
      if (item.tutionFee?.semNo! > lastSem) {
        lastSem = item.tutionFee?.semNo!;
      }
    });

    return lastSem + 1;
  }
}
