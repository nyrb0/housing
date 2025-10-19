import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, ...props }) => {
    return (
        <div className='flex flex-col gap-1 w-full'>
            {label && <label className='text-xs font-semibold text-white'>{label}:</label>}
            <input {...props} className='bg-gray-700/30 backdrop-blur-md px-2 py-1 rounded-md text-base font-normal text-white focus:outline-none' />
            {error && <p className='text-red-500 text-sm'>{error}</p>}
        </div>
    );
};

export default Input;
