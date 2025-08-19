import { QueryClient, QueryClientProvider  } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


interface ProviderProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProviderProps) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: 1,
                staleTime: 1000 * 60 * 5, // 5 minutes
            },
        },
    })

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}