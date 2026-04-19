import { motion } from 'motion/react';
import React from 'react';

interface HomeHeroProps {
  isDarkMode: boolean;
  heroMobileImage: string;
  heroSvg: string;
  heroMobileDarkImage: string;
  heroDarkSvg: string;
}

export const HomeHero = React.memo(({ isDarkMode, heroMobileImage, heroSvg, heroMobileDarkImage, heroDarkSvg }: HomeHeroProps) => {
  return (
    <section id="home" className="h-screen w-full flex items-center justify-center overflow-hidden relative">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full h-full"
      >
        <div className={`absolute inset-0 w-full h-full bg-white flex justify-center items-center transition-opacity duration-500 ${isDarkMode ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <img 
            src={heroMobileImage} 
            alt="XOMOX Minimalist Portfolio typography, light mode mobile" 
            className="w-full h-full object-contain scale-[1.08] md:hidden"
          />
          <img 
            src={heroSvg} 
            alt="XOMOX Minimalist Portfolio typography, light mode desktop" 
            className="hidden md:block w-full h-full object-contain"
          />
        </div>

        <div className={`absolute inset-0 w-full h-full bg-[#171717] flex justify-center items-center transition-opacity duration-500 ${isDarkMode ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <img 
            src={heroMobileDarkImage} 
            alt="XOMOX Minimalist Portfolio typography, dark mode mobile" 
            className="w-full h-full object-contain scale-[1.08] md:hidden"
          />
          <img 
            src={heroDarkSvg} 
            alt="XOMOX Minimalist Portfolio typography, dark mode desktop" 
            className="hidden md:block w-full h-full object-contain"
          />
        </div>
      </motion.div>
    </section>
  );
});

HomeHero.displayName = 'HomeHero';
