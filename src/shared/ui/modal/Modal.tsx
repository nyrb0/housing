import { ReactNode, useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)] px-3' onClick={onClose}>
            <div
                className='bg-[#2f2f2f] text-white rounded-lg p-6 w-96 max-w-full relative'
                onClick={e => e.stopPropagation()} // предотвращаем закрытие при клике внутри
            >
                {title && <h2 className='text-xl text-center font-semibold mb-4'>{title}</h2>}
                {children}
                <button onClick={onClose} className='absolute top-3 right-3 text-gray-400 hover:text-white'>
                    ✕
                </button>
            </div>
        </div>
    );
};
