import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
    className="p-2 rounded-full ... focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    aria-label="Changer de thème"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme === 'dark' ? 'moon' : 'sun'}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};