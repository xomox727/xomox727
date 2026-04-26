import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import React from 'react';

interface NavigationProps {
  activeSection: string;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  setIsHovering: (val: boolean) => void;
  onNavClick: (id: string) => void;
}

const navItems = ['HOME', 'WORK', 'ABOUT', 'CONTACT'];

export const Navigation = React.memo(
  ({
    activeSection,
    isDarkMode,
    setIsDarkMode,
    setIsHovering,
    onNavClick,
  }: NavigationProps) => {
    return (
      <>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[200] bg-white text-black px-4 py-2 rounded-md font-bold text-sm outline-none focus:ring-4 focus:ring-[#ffd9f9]"
        >
          Skip to main content
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main Desktop Navigation"
          className="fixed top-5 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-6xl h-16 bg-white/65 dark:bg-white/[0.055] backdrop-blur-2xl z-50 hidden md:flex items-center justify-between px-7 border border-white/70 dark:border-white/10 rounded-full shadow-[0_20px_70px_rgba(46,64,111,0.10)] dark:shadow-[0_20px_70px_rgba(0,0,0,0.35)] transition-all duration-500"
        >
          <button
            onClick={() => onNavClick('home')}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="-m-4 px-4 py-4 text-[12px] font-bold tracking-[0.18em] text-[#2e406f] dark:text-white"
          >
            CHENG KUEI CHIEN
          </button>

          <ul className="flex gap-10 items-center">
            {navItems.map((item) => {
              const id = item.toLowerCase();
              const active = activeSection === id;

              return (
                <li key={item}>
                  <motion.button
                    onClick={() => onNavClick(id)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-current={active ? 'page' : undefined}
                    className={`relative -m-4 px-4 py-4 text-[12px] font-bold tracking-[0.18em] transition-colors duration-300 ${
                      active
                        ? 'text-[#2e406f] dark:text-white'
                        : 'text-[#2e406f]/40 hover:text-[#2e406f] dark:text-white/35 dark:hover:text-white'
                    }`}
                  >
                    {item}

                    <span
                      className={`absolute left-1/2 -translate-x-1/2 bottom-2 h-1 w-1 rounded-full bg-[#ffd9f9] transition-opacity duration-300 ${
                        active ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </motion.button>
                </li>
              );
            })}
          </ul>

          <motion.button
            onClick={() => setIsDarkMode(!isDarkMode)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            whileHover={{ scale: 1.08, rotate: 10 }}
            whileTap={{ scale: 0.92 }}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/80 dark:bg-white/10 text-[#2e406f] dark:text-white shadow-sm border border-black/5 dark:border-white/10"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDarkMode}
          >
            {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
          </motion.button>
        </nav>

        {/* Mobile Navigation */}
        <nav
          aria-label="Main Mobile Navigation"
          className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-sm z-50 rounded-full flex items-center justify-between px-5 py-4 bg-white/60 dark:bg-white/[0.07] backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_15px_50px_rgba(46,64,111,0.16)]"
        >
          <ul className="flex items-center justify-between w-full">
            {navItems.map((item) => {
              const id = item.toLowerCase();
              const active = activeSection === id;

              return (
                <li key={item} className="flex-1 flex justify-center">
                  <button
                    onClick={() => onNavClick(id)}
                    className={`-m-3 px-3 py-3 text-[10px] font-bold tracking-[0.12em] transition-colors ${
                      active
                        ? 'text-[#2e406f] dark:text-white'
                        : 'text-[#2e406f]/45 dark:text-white/40'
                    }`}
                  >
                    {item}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </>
    );
  },
);

Navigation.displayName = 'Navigation';
