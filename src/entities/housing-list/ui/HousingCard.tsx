import { Link } from 'react-router-dom';
import { IListings } from '../model/types';
import { useRef, useState } from 'react';

export const HousingCard = ({ data }: { data: IListings }) => {
    const [index, setIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const displayPhotos = data.photos.length > 0 ? data.photos : [data.thumbnailUrl];

    // переключатель картинок при курсорв
    const handleMouseEnter = () => {
        if (displayPhotos.length <= 1) return;

        timerRef.current = setInterval(() => {
            setIndex(prev => (prev + 1) % displayPhotos.length);
        }, 2000);
    };

    // переключатель в исходную картинку
    const handleMouseLeave = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        setIndex(0);
    };

    return (
        <Link
            to={`/listings/${data.id}`}
            state={data}
            className='
        bg-gray-100
        dark:bg-[#2f2f2f] 
        rounded-xl 
        overflow-hidden 
        shadow-md 
        transform 
        scale-99 
        transition-transform 
        duration-700 
        hover:scale-101
    '
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className='relative w-full h-50 sm:h-64 md:h-72 overflow-hidden'>
                {displayPhotos.map((photo, i) => (
                    <img
                        key={i}
                        src={photo}
                        alt={data.title}
                        className={`w-full h-full object-cover absolute top-0 left-0 transition-opacity duration-1000 ${
                            i === index ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                ))}
            </div>

            <div className='p-4 flex flex-col gap-2 text-gray-700 dark:text-white'>
                <h3 className='text-lg font-semibold'>
                    {data.title}, <span className='text-sm text-gray-700 dark:text-gray-300'>{data.city}</span>
                </h3>

                <p className='text-sm'>{data.pricePerNight}$ / ночь</p>
                <p className='text-yellow-400'>⭐ {data.rating}</p>
            </div>
        </Link>
    );
};
