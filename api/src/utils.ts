interface PaginateInput<T> {
  results: Array<T>;
  pageSize: number;
  cursor: string;
}

export let paginateResults = <T>({
  results,
  pageSize,
  cursor,
}: PaginateInput<T>): Array<T> => {
  if (pageSize < 1) return [];
  if (!cursor) return results.slice(0, pageSize);

  const cursorIndex = results.findIndex((item: any) => {
    return item.cursor ? cursor === item.cursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // avoid overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize)
        )
    : results.slice(0, pageSize);
};
