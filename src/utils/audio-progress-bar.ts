import { formatTimeRange } from "./time";

export const audioProgressBar = (current: number, total: number) => {
  let result = "";
  result = result.concat(formatTimeRange(current) + " ");
  const dotPosition = Math.floor((current / total) * 10);
  console.log(current, total);
  for (let i = 0; i < dotPosition; i++) {
    result = result.concat("-");
  }
  result = result.concat("⚈");
  for (let i = dotPosition + 1; i < 20; i++) {
    result = result.concat("-");
  }
  result = result.concat(" " + formatTimeRange(total));
  return result;
};
