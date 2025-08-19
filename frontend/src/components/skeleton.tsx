import { cn } from "@/utils/cn";

const Dot = ({ animationDelay }: { animationDelay: string }) =>  <span 
    className="inline-block w-2 h-2 mx-0.5 bg-gray-400 rounded-full animate-bounce" 
    style={{ animationDelay }} 
/>

interface SkeletonProps {
    className?: string;
    showDots?: boolean;
}

export function Skeleton({ showDots, className }: SkeletonProps) {
    return <div className={cn('animate-pulse bg-gray-200 rounded flex justify-center items-center', className)}>
        { showDots && <>
            <Dot animationDelay="0s" />
            <Dot animationDelay="0.2s" />
            <Dot animationDelay="0.4s" />
        </>}
    </div>;
}