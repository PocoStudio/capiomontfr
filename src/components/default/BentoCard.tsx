import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LanguageIcon } from './LanguageIcon'; 

interface Props {
  className?: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  link?: string;
  imageUrl?: string;
  tags?: string[]; 
}

export const BentoCard = ({ 
  className = '', 
  title, 
  description, 
  icon, 
  link, 
  imageUrl, 
  tags 
}: Props) => {
  return (
    <div className={`bento-card-glass ${className}`}>
      
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-90 dark:opacity-60 z-0 rounded-2xl"
        />
      )}
      
      <div className="relative z-10 flex flex-col h-full p-5 text-foreground dark:text-foreground">
        
        {icon && (
          <div className="text-3xl mb-3 p-2 w-min bg-black/5 dark:bg-white/5 rounded-lg">
            {icon}
          </div>
        )}
        <h3 className="text-xl md:text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-sm opacity-80">
          {description}
        </p>

        <div className="flex-grow" />

        <div className="mt-4">
          
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span 
                  key={tag} 
                  className="
                    flex items-center gap-1.5 /* Aligne icône et texte */
                    text-xs font-medium 
                    pl-1 pr-2 py-0.5 rounded-full /* Ajuste padding pour icône */
                    bg-black/10 dark:bg-white/10
                    text-foreground/80 dark:text-foreground/80
                  "
                >
                  <LanguageIcon name={tag} /> 
                  {tag}
                </span>
              ))}
            </div>
          )}

          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                bento-card-link
                inline-flex items-center gap-1 py-1 px-3 rounded-full 
                text-sm font-medium
                transition-colors
                mt-2
              `}
            >
              Visiter <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
