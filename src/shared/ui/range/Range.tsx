import { useState } from 'react';

const Range = () => {
    const [rating, setRating] = useState(1); // стартовое значение 1

    return (
        <div className='flex flex-col gap-2 '>
            <input
                type='range'
                min={1}
                max={5}
                step={1} // теперь только целые числа
                value={rating}
                onChange={e => setRating(Number(e.target.value))}
                className='w-full accent-blue-500'
            />
            <span className='text-white'>Рейтинг: {rating}</span>
        </div>
    );
};

export default Range;
