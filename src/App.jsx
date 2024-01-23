import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Records from './components/Records';

const App = () => {
    // Create a client
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Records />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;
