import React from 'react';

interface CardProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className = '',
  children,
  onClick,
  interactive = false,
}) => {
  const baseStyles = 'bg-white rounded-xl shadow-md overflow-hidden';
  const interactiveStyles = interactive
    ? 'cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg'
    : '';
  const cardStyles = `${baseStyles} ${interactiveStyles} ${className}`;
  
  return (
    <div className={cardStyles} onClick={onClick}>
      {children}
    </div>
  );
};

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const CardImage: React.FC<CardImageProps> = ({
  src,
  alt,
  className = '',
}) => {
  return (
    <div className={`h-48 overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({
  className = '',
  children,
}) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

interface CardTitleProps {
  className?: string;
  children: React.ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  className = '',
  children,
}) => {
  return <h3 className={`text-xl font-bold mb-2 ${className}`}>{children}</h3>;
};

interface CardDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({
  className = '',
  children,
}) => {
  return <p className={`text-gray-600 ${className}`}>{children}</p>;
};

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  className = '',
  children,
}) => {
  return <div className={`px-6 py-4 bg-gray-50 ${className}`}>{children}</div>;
};