import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react'; 
import error404 from '../../assets/special/404-page/erreur404.gif';
import { useState, useEffect } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '../../components/default/ThemeToggle';

export const ErrorPage = () => {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    setShowImage(Math.random() < 0.5); 
  }, []); 

  const handleToggle = () => {
    setShowImage((prev) => !prev);
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-8 lg:p-12 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className='hidden'>
          <ThemeToggle />
        </div>
        
        <div 
          className="text-center cursor-pointer flex items-center justify-center"
          onClick={handleToggle}
        >
          <AnimatePresence mode="wait">
            {showImage ? (
              <motion.div
                key="image" 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <img className="max-w-xs" src={error404} alt="404 Not Found" />
              </motion.div>
            ) : (
              <motion.div
                key="text" 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <h1 className="text-8xl md:text-9xl font-extrabold leading-none text-foreground">
                  404
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="text-center">
          <p className="text-lg opacity-80">
            Désolé, la page que vous avez demandée n'existe pas.
          </p>
        </div>

        <div className="flex justify-center">
          <Link 
            to="/" 
            className="
              menu-bar-link active 
              flex items-center gap-2 
              px-4 py-2.5 rounded-xl
              text-sm font-medium
            "
          >
            <ArrowLeft size={16} />
            Retour à l'accueil
          </Link>
        </div>
        
      </div>
    </div>
  );
};