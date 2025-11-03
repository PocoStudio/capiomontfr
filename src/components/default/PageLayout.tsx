import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';


export const PageLayout = () => {
  const location = useLocation();
  
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        <Outlet />

      </motion.div>
    </AnimatePresence>
  );
};