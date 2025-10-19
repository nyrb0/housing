import { useState, useRef, useEffect } from 'react';

export interface SelectOption {
    label: string;
    value: string;
}

interface ISelectProps {
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export const Select = ({ options, value, onChange, placeholder }: ISelectProps) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Закрытие списка при клике вне компонента
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (val: string) => {
        onChange(val);
        setOpen(false);
    };

    return (
        <div className='relative min-w-[200px]' ref={containerRef}>
            <button
                type='button'
                onClick={() => setOpen(!open)}
                className='w-full bg-gray-700/30 backdrop-blur-md text-white px-4 py-2 rounded-md flex justify-between items-center focus:outline-none'
            >
                {options.find(opt => opt.value === value)?.label || placeholder || 'Select'}
                <span className={`ml-2 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {open && (
                <ul className='absolute z-10 mt-1 w-full bg-gray-700 text-white rounded-md shadow-lg max-h-60  overflow-auto'>
                    {options.map(opt => (
                        <li key={opt.value} className='px-4 py-2 cursor-pointer hover:bg-gray-600' onClick={() => handleSelect(opt.value)}>
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
