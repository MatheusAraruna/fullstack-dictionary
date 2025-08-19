import { useQuery } from "@tanstack/react-query"
import { Grid } from "../elements/grid"
import { repository } from "@/repositories"
import { useMemo } from "react"
import { useSearchParams } from "react-router";
import { useParams } from "@/hooks/useParams";

export function Wordlist() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [word, setWord] = useParams({
        initialValue: "",
        paramName: 'word',
        searchParams,
        setSearchParams,
        type: 'string',
    })

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
        queryKey: ['wordlist', page, limit, order],
        queryFn: async () => repository.word.getWordList({
            limit: Number(limit),
            page: Number(page),
            order: order as 'asc' | 'desc',
            search: ''
        }),
    })

    const wordList = useMemo(() => {
        if (!data) return []
        return data.results.map((item) => ({
            word: item
        }))
    },[data])


    const handleClickWord = (word: string) => {
        setWord(word);
    }

    return (
        <Grid 
            items={wordList} 
            selected={word as string} 
            isLoading={isLoading} 
            onClickWord={handleClickWord} />
    )
}