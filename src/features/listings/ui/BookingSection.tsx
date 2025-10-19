// BookingSection.tsx
import { useState } from 'react';
import Button from '@/shared/ui/Button/Button';
import { IListings } from '@/entities/housing-list';
import { useBooking } from '@/features/listings/hooks/useBooking';
import Input from '@/shared/ui/Input/Input';
import toast from 'react-hot-toast';

interface BookingSectionProps {
    listing: IListings;
}

export const BookingSection = ({ listing }: BookingSectionProps) => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);

    const bookingMutation = useBooking(listing.id);

    const handleBooking = () => {
        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // обновляем оптически кэш чтобы на клиенте изменить количество бронь
        if (!checkIn || !checkOut) return toast.error('Выберите даты');
        if (checkInDate < today) {
            return toast.error('Дата заезда не может быть в прошлом');
        }
        if (checkOutDate <= checkInDate) {
            return toast.error('Дата выезда должна быть позже даты заезда');
        }

        bookingMutation.mutate({ listingId: listing.id, checkIn, checkOut, guests });
        setGuests(1);
        setCheckIn('');
        setCheckOut('');
    };

    return (
        <div className='mt-5 flex flex-col gap-2 text-gray-700 dark:text-white max-w-max'>
            <label>
                Заезд:
                <input type='date' value={checkIn} onChange={e => setCheckIn(e.target.value)} className='ml-2 p-1 rounded text-black' />
            </label>
            <label>
                Выезд:
                <input type='date' value={checkOut} onChange={e => setCheckOut(e.target.value)} className='ml-2 p-1 rounded text-black' />
            </label>

            <Input
                label='Гости'
                type='number'
                value={guests}
                min={1}
                onChange={e => setGuests(Number(e.target.value))}
                className='ml-2 p-1 rounded text-black w-20'
            />

            <Button onClick={handleBooking} className='bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 max-w-[200px] mt-3'>
                {bookingMutation.isPending ? 'Бронирование...' : 'Забронировать'}
            </Button>
        </div>
    );
};
