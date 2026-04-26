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
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const springX = useSpring(mouseX, { stiffness: 90, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 28 });

  const glassX = useTransform(springX, (v) => `${v}px`);
  const glassY = useTransform(springY, (v) => `${v}px`);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  const desktopHero = isDarkMode ? heroDarkSvg : heroSvg;
  const mobileHero = isDarkMode ? heroMobileDarkImage : heroMobileImage;

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-white dark:bg-neutral-950 transition-colors duration-500"
    >
      {/* 底層：乾淨紙感背景 */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f8f8f8_100%)] dark:bg-[linear-gradient(180deg,#0a0a0a_0%,#171717_100%)]" />

      {/* 細緻紙紋，不光污染 */}
      <div
        className="absolute inset-0 opacity-[0.045] dark:opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#2e406f 0.45px, transparent 0.45px)',
          backgroundSize: '18px 18px',
        }}
      />

      {/* 磁吸玻璃層：跟著滑鼠走 */}
      <motion.div
        className="hidden md:block absolute w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          left: glassX,
          top: glassY,
          translateX: '-50%',
          translateY: '-50%',
          background: isDarkMode
            ? `
              radial-gradient(circle,
                rgba(255,217,249,0.10) 0%,
                rgba(46,64,111,0.14) 36%,
                rgba(255,255,255,0.025) 58%,
                transparent 72%
              )
            `
            : `
              radial-gradient(circle,
                rgba(255,217,249,0.22) 0%,
                rgba(46,64,111,0.08) 38%,
                rgba(255,255,255,0.28) 58%,
                transparent 72%
              )
            `,
          filter: 'blur(6px)',
        }}
      />

      {/* 玻璃折射框，低調有感 */}
      <motion.div
        className="hidden md:block absolute w-[260px] h-[260px] rounded-[38%_62%_55%_45%/45%_40%_60%_55%] pointer-events-none border border-white/30 dark:border-white/10"
        style={{
          left: glassX,
          top: glassY,
          translateX: '-50%',
          translateY: '-50%',
          backdropFilter: 'blur(12px) saturate(120%)',
          WebkitBackdropFilter: 'blur(12px) saturate(120%)',
          background: isDarkMode
            ? 'rgba(255,255,255,0.025)'
            : 'rgba(255,255,255,0.22)',
          boxShadow: isDarkMode
            ? 'inset 0 0 0 1px rgba(255,255,255,0.04)'
            : 'inset 0 0 0 1px rgba(255,255,255,0.45)',
        }}
        animate={{
          rotate: [0, 4, -3, 0],
          scale: [1, 1.035, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* 手機版：自動簡化，不吃效能 */}
      <div className="md:hidden absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(255,217,249,0.22),transparent_35%),radial-gradient(circle_at_80%_60%,rgba(46,64,111,0.08),transparent_32%)] dark:bg-[radial-gradient(circle_at_50%_25%,rgba(255,217,249,0.08),transparent_35%),radial-gradient(circle_at_80%_60%,rgba(46,64,111,0.18),transparent_32%)]" />

      {/* 原本首頁主圖：不動作品照片，只控制首頁 Hero */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 md:px-12 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex justify-center"
        >
          <img
            src={desktopHero}
            alt="Cheng Kuei Chien Portfolio Hero"
            draggable={false}
            className="hidden md:block w-full max-w-[1180px] h-auto select-none pointer-events-none"
          />

          <img
            src={mobileHero}
            alt="Cheng Kuei Chien Portfolio Hero Mobile"
            draggable={false}
            className="block md:hidden w-full max-w-[420px] h-auto select-none pointer-events-none"
          />
        </motion.div>
      </div>

      {/* 底部提示，低調 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] md:text-[11px] tracking-[0.28em] font-bold text-brand/35 dark:text-white/25"
      >
        SCROLL
      </motion.div>
    </section>
  );
};
