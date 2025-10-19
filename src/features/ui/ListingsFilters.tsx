import Button from '@/shared/ui/Button/Button';
import Input from '@/shared/ui/Input/Input';
import { Modal } from '@/shared/ui/modal/Modal';
import { Select } from '@/shared/ui/select/Select';
import { useFilterStore } from '@/store/filter.store';
import React, { useState } from 'react';

interface ILisFilter {
    isOpen: boolean;
    onClose: () => void;
}

const ListingsFilters = ({ isOpen, onClose }: ILisFilter) => {
    const { city, minPrice, maxPrice, sort, setFilters, applyFilters } = useFilterStore();
    const [error, setError] = useState('');

    const sortOptions = [
        { label: 'По возрастанию цены', value: 'price_asc' },
        { label: 'По убиванию цены', value: 'price_desc' },
        { label: 'По рейтингу', value: 'rating_desc' },
    ];

    console.log(maxPrice);
    const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (minPrice !== null && maxPrice !== null && minPrice > maxPrice) {
            console.log('jvnjfd');
            setError('Мин. цена не может быть больше макс. цены');
            return;
        }

        setError('');
        onClose();
        applyFilters();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Фильтрация'>
            <form className='flex flex-col gap-5 mt-4' onSubmit={handleApply}>
                <Input value={city} placeholder='Город' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters('city', e.target.value)} />
                <Select options={sortOptions} value={sort || ''} onChange={(value: string) => setFilters('sort', value)} placeholder='Сортировка' />

                <Input
                    type='number'
                    value={minPrice || ''}
                    placeholder='Мин. цена'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters('minPrice', Number(e.target.value))}
                />

                <Input
                    type='number'
                    value={maxPrice || ''}
                    placeholder='Макс. цена'
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters('maxPrice', Number(e.target.value))}
                />

                {error && <p className='text-red-500'>{error}</p>}
                <Button type='submit'>Пременить</Button>
            </form>
        </Modal>
    );
};

export default ListingsFilters;
