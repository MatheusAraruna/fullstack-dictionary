 
import { useInfiniteQuery } from "@tanstack/react-query";
import { Grid } from "../elements/grid";
import { repository } from "@/repositories";
import { useMemo } from "react";

export function Favorites() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading
    } = useInfiniteQuery({
        queryKey: ['favorites'],
        queryFn: async ({ pageParam = '' }) =>
            repository.word.getFavorites({
                limit: 40,
                orientation: 'desc',
                cursor: pageParam as string,
            }),
        initialPageParam: '',
        getPreviousPageParam: (firstPage) => firstPage.previous,
        getNextPageParam: (lastPage) => lastPage.next || undefined,
    });



    const favorites = useMemo(() => {
        if (!data) return []
        const newArray = data.pages.flatMap((page) => page.results);
        return newArray.map((item) => ({
            word: item.word,
            added: new Date(item?.added ?? 0),
        }))
    },[data])

    return (
        <Grid
            items={favorites} 
            isLoading={isLoading} 
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage}
        />
    )
}