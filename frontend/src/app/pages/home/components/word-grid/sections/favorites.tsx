 
import { useQuery } from "@tanstack/react-query";
import { Grid } from "../elements/grid";
import { repository } from "@/repositories";
import { useMemo } from "react";

export function Favorites() {
    const { data, isLoading } = useQuery({
        queryKey: ['favorites'],
        queryFn: async () => repository.word.getFavorites({ 
            limit: 20,
            order: 'asc',
            page: 1,
            search: '',
        }),
    })

    const favorites = useMemo(() => {
        if(!data) return []
        console.log(data.results)
        console.log(data)
        return data.results.map((item) => ({
            word: item.word,
            added: new Date(item.added ?? 0),
        }))
    }, [data])

    return (
        <Grid items={favorites} selected="" isLoading={isLoading} />
    )
}