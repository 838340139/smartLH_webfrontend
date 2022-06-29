// eslint-disable-next-line import/prefer-default-export
export const periodDate = (from: string, to: string, interval: number) => {
  const fromDate = new Date(from);
  const toDate = new Date(to);
  const date = new Date(from);
  const res: string[] = [];
  for (
    let i = 1;
    date.toLocaleDateString() <= toDate.toLocaleDateString();
    i += interval
  ) {
    res.push(date.toLocaleDateString());
    date.setDate(fromDate.getDate() + i);
  }
  return res;
};
