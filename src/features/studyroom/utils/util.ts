import { IAsignWithBatch } from "@/features/asign-teacher/types/asign-teacher";

export function getUniqueAsignBatch(
  data: IAsignWithBatch[]
): IAsignWithBatch[] {
  const batchMap = new Map();
  data &&
    data.forEach((item) => {
      if (!batchMap.has(item.batchId)) {
        batchMap.set(item.batchId, item);
      }
    });

  return Array.from(batchMap.values());
}
