import React from 'react';
import { Home, Send } from 'lucide-react';

const MenuLink = ({ href, icon, text, isActive = false }: {
  href: string;
  icon: React.ReactNode;
  text: string;
  isActive?: boolean;
}) => {
  
return (
    <a 
      href={href} 
      className={`
        menu-bar-link ${isActive ? 'active' : ''}
        flex items-center gap-2 
        px-4 py-2.5
        rounded-xl
        text-sm font-medium
      `}
    >
      {icon}
      {text}
    </a>
  );
};


export const MenuBar = () => {
  return (
    <nav className="bento-card-glass px-6 py-2">
      
      <div className="flex items-center gap-2">
        <MenuLink 
          href="/" 
          icon={<Home size={16} />} 
          text="Home" 
          isActive={false} 
        />
        <MenuLink 
          href="/Contact"
          icon={<Send size={16} />} 
          text="Contact" 
          isActive={false}
        />
      </div>
    </nav>
  );
};