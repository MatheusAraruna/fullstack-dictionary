export function preparePaginate(page: number = 1, take: number = 10) {
  const skip = page ? (page - 1) * take : 0;
  return {
    skip: Number(skip),
    take: Number(take),
  };
}

type PaginateProps<T> = {
  data: T[];
  page: number;
  take: number;
  total: number;
};

export function paginate<T>({ data, page, take, total }: PaginateProps<T>) {
  const totalPages = Math.ceil(total / take);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return {
    results: data,
    total,
    page: Number(page) || 1,
    totalPages: Math.ceil(total / take),
    hasNext,
    hasPrev,
  };
}
