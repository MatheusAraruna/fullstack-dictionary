import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { Grid } from "../elements/grid"
import { repository } from "@/repositories"
import { useMemo } from "react"
import { useSearchParams } from "react-router";
import { useParams } from "@/hooks/useParams";

export function Wordlist() {
    const queryClient = useQueryClient()
    const [searchParams, setSearchParams] = useSearchParams();

    const [word, setWord] = useParams({
        initialValue: "",
        paramName: 'word',
        searchParams,
        setSearchParams,
        type: 'string',
    })

    const [cursor] = useParams({
        initialValue: "",
        paramName: 'cursor',
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

    const [orientation] = useParams({
        initialValue: "asc",
        paramName: 'orientation',
        searchParams,
        setSearchParams,
        type: 'string',
    })

    const {
        data,
 //       fetchNextPage,
 //       hasNextPage,
 //       isFetchingNextPage,
        isLoading
    } = useInfiniteQuery({
        queryKey: ['projects'],
        queryFn: async ({ pageParam = cursor }) =>
            repository.word.getWordList({
                limit: Number(limit),
                orientation: orientation as 'asc' | 'desc',
                cursor: pageParam as string,
            }),
        initialPageParam: cursor, // set initialPageParam from query param
        getPreviousPageParam: (firstPage) => firstPage.previous,
        getNextPageParam: (lastPage) => lastPage.next || undefined,
    });

    const handleClickWord = (word: string) => {
        setWord(word);
        queryClient.invalidateQueries({ queryKey: ['history'] })
    }

    const wordListt = useMemo(() => {
        if (!data) return []
        const newArray = data.pages.flatMap((page) => page.results);
        return newArray.map((item) => ({
            word: item
        }))
    },[data])

    return (
       <>
        <Grid 
            items={wordListt} 
            selected={word as string} 
            isLoading={isLoading} 
            onClickWord={handleClickWord} />
       </>
    )
}