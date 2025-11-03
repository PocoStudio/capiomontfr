import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const BentoGrid = ({ children }: Props) => {
  return (
    <div className="
      grid 
      grid-cols-1         
      md:grid-cols-3        
      lg:grid-cols-4       
      gap-4 md:gap-6

      grid-auto-rows-[minmax(240px,_auto)] 
    ">
      {children}
    </div>
  );
};