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
    title: 'Talk Capiomont - Chat en ligne',
    description: "Une application de messagerie instantanée pour communiquer en temps réel dans vos propres salons.",
    className: 'lg:col-span-2 lg:row-span-2 glow-purple',
    icon: <MessageSquare />,
    link: 'https://talk.capiomont.fr',
    imageUrl: imgglow,
    tags: ['Node.js', 'Vite.js', 'JavaScript', 'Docker', 'React', 'Tailwind CSS'],
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
    tags: ['HTML/CSS', 'JavaScript', 'O2switch'],
  },
  {
    id: 5,
    title: 'FindsWorld',
    description: "Génère des mots français rares, vous devinez la définition. (Projet en développement)",
    className: 'glow-orange',
    icon: <Globe />, 
    link: "https://words.capiomont.fr",
    tags: ['Html/css', 'IA', 'Python', 'Flask', 'O2switch'],
  },
  {
    id: 6,
    title: 'SecurePdf',
    description: "Protection de fichiers PDF avec chiffrement AES-256.",
    className: 'glow-cyan',
    icon: <Lock />, 
    link: "https://github.com/PocoStudio/PDFprotector",
    tags: ['Python', 'AES-256', 'Windows'],
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
            <TypewriterTitle text="Nathan Capiomont" />
            <ThemeToggle />
          </div>

          <p className="text-muted-foreground text-sm md:text-base font-medium mb-3">
            Découvez mes projets personnels !
          </p>

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