import { motion } from 'motion/react';
import React from 'react';

interface AboutContactProps {
  setIsHovering: (val: boolean) => void;
}

export const AboutSection = React.memo(() => (
  <section id="about" className="min-h-screen flex items-center justify-center py-40 px-6 relative">
    <div className="max-w-3xl text-center relative z-10">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-3xl font-light tracking-tight mb-8 text-neutral-900 dark:text-white"
      >
        Design is not just what it looks like and feels like. Design is how it works.
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-neutral-500 dark:text-neutral-400 leading-relaxed font-light"
      >
        I am a multidisciplinary designer focused on creating clean, functional, and aesthetically pleasing digital experiences. My work spans across layout design, illustration, and brand identity.
      </motion.p>
    </div>
  </section>
));

export const ContactSection = React.memo(({ setIsHovering }: AboutContactProps) => (
  <section id="contact" className="min-h-screen flex flex-col items-center justify-center py-40 px-6 relative">
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <h2 className="text-xs font-bold tracking-[0.5em] uppercase mb-12 text-neutral-400 dark:text-neutral-500">Get in touch</h2>
      <a 
        href="mailto:xomox727@gmail.com" 
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        aria-label="Send an email to xomox727@gmail.com"
        className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light tracking-tighter text-neutral-900 dark:text-white hover:text-neutral-500 dark:hover:text-neutral-300 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand focus-visible:ring-offset-8 focus-visible:rounded-lg"
      >
        xomox727@gmail.com
      </a>
    </motion.div>
  </section>
));

AboutSection.displayName = 'AboutSection';
ContactSection.displayName = 'ContactSection';
