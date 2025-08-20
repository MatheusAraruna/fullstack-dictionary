/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useInfinitePosts.ts
import { repository } from '@/repositories'
import type { PaginationMeta } from '@/types/api'
import { useInfiniteQuery } from '@tanstack/react-query'


interface UseInfiniteProps {
  keys: any[]
  fetch: (params: any) => Promise<any>
}

export function useInfiniteScroll({ keys, fetch }: UseInfiniteProps) {
  const aa = useInfiniteQuery<PaginationMeta, Error>({
    queryKey: keys,
    queryFn: (params) => fetch(params),
    getNextPageParam: (lastPage) => lastPage.next,
    getPreviousPageParam: (firstPage) => firstPage.previous,
    initialPageParam: 1,
  })
  
  if(!aa.isLoading) {
    console.log(aa.data)
  }

  return aa
}



export function useInfiniteWords() {
  const infinite = useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: async ({ pageParam = '' }) =>
      repository.word.getWordList({
        limit: 40,
        orientation: 'asc',
        cursor: pageParam, // assuming your API uses a cursor or similar param
      }),
    initialPageParam: '',
    getPreviousPageParam: (firstPage) => firstPage.previous,
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  });

  return {
    data: infinite.data,
    error: infinite.error,
    fetchNextPage: infinite.fetchNextPage,
    hasNextPage: infinite.hasNextPage,
    isFetching: infinite.isFetching,
    isFetchingNextPage: infinite.isFetchingNextPage,
    status: infinite.status,
  };
}
