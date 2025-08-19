import { WordGrid } from "./components/word-grid";
import { WordCard } from "./components/word-card";

export function HomePage() {
    return (
        <div className="w-full h-full flex flex-col gap-8 p-8 md:flex-row md:max-w-7xl">
            <WordCard className="flex-1 md:max-w-[400px]" />
            <WordGrid className="flex-1" />
        </div>
    )
}