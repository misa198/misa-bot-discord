export const formatTimeRange = (timeRange: number): string => {
  const hours = Math.floor(timeRange / 60);
  const mins = timeRange - hours * 60;

  return `${hours < 10 ? "0" + hours : hours}:${mins < 10 ? "0" + mins : mins}`;
};
