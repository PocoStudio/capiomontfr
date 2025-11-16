import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const BentoGrid = ({ children }: Props) => {
  return (
    <div className="
      grid 
      grid-cols-1          /* Mobile: 1 colonne */
      md:grid-cols-3        /* Tablette: 3 colonnes */
      lg:grid-cols-4        /* Desktop: 4 colonnes */
      
      grid-auto-flow-row-dense 
      
      gap-4 md:gap-6
      
      /* La hauteur s'adapte toujours au contenu */
      grid-auto-rows-[minmax(240px,_auto)] 
    ">
      {children}
    </div>
  );
};