 
import { useQuery } from "@tanstack/react-query";
import { Grid } from "../elements/grid";
import { repository } from "@/repositories";
import { useMemo, useState } from "react";

export function Favorites() {
    const [cursor] = useState('')
    const [limit] = useState(40)
    const [orientation] = useState("asc")

     const { data, isLoading } = useQuery({
        queryKey: ['favorites', cursor, limit, orientation],
        queryFn: async () => repository.word.getFavorites({ 
            cursor: cursor,
            limit: Number(limit),
            orientation: orientation as 'asc' | 'desc',
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