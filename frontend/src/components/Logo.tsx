import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`font-bold text-blue-600 ${sizeClasses[size]} ${className}`}>
      <span className="text-blue-600">Groupe ServiTax</span>
      <span className="text-purple-600 ml-2">Solutions Inc.</span>
    </div>
  );
};

export default Logo;
