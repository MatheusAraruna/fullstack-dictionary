import { useInfiniteQuery } from "@tanstack/react-query";
import { Grid } from "../elements/grid";
import { repository } from "@/repositories";
import { useMemo } from "react";

export function History() {
      const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading
    } = useInfiniteQuery({
        queryKey: ['history'],
        queryFn: async ({ pageParam = '' }) =>
            repository.word.getHistory({
                limit: 40,
                orientation: 'desc',
                cursor: pageParam as string,
            }),
        initialPageParam: '',
        getPreviousPageParam: (firstPage) => firstPage.previous,
        getNextPageParam: (lastPage) => lastPage.next || undefined,
    });

    const history = useMemo(() => {
        if (!data) return []
        const newArray = data.pages.flatMap((page) => page.results);
        return newArray.map((item) => ({
            word: item.word,
            added: new Date(item?.added ?? 0),
        }))
    },[data])

    return (
        <Grid  
            items={history} 
            isLoading={isLoading}
            hasNextPage={hasNextPage}    
            onLoadMore={fetchNextPage}
        />
    )
}