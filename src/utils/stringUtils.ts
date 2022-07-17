// eslint-disable-next-line import/prefer-default-export,consistent-return
export const cutString = (s: string, len: number) => {
  if (!s) return s;
  if (s.length <= len) return `${s}`;
  return `${s.substring(0, len-3)}...`;
};

export const getEditorText = (value: string) => {
  value = value.replace(/\s*/g, ''); // 去掉空格
  value = value.replace(/<[^>]+>/g, ''); // 去掉所有的html标记
  value = value.replace(/↵/g, ''); // 去掉所有的↵符号
  value = value.replace(/[\r\n]/g, ''); // 去掉回车换行
  value = value.replace(/&nbsp;/g, ''); // 去掉空格
  return value;
};

export const isString = (val: any) => {
  console.log(typeof val)
  console.log(typeof val === 'string')
  return typeof val === 'string';
}
