import type { Word } from "@/types/entities";
import { Cell } from "./cell";
import { Skeleton } from "@/components/skeleton";

interface GridProps {
    items: Word[];
    selected?: string
    isLoading: boolean
    onClickWord: (word: string) => void
}

export function GridSkeleton() {
    return (
        <div className="overflow-auto p-2 border border-neutral-200 h-[300px] md:h-[400px]">
            <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton key={index} className="p-3.5" showDots />
                ))}
            </div>
        </div>
    )
}

export function Grid({ items, selected, isLoading = false, onClickWord }: GridProps) {
    if(isLoading) return <GridSkeleton />;
    return (
        <div className="overflow-auto p-2 border border-neutral-200 h-[300px] md:h-[400px]">
            <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {items.map((item) => (
                    <Cell 
                        key={`${item.word}-${item.added}`} 
                        word={item.word} 
                        isSelected={item.word === selected} 
                        onClick={() => onClickWord(item.word)}
                    />
                ))}
            </div>
        </div>
    )
}