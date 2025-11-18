import { BentoGrid } from '../../components/default/BentoGrid';
import { ThemeToggle } from '../../components/default/ThemeToggle';
import { TypewriterTitle } from '../../components/default/TypewriterTitle';
import { useState, useEffect } from 'react';
import { BentoCard } from '../../components/default/BentoCard';
import imgglow from '../../assets/special/home-page/img_glow1.jpg';
import { MenuBar } from '../../components/default/MenuBar';

import { FooterCard } from '../../components/default/FooterCard';


import { 
  MessageSquare, 
  Camera, 
  Trophy, 
  BarChart3, 
  Globe, 
  Lock,
  DatabaseBackup
} from 'lucide-react';


const shuffleArray = <T,>(array: T[]): T[] => {
    let currentIndex = array.length, randomIndex;
    const newArray = [...array];
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [newArray[currentIndex], newArray[randomIndex]] = [
        newArray[randomIndex], newArray[currentIndex]
      ];
    }
    return newArray;
};

interface CardConfig {
  id: number;
  title: string;
  description: string;
  className: string;
  tags?: string[];
  icon?: React.ReactNode;
  link?: string;
  imageUrl?: string;
}

const allProjects: CardConfig[] = [
  {
    id: 1,
    title: 'Chat en ligne',
    description: "Une application de messagerie instantanée pour communiquer en temps réel dans vos propres salons.",
    className: 'lg:col-span-2 lg:row-span-2 glow-purple',
    icon: <MessageSquare />,
    link: 'https://talk.capiomont.fr',
    imageUrl: imgglow,
    tags: ['Python', 'Flask', 'JavaScript', 'Docker'],
  },
  {
    id: 2,
    title: 'CleanPhoto',
    description: "Application intelligente pour trier et organiser vos photos selon vos critères.",
    className: 'md:col-span-2 glow-blue',
    icon: <Camera />,
    link: 'https://cleanphoto.capiomont.fr',
    tags: ['Python', 'Windows'],
  },
  {
    id: 3,
    title: 'Tierlist',
    description: "Créez, partagez et éditez vos tierlist sur tous les sujets qui vous passionnent.",
    className: 'glow-green',
    icon: <Trophy />,
    link: 'https://tierlist.capiomont.fr',
    tags: ['Python', 'Flask', 'Docker'],
  },
  {
    id: 4,
    title: 'Statuts',
    description: "Statuts en temps réel de tous les services de Capiomont.fr.",
    className: 'glow-pink',
    icon: <BarChart3 />,
    link: 'https://statuts.capiomont.fr/',
    tags: ['HTML/CSS', 'JavaScript', 'Cloudflare'],
  },
  {
    id: 5,
    title: 'FindsWorld (Concept)',
    description: "Génère des mots français rares, vous devinez la définition. (IA Project)",
    className: 'glow-orange',
    icon: <Globe />, 
    link: undefined,
    tags: ['Html/css', 'IA', 'Python', 'Flask', 'Docker'],
  },
  {
    id: 6,
    title: 'SecurePdf',
    description: "Protection de fichiers PDF avec chiffrement AES-256.",
    className: 'glow-cyan',
    icon: <Lock />, 
    link: undefined,
    tags: ['Python', 'AES-256'],
  },
  {
    id: 7,
    title: 'Nas Synology',
    description: "NAS Synology pour stockage réseau centralisé et sauvegarde, exécutant des conteneurs Docker pour Home Assistant et d'autres services (par ex: hébergement du backend de Talk.capiomont.fr ). Solution fiable, sécurisée et facile à maintenir pour domotique, sauvegardes et hébergement local.",
    className: 'md:col-span-2 glow-yellow',
    icon: <DatabaseBackup />, 
    link: 'https://nas.capiomont.fr/',
    tags: ['Synology', 'Docker'],
  },
];

const mainProject = allProjects[0];
const otherProjects = allProjects.slice(1);


export const HomePage = () => {
  const [orderedCards, setOrderedCards] = useState<CardConfig[]>([]);

  useEffect(() => {
    const shuffledOtherProjects = shuffleArray(otherProjects);
    setOrderedCards([
      mainProject,
      ...shuffledOtherProjects
    ]);
  }, []);

  return (
    <div className="min-h-screen w-full p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-8 md:mb-12">
          
          <div className="flex justify-between items-center w-full mb-1">
            <TypewriterTitle text="Capiomont.fr" />
            <ThemeToggle />
          </div>

          <div className="flex justify-center">
            <MenuBar />
          </div>

        </header>

        <main>
          <BentoGrid>
            {orderedCards.map((card) => (
              <BentoCard
                key={card.id}
                title={card.title}
                description={card.description}
                className={card.className}
                imageUrl={card.imageUrl}
                icon={card.icon}
                link={card.link}
                tags={card.tags} 
              />
            ))}
          </BentoGrid>
        </main>

        <footer className="mt-8 md:mt-12 max-w-xl mx-auto">
          <FooterCard />
        </footer>
        
      </div>
    </div>
  );
};