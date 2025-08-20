import { useRef, useEffect, useState } from "react";

export function Audio({ url }: { url: string }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [src, setSrc] = useState<string | undefined>(undefined);

    useEffect(() => {
        let observer: IntersectionObserver | null = null;
        if (audioRef.current) {
            observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        setSrc(url);
                        observer?.disconnect();
                    }
                },
                { threshold: 0.1 }
            );
            observer.observe(audioRef.current);
        }
        return () => observer?.disconnect();
    }, [url]);

    return (
        <audio controls className="w-full" ref={audioRef}>
            {src && <source src={src} type="audio/mpeg" />}
        </audio>
    );
}