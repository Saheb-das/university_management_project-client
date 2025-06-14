import { selectorFamily } from "recoil";
import { allTransactionsAtom } from "./transaction";

export const allTransactionsSelector = selectorFamily({
  key: "allTransactionsSelector",
  get:
    (utrNo?: string) =>
    ({ get }) => {
      const raw = get(allTransactionsAtom);

      if (!raw || raw.length === 0) return;

      if (utrNo) {
        return raw.filter((Item) => Item.utr === utrNo);
      }

      return raw;
    },
});
