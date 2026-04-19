import { motion } from 'motion/react';
import React from 'react';

export const Footer = React.memo(() => (
  <footer className="py-12 border-t border-neutral-200/50 dark:border-neutral-800/50 text-center relative z-10">
    <span className="text-[10px] font-medium tracking-widest text-neutral-300 dark:text-neutral-600 uppercase">
      &copy; CHENG KUEI CHIEN作品集
    </span>
  </footer>
));

Footer.displayName = 'Footer';
