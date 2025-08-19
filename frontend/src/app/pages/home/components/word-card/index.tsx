import { cn } from "@/utils/cn";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { repository } from "@/repositories";
import type { Dictionary } from "@/types/entities";
import { Audio } from "./elements/audio";
import { Header } from "./elements/header";
import { Meanings } from "./elements/meanings";
import { Controls } from "./elements/controls";
import { useSearchParams } from "react-router";
import { DictionarySkeleton } from "./elements/skeleton";

export function WordCard({ className }: { className?: string}) {
    const [searchParams] = useSearchParams();
    const queries =  Object.fromEntries(searchParams.entries());   

    const [favorite, setFavorite] = useState(false);
    const { data, isLoading } = useQuery({
        queryKey: ['dictionary', queries.word],
        queryFn: async () => repository.word.getTranslation({ word: queries.word }),
        enabled: queries.word !== undefined
    });

    const dictionary: Dictionary | undefined = useMemo(() => {
        if (!data) return undefined;
        return data;
    }, [data]);

    const phoneticAudio = dictionary?.phonetics[0]?.audio || "";
    const meanings = dictionary?.meanings || [];

    if (isLoading) {
        return <DictionarySkeleton className={className} />
    }

    return (
        <div className={cn("flex flex-col gap-6", className)}>
        { dictionary ? (
            <>
                <Header 
                    word={dictionary?.word ?? '-'} 
                    phonetic={dictionary?.phonetic ?? '-'} 
                    favorite={favorite} 
                    setFavorite={setFavorite} />
                <Audio url={phoneticAudio} />
                <Meanings meanings={meanings} />
                <Controls />
            </>
        ) : (
            <div className="relative bg-purple-200 text-center min-h-[200px] flex justify-center items-center border border-neutral-800 rounded-sm">
                <span className="text-sm w-48 text-center font-medium">No content</span>
            </div>
        )}
        </div>
    )
}