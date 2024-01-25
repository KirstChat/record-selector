import { Fragment, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../helpers/constants';
import axios from 'axios';
import Record from './Record';
import Button from './Button';

const Records = () => {
    const [records, setRecords] = useState();
    const [randomRecord, setRandomRecord] = useState();
    const [isFirstLoad, setIsFirstLoad] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const userName = import.meta.env.VITE_DISCOGS_USER_NAME;
    const folderId = import.meta.env.VITE_DISCOGS_COLLECITON_FOLDER_ID;
    const token = import.meta.env.VITE_DISCOGS_USER_TOKEN;

    /**
     * Fetch request to Discogs API
     *
     * @returns data
     */
    const fetchRecords = async () => {
        const res = await axios.get(
            `${api}/users/${userName}/collection/folders/${folderId}/releases?token=${token}&per_page=100`
        );

        return res.data;
    };

    /**
     * React Query hook to make fetch request
     */
    const { data, error, isPending } = useQuery({
        queryKey: ['records'],
        queryFn: () => fetchRecords(),
    });

    /**
     * Hook to shuffle records into a random order
     */
    const shuffledRecords = useMemo(() => {
        if (records && records.length > 0) {
            for (let i = records.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [records[i], records[j]] = [records[j], records[i]];
            }
            return records;
        }
    }, [records]);

    /**
     * Click handler to setRandomRecord state
     */
    const randomRecordHandler = () => {
        setRandomRecord(shuffledRecords.shift());
        setIsFirstLoad(false);
        setIsLoading(true);

        // Timeout function to add loader between records
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    /**
     * Click handler to setRecords state when length is <= 0
     */
    const resetRecordsHandler = () => {
        setRecords(structuredClone(data?.releases));
        setRandomRecord(shuffledRecords.shift());
        setIsLoading(true);

        // Timeout function to add loader between records
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    /**
     * Hook to setRecords state when data is available
     * This creates a deep clone of the data
     */
    useEffect(() => {
        setRecords(structuredClone(data?.releases));
        setIsFirstLoad(true);
    }, [data]);

    return (
        <Fragment>
            <section className='font-mono text-center text-slate-900 dark:text-white mb-4'>
                {!isPending && !error && isFirstLoad && (
                    <p>Not sure what to listen to? Click the button below!</p>
                )}

                {records && records.length === 1 && (
                    <p>
                        This is the last record in your collection. Time to
                        re-shuffle!
                    </p>
                )}
            </section>

            <section className='w-full'>
                {isPending && (
                    <div className='flex flex-col items-center justify-center py-4'>
                        <span className='loader'></span>
                    </div>
                )}

                {error && (
                    <p className='text-center text-slate-900 dark:text-white'>
                        There was a problem fetching your record collection from
                        Discogs 😭
                    </p>
                )}

                {!isPending && !error && randomRecord && (
                    <Record record={randomRecord} isLoading={isLoading} />
                )}

                <div className='flex justify-center gap-x-4'>
                    {records && records.length > 1 && (
                        <Button
                            label={
                                isFirstLoad ? 'Shuffle Records' : 'Next Record'
                            }
                            clickHandler={randomRecordHandler}
                            color='sky'
                        />
                    )}
                    {records && records.length <= 1 && !isFirstLoad && (
                        <Button
                            label='Re-shuffle'
                            clickHandler={resetRecordsHandler}
                            color='rose'
                        />
                    )}
                </div>
            </section>
        </Fragment>
    );
};

export default Records;
