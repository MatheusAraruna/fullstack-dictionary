 
import { useQuery } from "@tanstack/react-query";
import { Grid } from "../elements/grid";
import { repository } from "@/repositories";
import { useMemo, useState } from "react";

export function Favorites() {
    const [page] = useState(1)
    const [limit] = useState(40)
    const [order] = useState("asc")

     const { data, isLoading } = useQuery({
        queryKey: ['favorites', page, limit, order],
        queryFn: async () => repository.word.getFavorites({ 
            page: Number(page),
            limit: Number(limit),
            order: order as 'asc' | 'desc',
        }),
    })
    
    const favorites = useMemo(() => {
        if(!data) return []
        return data.results.map((item) => ({
            word: item.word,
            added: new Date(item.added ?? 0),
        }))
    }, [data])

    return (
        <Grid items={favorites} selected="" isLoading={isLoading} />
    )
}