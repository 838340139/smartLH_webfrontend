// 用于延迟执行，如果重复调用wait则放弃执行之前的fun
// eslint-disable-next-line import/prefer-default-export
export const generateDelay = (time: number) => {
  const delay = {
    wait: async (fun: () => void) => {
      delay.index += 1;
      const current = delay.index;
      await setTimeout(() => {
        if (current === delay.index) {
          fun();
        }
      }, time);
    },
    index: 0,
  };
  return delay;
};
