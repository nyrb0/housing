import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { IoMdArrowRoundBack } from 'react-icons/io';
import 'swiper/css';
import 'swiper/css/navigation';
import { RatingStars } from '@/shared/ui/rating/RatingStars';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { useListingById } from '@/features/listings/hooks/useListingById';
import { BookingSection } from '@/features/listings/ui/BookingSection';
import { useFavoritesStore } from '@/store/favorite.store';
import { useToggleFavorite } from '@/features/listings/hooks/useFavorite';
import { ErrorBanner } from '@/shared/ui/state-page/ErrorBanner';
import { Spinner } from '@/shared/ui/state-page/Spiner';

const ListingsId = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isError, refetch, isLoading } = useListingById(id || '');

    const favorites = useFavoritesStore(state => state.favorites);
    const toggleMutation = useToggleFavorite();

    const isFavorite = favorites.includes(id!);

    const handleToggle = () => {
        toggleMutation.mutate(id!);
    };
    if (isLoading) return <Spinner />;
    if (!data || isError) return <ErrorBanner message='Ошибка: ID объявления не найден!' onRetry={refetch} />;

    return (
        <div className='mt-10 ml-5 mr-5 mb-5'>
            <div className='container mx-auto'>
                <div className='bg-[#2b2b2b] rounded-xl shadow-lg overflow-hidden'>
                    <div className='p-2'>
                        <Link to={'/'} className='flex items-center gap-3'>
                            <IoMdArrowRoundBack fill='white' size={40} /> <span className='text-white text-xl'>На главную</span>
                        </Link>
                    </div>

                    <div className='relative'>
                        <Swiper navigation={true} modules={[Navigation]} className='w-full 2xl:h-[700px] xl:h-[600px] lg:h-[500px] sm:h-[400px]'>
                            {data.photos.map((photo, i) => (
                                <SwiperSlide key={i}>
                                    <img src={photo} alt={data.title} className='w-full h-full object-cover object-center' />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <button disabled={toggleMutation.isPending} onClick={handleToggle} className='absolute top-2 right-2 z-50 '>
                            {isFavorite ? <IoHeart color='red' size={40} /> : <IoHeartOutline color='red' size={40} />}
                        </button>
                    </div>

                    <div className='p-6 text-white'>
                        <h1 className='text-2xl font-semibold mb-2'>{data.title}</h1>
                        <p className='text-gray-300 mb-4'>{data.description}</p>
                        <AmenitiesList amenities={data.amenities} />

                        <p className='my-3'>Забронировано: {data.bookingsCount}🔒</p>
                        <div className='flex flex-col sm:flex-row justify-between gap-1.5 text-sm text-gray-400'>
                            <span>🏙️ {data.city}</span>
                            <span>💸 {data.pricePerNight}$/ночь</span>
                            <RatingStars value={data.rating} />
                        </div>
                    </div>
                    <div className='flex justify-center sm:justify-end p-5'>
                        <BookingSection listing={data} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const AmenitiesList = ({ amenities }: { amenities: string[] }) => (
    <div className='flex gap-2 mb-2.5 items-center flex-wrap'>
        <p className='font-medium'>Услуги:</p>
        {amenities.map((item, i) => (
            <p key={i} className='bg-blue-500 px-3 py-0.5 rounded-xl text-sm'>
                {item}
            </p>
        ))}
    </div>
);

export default ListingsId;
