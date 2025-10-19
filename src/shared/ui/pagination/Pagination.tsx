// src/shared/ui/Pagination/Pagination.tsx

import React from 'react';
import Button from '@/shared/ui/Button/Button'; // Предполагаем путь

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    // Для удобства работы с кнопками
    const goToPreviousPage = () => onPageChange(currentPage - 1);
    const goToNextPage = () => onPageChange(currentPage + 1);

    return (
        <div className='flex justify-center items-center gap-4 mt-8 text-white'>
            <Button disabled={currentPage === 1} onClick={goToPreviousPage} className='px-4 py-2 max-w-max'>
                ← Назад
            </Button>

            <span className='whitespace-nowrap text-gray-600 dark:text-white'>
                Страница {currentPage} из {totalPages}
            </span>

            <Button disabled={currentPage === totalPages} onClick={goToNextPage} className='px-4 py-2 max-w-max'>
                Вперёд →
            </Button>
        </div>
    );
};
