import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Timer, ShieldOff, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'rateLimit' | 'ipBlock';

interface Props {
  message: string;
  type: ToastType;
  onClose: () => void; 
}

const toastConfig = {
  success: {
    icon: <CheckCircle className="text-green-500" />,
    borderColor: 'border-green-500/50',
  },
  error: {
    icon: <XCircle className="text-red-500" />,
    borderColor: 'border-red-500/50',
  },
  warning: {
    icon: <AlertTriangle className="text-orange-400" />,
    borderColor: 'border-orange-400/50',
  },
  rateLimit: {
    icon: <Timer className="text-blue-400" />,
    borderColor: 'border-blue-400/50',
  },
  ipBlock: {
    icon: <ShieldOff className="text-red-700" />,
    borderColor: 'border-red-700/50',
  }
};

export const ResponseToast = ({ message, type, onClose }: Props) => {
  const config = toastConfig[type] || toastConfig.error;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto px-4 sm:px-0"
      >
        <div 
          className={`
            bento-card-glass p-4
            flex items-center gap-4
            w-full sm:w-auto sm:max-w-md
            border-t-2 ${config.borderColor}
          `}
        >
          <div className="flex-shrink-0 text-2xl">
            {config.icon}
          </div>
          
          <p className="text-sm opacity-90 flex-grow" dangerouslySetInnerHTML={{ __html: message }} />
          
          <button onClick={onClose} className="flex-shrink-0 opacity-50 hover:opacity-100">
            <X size={18} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};