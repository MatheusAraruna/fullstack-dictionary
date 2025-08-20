import { cn } from "@/utils/cn";

export function NoContent({ className }: { className?: string }) {
    return (
        <div className={cn("flex flex-col gap-6", className)}>
             <div className="relative bg-purple-200 text-center min-h-[200px] flex justify-center items-center border border-neutral-800 rounded-sm">
                <span className="text-sm w-48 text-center font-medium">No content</span>
            </div>
        </div>
    );
}