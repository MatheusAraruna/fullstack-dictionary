import { cn } from "@/utils/cn";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { repository } from "@/repositories";
import type { Dictionary, DictionaryEntry } from "@/types/entities";
import { Audio } from "./elements/audio";
import { Header } from "./elements/header";
import { Meanings } from "./elements/meanings";
import { Controls } from "./elements/controls";
import { useSearchParams } from "react-router";
import { DictionarySkeleton } from "./elements/skeleton";

export function WordCard({ className }: { className?: string}) {
    const [searchParams] = useSearchParams();
    const word = searchParams.get('word') || ""; 

    const { data, isLoading } = useQuery<Dictionary | null>({
        queryKey: ['dictionary', word],
        queryFn: async () => {
            const result = await repository.word.getDictionary({ word });
            return result ?? null;
        },
        enabled: word !== ""
    });

    const dictionary = useMemo(() => {
        if (!data || !Array.isArray(data.dictionary)) return null;
        return data.dictionary[0] as DictionaryEntry;
    }, [data]);

    const phoneticAudio = dictionary?.phonetics.find(p => p.audio)?.audio || "";
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
                    favorited={data?.favorited ?? false} />
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