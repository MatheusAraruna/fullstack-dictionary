import { Skeleton } from "@/components/skeleton";
import { cn } from "@/utils/cn";

export function DictionarySkeleton({ className }: { className?: string }) {
    return (
        <div className={cn("flex flex-col gap-4", className)}>
            <Skeleton className="h-52" />
            <Skeleton className="h-14" />
            <Skeleton className="h-20" />
            <Skeleton className="h-10" />
        </div>
    )
}