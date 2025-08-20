import { repository } from "@/repositories";
import { cn } from "@/utils/cn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";

interface HeaderProps {
    word: string;
    phonetic: string;
    favorited: boolean;
}

export function Header({ word, phonetic, favorited }: HeaderProps) {
    const queryClient = useQueryClient();
    
    const mutation = useMutation({
        mutationFn: async (isFavorite: boolean) => {
            if (!isFavorite) {
                return await repository.word.favorite({ word });
            }
            return await repository.word.unfavorite({ word });
        },
        onSuccess: async () => {
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['dictionary'] }),
                queryClient.invalidateQueries({ queryKey: ['favorites'] }),
            ])
        },
    });

    const handleFavoriteClick = () => {
        mutation.mutate(favorited);
    };

    return (
        <div className="relative bg-purple-200 text-center min-h-[200px] flex flex-col justify-center border border-neutral-800 rounded-sm">
            <button type="button" className="absolute top-4 right-4 cursor-pointer" onClick={handleFavoriteClick}>
                <Heart 
                    fill={favorited ? "red" : "none"} 
                    className={cn(favorited  ? "text-red-500" : "text-neutral-500")} 
                />
            </button>
            <div className="text-2xl font-semibold text-gray-800 mb-2">{word}</div>
            <div className="text-lg text-gray-600">{phonetic}</div>
        </div>
    )
}