import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  className?: string;
}

export function Button({ 
  variant = 'default', 
  className = '', 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = "px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center";
  const variantStyles = {
    default: "bg-purple-500 text-white hover:bg-purple-600",
    outline: "border-2 hover:bg-purple-50"
  };

  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}