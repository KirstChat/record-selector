import { Fragment } from 'react';

const Record = ({ record, isFirstLoad }) => {
    const removeUnwantedCharacters = (recordTitle) => {
        return recordTitle.replace(/[()0-9]/g, '');
    };

    return (
        <Fragment>
            {record && (
                <section className='font-mono flex flex-col items-center justify-center text-slate-900 dark:text-white'>
                    <img
                        className='aspect-square rounded-lg shadow-2xl shadow-gray-800 w-full max-w-60'
                        src={
                            record?.basic_information?.cover_image.includes(
                                '.gif'
                            )
                                ? 'https://placehold.co/240x240?text=No+Image'
                                : record.basic_information.cover_image
                        }
                        alt={`Album cover of ${record?.basic_information?.artists[0].name} - ${record?.basic_information?.title}`}
                    />

                    <div className='text-center py-4'>
                        <h2 className='font-bold text-xl mb-2'>
                            {removeUnwantedCharacters(
                                record?.basic_information?.artists[0].name
                            )}
                        </h2>
                        <p>{record?.basic_information?.title}</p>
                    </div>
                </section>
            )}
        </Fragment>
    );
};

export default Record;
