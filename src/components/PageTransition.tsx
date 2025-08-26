import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

type PageTransitionProps = {
  children: ReactNode;
};

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  type: 'tween',
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.3,
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PageTransition;