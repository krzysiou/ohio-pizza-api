export const randomString = (n: number) =>
  [...Array(n)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
