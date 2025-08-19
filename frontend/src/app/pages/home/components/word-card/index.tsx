import { Heart } from "lucide-react";
import { Button } from "@/components/button";
import { cn } from "@/utils/cn";

export function WordCard({ className }: { className?: string}) {
    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <div className="relative bg-purple-200 text-center min-h-[200px] flex flex-col justify-center border border-neutral-800 rounded-sm">
                <button type="button" className="absolute top-4 right-4">
                    <Heart /> 
                </button>
                <div className="text-2xl font-semibold text-gray-800 mb-2">Word english</div>
                <div className="text-lg text-gray-600">tradução</div>
            </div>

            <div className="flex items-center gap-2">
                <audio controls className="w-full">
                    <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
            </div>

            <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">Meanings</h3>
                <p className="text-md text-gray-600">meaning</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outlined" size="md" onClick={() => {}} className="flex-1 bg-transparent">
                Voltar
              </Button>
              <Button variant="outlined" size="md" onClick={() => {}} className="flex-1 bg-transparent">
                Próximo
              </Button>
            </div>
        </div> 
    )
}