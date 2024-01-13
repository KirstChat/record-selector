import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Record from './components/Record';

const App = () => {
    const [numberOfRecords, setNumberOfRecords] = useState([]);
    const [records, setRecords] = useState([]);
    const [record, setRecord] = useState(null);

    const url =
        'https://api.discogs.com/users/kirstchat94/collection/folders/6181866/releases';

    const getRecords = async () => {
        try {
            const response = await axios.get(
                `${url}?token=IWRkFktpVyJvDIyoBFhoRqVtpmubbsWoQnholghN&per_page=100`
            );
            setNumberOfRecords(response.data.pagination.items);
            setRecords(response.data.releases);
        } catch (error) {
            console.error(error);
        }
    };

    /**
     * Random record handler
     */
    const randomRecord = () => {
        const randomNumber = Math.floor(Math.random() * numberOfRecords);
        // const numbers = [...Array(numberOfRecords).keys()];
        // console.log('numbers:', numbers);

        setRecord(records[randomNumber]);
    };

    /**
     * Rest generator handler
     */
    const resetGenerator = () => {
        setRecord(null);
    };

    /**
     * Fetch records on load
     */
    useEffect(() => {
        getRecords();
    }, []);

    return (
        <Fragment>
            <header>
                <h1 className='font-mono font-bold mb-4 text-xl text-white'>
                    Record Selector
                </h1>
            </header>

            <main className='w-full'>
                {record && <Record record={record} />}

                <section className='flex justify-center gap-x-4'>
                    <button
                        className='border-2 border-sky-600 hover:bg-sky-600 focus:bg-sky-600 hover:text-white focus:text-white text-sky-400 rounded-lg shadow-2xl shadow-sky-950 py-2 px-4'
                        onClick={randomRecord}
                    >
                        Choose My Record
                    </button>
                    <button
                        className='border-2 border-rose-600 hover:bg-rose-600 focus:bg-rose-600 hover:text-white focus:text-white text-rose-400 rounded-lg shadow-2xl shadow-rose-950 py-2 px-4'
                        onClick={resetGenerator}
                    >
                        Reset
                    </button>
                </section>
            </main>

            <footer className='font-mono text-white'>
                <a
                    target='_blank'
                    href='https://icons8.com/icon/DAwVNwdBSasD/vinyl'
                >
                    Vinyl
                </a>{' '}
                icon by{' '}
                <a target='_blank' href='https://icons8.com'>
                    Icons8
                </a>
            </footer>
        </Fragment>
    );
};

export default App;
