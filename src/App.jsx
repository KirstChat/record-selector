import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FiInfo } from 'react-icons/fi';
import Records from './components/Records';

const App = () => {
    // Create a client
    const queryClient = new QueryClient();

    const [isHidden, setIsHidden] = useState('hidden');

    const infoButtonHandler = () => {
        setIsHidden(isHidden === 'hidden' ? 'visible' : 'hidden');
    };

    return (
        <QueryClientProvider client={queryClient}>
            <header className='text-slate-900 dark:text-white'>
                <img
                    className='block dark:hidden mx-auto size-20'
                    src='images/record-light.png'
                    alt='Image of a record half in a record sleeve.'
                />
                <img
                    className='hidden dark:block mx-auto size-20'
                    src='images/record-dark.png'
                    alt='Image of a record half in a record sleeve.'
                />
                <h1 className='font-mono font-bold mb-4 text-2xl uppercase'>
                    Record Shuffler
                </h1>
            </header>

            <main className='mb-4'>
                <Records />
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </main>

            <footer className='flex font-mono justify-end relative text-slate-900 dark:text-white w-full'>
                <button
                    className='bg-emerald-700 rounded-full p-2 text-xl'
                    onClick={infoButtonHandler}
                >
                    <span className='sr-only'>About Record Shuffler</span>
                    <FiInfo className='aria-hidden text-white' />
                </button>

                <div
                    className={`${isHidden} absolute right-1/2 bottom-full translate-x-1/2 mb-2 text-center text-xs w-full`}
                >
                    <a
                        className='pb-2'
                        href='https://www.flaticon.com/free-icons/record-label'
                        title='record label icons'
                    >
                        Record label icons created by Groovy Icons - Flaticon
                    </a>
                    <br />
                    <p>Developed by Kirsty Chatterton 🤓</p>
                </div>
            </footer>
        </QueryClientProvider>
    );
};

export default App;
