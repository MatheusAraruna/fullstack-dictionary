import { useQuery } from "@tanstack/react-query"
import { Grid } from "../elements/grid"
import { repository } from "@/repositories"
import { useMemo } from "react"
import { useSearchParams } from "react-router";

export function Wordlist() {
    const [searchParams, setSearchParams] = useSearchParams();
    const queries =  Object.fromEntries(searchParams.entries());   

    const { data, isLoading } = useQuery({
        queryKey: ['wordlist'],
        queryFn: async () => repository.word.getWordList({
            limit: 40,
            order: 'asc',
            page: 1,
            search: ''
        }),
    })

    const wordList = useMemo(() => {
        if (!data) return []
        console.log(data)
        return data.results.map((item) => ({
            word: item
        }))
    },[data])


    const handleClickWord = (word: string) => {
        setSearchParams({ word });
    }

    return (
        <Grid 
            items={wordList} 
            selected={queries.word} 
            isLoading={isLoading} 
            onClickWord={handleClickWord} />
    )
}