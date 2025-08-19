import { useQuery } from "@tanstack/react-query";
import { Grid } from "../elements/grid";
import { repository } from "@/repositories";
import { useMemo } from "react";

export function History() {
    const { data, isLoading } = useQuery({
        queryKey: ['history'],
        queryFn: async () => repository.word.getHistory({
            limit: 20,
            order: 'asc',
            page: 1,
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