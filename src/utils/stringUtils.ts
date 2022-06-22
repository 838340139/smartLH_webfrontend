// eslint-disable-next-line import/prefer-default-export,consistent-return
export const cutString = (s: string, len: number) => {
  if (!s) return s;
  if (s.length <= len) return `${s}`;
  return `${s.substring(0, len-3)}...`;
};
