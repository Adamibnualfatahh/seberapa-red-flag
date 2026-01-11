import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyle = "px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-red-500",
    secondary: "bg-secondary text-white hover:bg-orange-400",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-none",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;