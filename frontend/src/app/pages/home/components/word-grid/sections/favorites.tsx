 
import { useQuery } from "@tanstack/react-query";
import { Grid } from "../elements/grid";
import { repository } from "@/repositories";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { useParams } from "@/hooks/useParams";

export function Favorites() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [page] = useParams({
        initialValue: "1",
        paramName: 'page',
        searchParams,
        setSearchParams,
        type: 'string',
    })

    const [limit] = useParams({
        initialValue: "40",
        paramName: 'limit',
        searchParams,
        setSearchParams,
        type: 'string',
    })

    const [order] = useParams({
        initialValue: "asc",
        paramName: 'order',
        searchParams,
        setSearchParams,
        type: 'string',
    })

     const { data, isLoading } = useQuery({
        queryKey: ['favorites', page, limit, order],
        queryFn: async () => repository.word.getFavorites({ 
            page: Number(page),
            limit: Number(limit),
            order: order as 'asc' | 'desc',
            search: '',
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