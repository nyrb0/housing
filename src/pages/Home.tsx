import { useEffect, useState } from 'react';
import { HousingCard, IListings } from '@/entities/housing-list';
import { IoFilter } from 'react-icons/io5';
import ListingsFilters from '@/features/ui/ListingsFilters';
import { useFilterStore } from '@/store/filter.store';
import { usePaginatedListings } from '@/features/listings/hooks/useListings';
import { ErrorBanner } from '@/shared/ui/state-page/ErrorBanner';
import { Spinner } from '@/shared/ui/state-page/Spiner';
import { Pagination } from '@/shared/ui/pagination/Pagination';
import { SlLogout } from 'react-icons/sl';
import { useAuthStore } from '@/store/auth.store';

const LISTINGS_PER_PAGE = 20;
const INITIAL_PAGE = 1;
const ERROR_MESSAGE = 'Ошибка, не получилось получить данные!';
const NO_RESULTS_MESSAGE = 'Нету результата';

const Home = () => {
    const { appliedFilters } = useFilterStore();
    const [page, setPage] = useState(INITIAL_PAGE);
    const [open, setOpen] = useState(false);
    const logout = useAuthStore(state => state.logout);

    // Сброс страницы при смене фильтров
    useEffect(() => {
        setPage(INITIAL_PAGE);
    }, [appliedFilters]);

    const { data, isLoading, isError, isFetching, refetch } = usePaginatedListings({
        ...appliedFilters,
        page,
        limit: LISTINGS_PER_PAGE,
    });

    const handlePageChange = (newPage: number) => {
        // Хотел проверку поставить, что новая страница находится в пределах допустимого диапазона но x-total-count выдает undefined
        setPage(newPage);
    };
    if (isLoading || isFetching) return <Spinner />;
    if (isError) return <ErrorBanner message={ERROR_MESSAGE} onRetry={refetch} />;

    const totalPages = Math.ceil((data?.total || 0) / LISTINGS_PER_PAGE);
    return (
        <>
            <ListingsFilters isOpen={open} onClose={() => setOpen(false)} />
            <div className='container mx-auto p-6'>
                <div className='flex justify-between gap-3 items-center mb-3'>
                    <IoFilter onClick={() => setOpen(true)} size={40} fill='white' />
                    <div className='flex items-center gap-1.5 cursor-pointer' onClick={logout}>
                        <span className='text-white'>выйти</span>
                        <SlLogout size={30} fill='white' />
                    </div>
                </div>
                {data?.data.length ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                        {data.data.map((item: IListings) => (
                            <HousingCard key={item.id} data={item} />
                        ))}
                    </div>
                ) : (
                    <p className='text-white text-3xl text-center'>{NO_RESULTS_MESSAGE}</p>
                )}

                {/* Пагинация */}
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </>
    );
};

export default Home;
