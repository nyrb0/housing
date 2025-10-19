import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
    return (
        <button className={`w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
