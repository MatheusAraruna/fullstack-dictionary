import { cn } from "@/utils/cn";

interface CellProps {
    word: string;
    isSelected: boolean;
    onClick?: () => void;
}

export function Cell({ word, isSelected, onClick }: CellProps) {
  return (
    <div className={cn(
        "border border-gray-200 rounded-sm flex justify-center items-center p-2 text-sm font-medium bg-gray-50 text-neutral-900", 
        isSelected && 'bg-neutral-900 text-white'
    )} onClick={onClick}>
        {word}
    </div>
  );
}
