interface ProviderProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProviderProps) {
    return (
        <div>
            {children}
        </div>
    )
}