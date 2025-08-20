import { useQuery } from "@tanstack/react-query";
import { Grid } from "../elements/grid";
import { repository } from "@/repositories";
import { useMemo, useState } from "react";

export function History() {
    const [page] = useState(1)
    const [limit] = useState(40)
    const [order] = useState("desc")

    const { data, isLoading } = useQuery({
        queryKey: ['history', page, limit, order],
        queryFn: async () => repository.word.getHistory({
            limit: Number(limit),
            order: order as 'asc' | 'desc',
            page: Number(page),
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