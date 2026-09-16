import React from 'react';

export interface BodyProps {
  children: React.ReactNode;
  className?: string;
}

export const Body: React.FC<BodyProps> = ({ children, className = '' }) => {
  return (
    <main className={`flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ${className}`}>
      {children}
    </main>
  );
};
