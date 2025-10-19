import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

export const RatingStars = ({ value }: { value: number }) => (
    <Box className='flex items-center gap-1'>
        <Rating name='read-only' value={value} precision={0.5} readOnly />
        <span className='text-sm text-gray-400'>{value.toFixed(1)}</span>
    </Box>
);
