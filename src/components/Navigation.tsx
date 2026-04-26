import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import React from 'react';

interface NavigationProps {
  activeSection: string;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  setIsHovering: (val: boolean) => void;
}

export const Navigation = React.memo(
({
  activeSection,
  isDarkMode,
  setIsDarkMode,
  setIsHovering,
}: NavigationProps) => {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[200] bg-white text-black px-4 py-2 rounded-md font-bold text-sm outline-none focus:ring-4 focus:ring-brand"
      >
        Skip to main content
      </a>

      {/* Desktop Navigation */}
      <nav
        aria-label="Main Desktop Navigation"
        className="fixed top-0 left-0 w-full h-16 md:h-20 bg-white/70 dark:bg-[#171717]/70 backdrop-blur-xl z-50 flex items-center justify-center px-6 md:px-12 border-b border-white/20 dark:border-white/5 shadow-sm dark:shadow-md dark:shadow-black/40 transition-all duration-500"
      >
        <ul className="hidden md:flex gap-14 items-center w-full justify-center">
          {['HOME', 'WORK', 'ABOUT', 'CONTACT'].map((item) => (
            <li key={item}>
              <motion.a
                href={`#${item.toLowerCase()}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                whileHover={{ y: -2, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Navigate to ${item} section`}
                aria-current={
                  activeSection === item.toLowerCase() ? 'page' : undefined
                }
                className={`inline-block text-sm font-bold tracking-[0.16em] px-2 py-2 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:rounded-sm ${
                  activeSection === item.toLowerCase()
                    ? 'text-brand dark:text-white'
                    : 'text-brand/40 hover:text-brand/70 dark:text-white/40 dark:hover:text-white/70'
                }`}
              >
                {item}
              </motion.a>
            </li>
          ))}
        </ul>

        <div className="absolute right-6 md:right-12 flex items-center gap-4">
          <motion.button
            onClick={() => setIsDarkMode(!isDarkMode)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            aria-label={
              isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
            }
            aria-pressed={isDarkMode}
          >
            {isDarkMode ? (
              <Sun size={18} aria-hidden="true" />
            ) : (
              <Moon size={18} aria-hidden="true" />
            )}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav
        aria-label="Main Mobile Navigation"
        className={`md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 rounded-full flex items-center justify-between px-6 py-4 transition-all duration-500 ${
          isDarkMode
            ? 'bg-black/20 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
            : 'bg-white/30 border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)]'
        }`}
        style={{
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <ul className="flex items-center justify-between w-full m-0 p-0">
          {['HOME', 'WORK', 'ABOUT', 'CONTACT'].map((item) => (
            <li key={item} className="flex-1 flex justify-center">
              <motion.a
                href={`#${item.toLowerCase()}`}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                whileTap={{ scale: 0.9 }}
                aria-label={`Navigate to ${item} section`}
                aria-current={
                  activeSection === item.toLowerCase() ? 'page' : undefined
                }
                className={`inline-block text-[10px] font-bold tracking-[0.15em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:rounded-sm ${
                  activeSection === item.toLowerCase()
                    ? 'text-brand dark:text-white drop-shadow-sm'
                    : 'text-brand/60 hover:text-brand dark:text-white/60 dark:hover:text-white drop-shadow-sm'
                }`}
              >
                {item}
              </motion.a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
});

Navigation.displayName = 'Navigation';
