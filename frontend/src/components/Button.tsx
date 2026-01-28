import React from 'react';
import '../styles/Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  return (
    <button className={`custom-btn ${variant} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
