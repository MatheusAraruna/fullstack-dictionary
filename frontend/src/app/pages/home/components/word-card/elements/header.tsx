import { cn } from "@/utils/cn";
import { Heart } from "lucide-react";

interface HeaderProps {
    word: string;
    phonetic: string;
    favorite: boolean;
    setFavorite: (value: boolean) => void;
}

export function Header({ word, phonetic, favorite, setFavorite }: HeaderProps) {
    return (
        <div className="relative bg-purple-200 text-center min-h-[200px] flex flex-col justify-center border border-neutral-800 rounded-sm">
            <button type="button" className="absolute top-4 right-4 cursor-pointer" onClick={() => setFavorite(!favorite)}>
                <Heart 
                    fill={favorite ? "red" : "none"} 
                    className={cn(favorite  ? "text-red-500" : "text-neutral-500")} 
                />
            </button>
            <div className="text-2xl font-semibold text-gray-800 mb-2">{word}</div>
            <div className="text-lg text-gray-600">{phonetic}</div>
        </div>
    )
}