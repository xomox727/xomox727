import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import React from 'react';

interface HomeHeroProps {
  isDarkMode: boolean;
  heroSvg: string;
  heroDarkSvg: string;
  heroMobileImage: string;
  heroMobileDarkImage: string;
}

export const HomeHero = ({
  isDarkMode,
  heroSvg,
  heroDarkSvg,
  heroMobileImage,
  heroMobileDarkImage,
}: HomeHeroProps) => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, {
    stiffness: 80,
    damping: 20,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 80,
    damping: 20,
  });

  const bgX = useTransform(smoothX, [0, 1], ['0%', '100%']);
  const bgY = useTransform(smoothY, [0, 1], ['0%', '100%']);

  const rotateX = useTransform(smoothY, [0, 1], [6, -6]);
  const rotateY = useTransform(smoothX, [0, 1], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const currentHero = isDarkMode ? heroDarkSvg : heroSvg;
  const currentMobileHero = isDarkMode
    ? heroMobileDarkImage
    : heroMobileImage;

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-white dark:bg-neutral-950 transition-colors duration-500"
    >
      {/* Luxury Background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDarkMode
            ? `
              radial-gradient(circle at ${bgX} ${bgY},
              rgba(255,217,249,0.06),
              transparent 25%),
              radial-gradient(circle at 80% 20%,
              rgba(46,64,111,0.18),
              transparent 30%),
              linear-gradient(180deg,#0a0a0a 0%, #111111 100%)
            `
            : `
              radial-gradient(circle at ${bgX} ${bgY},
              rgba(255,217,249,0.16),
              transparent 24%),
              radial-gradient(circle at 80% 20%,
              rgba(46,64,111,0.10),
              transparent 28%),
              linear-gradient(180deg,#ffffff 0%, #f8f8f8 100%)
            `,
        }}
      />

      {/* Texture Layer */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(#000 0.5px, transparent 0.5px)',
          backgroundSize: '18px 18px',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 md:px-12 pt-24">
        <div className="w-full max-w-7xl grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center md:text-left"
          >
            <p className="text-brand/60 dark:text-white/50 tracking-[0.28em] text-xs md:text-sm font-semibold mb-5">
              UI / VISUAL DESIGNER
            </p>

            <h1 className="text-[42px] md:text-[72px] font-black leading-[1.05] tracking-tight text-brand dark:text-white">
              Cheng
              <br />
              Kuei Chien
            </h1>

            <p className="mt-6 max-w-xl text-sm md:text-base leading-relaxed text-brand/60 dark:text-white/55">
              Elegant interfaces, visual identity and meaningful motion.
              Crafting premium digital experiences with subtle details.
            </p>

            <div className="mt-10 flex gap-4 justify-center md:justify-start">
              <motion.a
                href="#work"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-3 rounded-full bg-brand text-white text-sm font-semibold"
              >
                View Works
              </motion.a>

              <motion.a
                href="#about"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-3 rounded-full border border-brand/15 dark:border-white/10 text-brand dark:text-white text-sm font-semibold"
              >
                About Me
              </motion.a>
            </div>
          </motion.div>

          {/* Right Hero Image */}
          <motion.div
            style={{
              rotateX,
              rotateY,
              transformPerspective: 1200,
            }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="relative flex justify-center"
          >
            <div className="relative rounded-[32px] overflow-hidden">
              <img
                src={currentHero}
                alt="Hero"
                className="hidden md:block w-full max-w-[620px] h-auto object-contain select-none pointer-events-none"
                draggable={false}
              />

              <img
                src={currentMobileHero}
                alt="Hero Mobile"
                className="block md:hidden w-full max-w-[360px] h-auto object-contain select-none pointer-events-none"
                draggable={false}
              />

              {/* subtle edge glow */}
              <div className="absolute inset-0 rounded-[32px] ring-1 ring-black/5 dark:ring-white/5" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.25em] text-brand/40 dark:text-white/30"
      >
        SCROLL
      </motion.div>
    </section>
  );
};
