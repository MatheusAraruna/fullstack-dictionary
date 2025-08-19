import { cn } from "@/utils/cn";

interface CellProps {
    word: string;
    isSelected: boolean;
    onClick?: () => void;
}

export function Cell({ word, isSelected, onClick }: CellProps) {
  return (
    <div className={cn(
        "border border-gray-200 rounded-md flex justify-center items-center p-4 bg-gray-50 text-neutral-900", 
        isSelected && 'bg-neutral-900 text-white'
    )} onClick={onClick}>
        {word}
    </div>
  );
}
