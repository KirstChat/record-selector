import { useState } from 'react';
import { FiInfo } from 'react-icons/fi';

const Footer = () => {
    const [isHidden, setIsHidden] = useState('hidden');

    const infoButtonHandler = () => {
        setIsHidden(isHidden === 'hidden' ? 'visible' : 'hidden');
    };

    return (
        <footer className='absolute right-0 font-mono relative text-slate-900 dark:text-white'>
            <button
                className='bg-sky-700 rounded-full p-2 text-xl'
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
    );
};

export default Footer;
