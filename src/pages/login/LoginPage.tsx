import { useLogin } from '@/features/auth/hooks/useLogin';
import Button from '@/shared/ui/Button/Button';
import Input from '@/shared/ui/Input/Input';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useLocation, useNavigate } from 'react-router-dom';

interface LoginForm {
    email: string;
    password: string;
}

export const LoginPage = () => {
    const { mutateAsync, isPending, isError } = useLogin();
    const navigate = useNavigate();
    const location = useLocation();

    // куда редиректнуть после логина
    const from = (location.state as { from: string })?.from || '/';
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginForm>({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit: SubmitHandler<LoginForm> = async data => {
        try {
            await mutateAsync(data);
            navigate(from, { replace: true });
        } catch (err) {
            reset({ email: '', password: '' });
        }
    };

    return (
        <div className='flex justify-center items-center h-screen '>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col items-center m-[10px] gap-5 bg-[#343434] rounded-xl p-[10px] max-w-[400px] w-full'
            >
                <h2 className='text-white text-2xl font-semibold'>Вход</h2>
                <Input
                    error={errors.email?.message}
                    type='email'
                    placeholder='Email'
                    {...register('email', {
                        required: 'Email обязателен',
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: 'Неверный формат email',
                        },
                    })}
                />
                <Input
                    error={errors.password?.message}
                    type='password'
                    placeholder='Пароль'
                    {...register('password', {
                        required: 'Пароль обязателен',
                        minLength: { value: 6, message: 'Минимум 6 символов' },
                    })}
                />
                <Button type='submit' disabled={isPending}>
                    {isPending ? 'Входим...' : 'Войти'}
                </Button>
                {isError && <p className='text-red-500'>Не правильный пароль или email</p>}
            </form>
        </div>
    );
};
