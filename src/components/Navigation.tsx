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
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
    };

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
          className="fixed top-5 left-1/2 -translate-x-1/2 w-[calc(100%-120px)] max-w-5xl h-16 bg-white/70 dark:bg-white/[0.065] backdrop-blur-2xl z-50 hidden md:flex items-center justify-between px-7 border border-white/70 dark:border-white/10 rounded-full shadow-[0_20px_70px_rgba(46,64,111,0.10)] dark:shadow-[0_20px_70px_rgba(0,0,0,0.35)] transition-all duration-500"
        >
          <button
            type="button"
            onClick={() => onNavClick('home')}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="-m-4 px-4 py-4 text-[12px] font-bold tracking-[0.18em] text-[#2e406f] dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2e406f] dark:focus-visible:ring-white focus-visible:rounded-full"
          >
            CHENG KUEI CHIEN
          </button>

          <ul className="flex gap-12 items-center">
            {navItems.map((item) => {
              const id = item.toLowerCase();
              const active = activeSection === id;

              return (
                <li key={item}>
                  <motion.button
                    type="button"
                    onClick={() => onNavClick(id)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-current={active ? 'page' : undefined}
                    className={`relative -m-4 px-4 py-4 text-[12px] font-bold tracking-[0.18em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2e406f] dark:focus-visible:ring-white focus-visible:rounded-full ${
                      active
                        ? 'text-[#2e406f] dark:text-white'
                        : 'text-[#2e406f]/55 hover:text-[#2e406f] dark:text-white/50 dark:hover:text-white'
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
        </nav>

        {/* Desktop Dark Mode Button - 獨立固定，不會被 navbar 擠掉 */}
        <motion.button
          type="button"
          onClick={toggleDarkMode}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          whileHover={{ scale: 1.08, rotate: 10 }}
          whileTap={{ scale: 0.92 }}
          className="hidden md:flex fixed top-5 right-8 z-[70] w-16 h-16 items-center justify-center rounded-full bg-white/75 dark:bg-white/[0.08] backdrop-blur-2xl text-[#2e406f] dark:text-white border border-white/70 dark:border-white/10 shadow-[0_20px_70px_rgba(46,64,111,0.10)] dark:shadow-[0_20px_70px_rgba(0,0,0,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2e406f] dark:focus-visible:ring-white"
          aria-label={isDarkMode ? '切換為亮色模式' : '切換為暗黑模式'}
          aria-pressed={isDarkMode}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>

        {/* Mobile Navigation */}
        <nav
          aria-label="Main Mobile Navigation"
          className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50 rounded-full flex items-center gap-2 px-4 py-3 bg-white/72 dark:bg-white/[0.08] backdrop-blur-2xl border border-white/60 dark:border-white/10 shadow-[0_15px_50px_rgba(46,64,111,0.16)]"
        >
          <ul className="flex items-center justify-between w-full">
            {navItems.map((item) => {
              const id = item.toLowerCase();
              const active = activeSection === id;

              return (
                <li key={item} className="flex-1 flex justify-center">
                  <button
                    type="button"
                    onClick={() => onNavClick(id)}
                    className={`min-h-11 px-2 text-[11px] font-bold tracking-[0.1em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2e406f] dark:focus-visible:ring-white focus-visible:rounded-full ${
                      active
                        ? 'text-[#2e406f] dark:text-white'
                        : 'text-[#2e406f]/60 dark:text-white/55'
                    }`}
                  >
                    {item}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile Dark Mode Button */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className="shrink-0 w-11 h-11 flex items-center justify-center rounded-full bg-white/80 dark:bg-white/10 text-[#2e406f] dark:text-white border border-black/5 dark:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2e406f] dark:focus-visible:ring-white"
            aria-label={isDarkMode ? '切換為亮色模式' : '切換為暗黑模式'}
            aria-pressed={isDarkMode}
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>
      </>
    );
  },
);

Navigation.displayName = 'Navigation';
