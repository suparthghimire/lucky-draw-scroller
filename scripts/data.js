const users = Array.from({ length: 500 }).map((_, i) => ({
  name: `John ${i}`,
  id: i,
}));

export { users };
