import { Fragment, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../helpers/constants';
import axios from 'axios';
import Record from './Record';
import Button from './Button';

// Import Swiper React components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, EffectCoverflow, Keyboard, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/effect-coverflow';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';

const userName = import.meta.env.VITE_DISCOGS_USER_NAME;
const folderId = import.meta.env.VITE_DISCOGS_COLLECITON_FOLDER_ID;
const token = import.meta.env.VITE_DISCOGS_USER_TOKEN;

const Records = () => {
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [records, setRecords] = useState();

    /**
     * Fetch records from Discogs API
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
     * Function to shuffle records in a random order
     */
    const shuffleRecords = (releases) => {
        if (releases && releases.length > 0) {
            for (let i = releases.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [releases[i], releases[j]] = [releases[j], releases[i]];
            }

            setRecords(releases);
        }
    };

    const shuffleHandler = () => {
        shuffleRecords(data?.releases);
        setIsFirstLoad(false);

        // Timeout function to add loader between records
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    const reshuffleHandler = () => {
        shuffleRecords(data?.releases);
        setIsLoading(true);

        // Timeout function to add loader between records
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    };

    return (
        <Fragment>
            {!isFirstLoad && isLoading && (
                <div className='flex flex-col items-center justify-center py-4'>
                    <span className='loader'></span>
                </div>
            )}

            {!isPending && !error && !isLoading && (
                <section className='flex flex-col justify-center -ml-4 -mr-4'>
                    {!isFirstLoad && records && (
                        <Fragment>
                            <Swiper
                                effect={'coverflow'}
                                grabCursor={true}
                                centeredSlides={true}
                                slidesPerView={'auto'}
                                coverflowEffect={{
                                    rotate: 50,
                                    stretch: 0,
                                    depth: 100,
                                    modifier: 1,
                                    slideShadows: true,
                                }}
                                keyboard={true}
                                pagination={{
                                    type: 'fraction',
                                }}
                                modules={[
                                    A11y,
                                    EffectCoverflow,
                                    Keyboard,
                                    Pagination,
                                ]}
                            >
                                {records.map((record) => (
                                    <SwiperSlide>
                                        <Record
                                            key={record.id}
                                            record={record}
                                            isLoading={isLoading}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Fragment>
                    )}
                </section>
            )}

            <section className='flex justify-center'>
                {isFirstLoad && (
                    <Button
                        label={`Shuffle Records`}
                        clickHandler={shuffleHandler}
                        color='sky'
                    />
                )}
                {!isFirstLoad && !isLoading && (
                    <Button
                        label={`Re-Shuffle Records`}
                        clickHandler={reshuffleHandler}
                        color='rose'
                    />
                )}
            </section>
        </Fragment>
    );
};

export default Records;
