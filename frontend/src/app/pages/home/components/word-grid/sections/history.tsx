import { useQuery } from "@tanstack/react-query";
import { Grid } from "../elements/grid";
import { repository } from "@/repositories";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { useParams } from "@/hooks/useParams";

export function History() {
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
        queryKey: ['history', page, limit, order],
        queryFn: async () => repository.word.getHistory({
            limit: Number(limit),
            order: order as 'asc' | 'desc',
            page: Number(page),
            search: '',
        })
    })

    const history = useMemo(() => {
        if(!data) return []

        return data.results.map((item) => ({
            word: item.word,
            added: new Date(item?.added ?? 0),
        }))
    }, [data])

    return (
        <Grid items={history} selected=""  isLoading={isLoading} />
    )
}