import { Fragment } from 'react';

const Record = ({ record, isLoading }) => {
    const removeUnwantedCharacters = (recordTitle) => {
        return recordTitle.replace(/[()0-9]/g, '');
    };

    return (
        <article className='font-mono flex flex-col items-center justify-center text-slate-900 dark:text-white'>
            <div className='relative aspect-square shadow-2xl shadow-gray-400 dark:shadow-gray-800 size-60'>
                {(record.basic_information?.cover_image.includes('.gif') ||
                    isLoading) && (
                    <div className='absolute animate-pulse bg-slate-500 dark:bg-slate-700 rounded size-full'></div>
                )}
                <img
                    className='rounded size-full'
                    src={record.basic_information.cover_image}
                    alt={`Album cover of ${record?.basic_information?.artists[0].name} - ${record?.basic_information?.title}`}
                />
            </div>

            <div className='text-center py-4 min-h-24 w-full'>
                <h2 className='font-bold text-xl mb-2'>
                    {removeUnwantedCharacters(
                        record?.basic_information?.artists[0].name
                    )}
                </h2>
                <p>{record?.basic_information?.title}</p>
            </div>
        </article>
    );
};

export default Record;
