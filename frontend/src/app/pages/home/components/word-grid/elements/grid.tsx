import { Cell } from "./cell";

interface GridProps {
    items: { 
        id: string, 
        word: string 
    }[];
    selected?: string
}

export function Grid({ items, selected }: GridProps) {
    return (
        <div className="overflow-auto p-2 border border-neutral-200 h-[300px] md:h-[400px]">
            <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {items.map((item) => (
                    <Cell 
                        key={item.word} 
                        word={item.word} 
                        isSelected={item.word === selected} 
                    />
                ))}
            </div>
        </div>
    )
}