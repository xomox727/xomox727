import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import React from 'react';

interface HomeHeroProps {
  isDarkMode: boolean;
  heroSvg: string;
  heroDarkSvg: string;
  heroMobileImage: string;
  heroMobileDarkImage: string;
  setIsHovering: (val: boolean) => void;
}

export const HomeHero = ({
  isDarkMode,
  heroSvg,
  heroDarkSvg,
  heroMobileImage,
  heroMobileDarkImage,
  setIsHovering,
}: HomeHeroProps) => {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springX = useSpring(x, { stiffness: 70, damping: 24 });
  const springY = useSpring(y, { stiffness: 70, damping: 24 });

  const glassX = useTransform(springX, [0, 1], ['18%', '82%']);
  const glassY = useTransform(springY, [0, 1], ['18%', '82%']);
  const heroRotate = useTransform(springX, [0, 1], [-2, 2]);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width);
    y.set((event.clientY - rect.top) / rect.height);
  };

  const desktopHero = isDarkMode ? heroDarkSvg : heroSvg;
  const mobileHero = isDarkMode ? heroMobileDarkImage : heroMobileImage;

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden pt-28 md:pt-32 bg-[#f8f7f4] dark:bg-[#070b12]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,217,249,0.35),transparent_25%),radial-gradient(circle_at_85%_35%,rgba(46,64,111,0.10),transparent_30%)] dark:bg-[radial-gradient(circle_at_18%_20%,rgba(255,217,249,0.08),transparent_25%),radial-gradient(circle_at_75%_35%,rgba(46,64,111,0.28),transparent_35%)]" />

      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03] bg-[linear-gradient(to_right,#2e406f_1px,transparent_1px),linear-gradient(to_bottom,#2e406f_1px,transparent_1px)] bg-[size:80px_80px]" />

      <motion.div
        className="hidden md:block absolute w-[36vw] h-[36vw] max-w-[520px] max-h-[520px] rounded-[42%_58%_52%_48%/48%_42%_58%_52%] pointer-events-none border border-white/50 dark:border-white/10 backdrop-blur-[10px]"
        style={{
          left: glassX,
          top: glassY,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'linear-gradient(135deg, rgba(255,217,249,0.32), rgba(255,255,255,0.16), rgba(46,64,111,0.08))',
        }}
        animate={{
          borderRadius: [
            '42% 58% 52% 48% / 48% 42% 58% 52%',
            '55% 45% 40% 60% / 40% 55% 45% 60%',
            '42% 58% 52% 48% / 48% 42% 58% 52%',
          ],
          rotate: [0, 3, -2, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 min-h-[calc(100vh-8rem)] grid md:grid-cols-[0.9fr_1.1fr] items-center gap-10">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center md:text-left"
        >
          <p className="text-[#ffd9f9] font-bold tracking-[0.18em] text-sm mb-5">
            HI, I&apos;M
          </p>

          <h1 className="text-[#2e406f] dark:text-white font-black leading-[0.98] tracking-[-0.04em] text-[clamp(3.2rem,8vw,7.5rem)]">
            CHENG
            <br />
            KUEI CHIEN<span className="text-[#ffd9f9]">.</span>
          </h1>

          <p className="mt-6 text-[#2e406f] dark:text-white font-bold tracking-[0.16em] text-sm md:text-base">
            GRAPHIC / VISUAL DESIGNER
          </p>

          <p className="mt-8 max-w-md mx-auto md:mx-0 text-sm md:text-base leading-8 text-[#2e406f]/60 dark:text-white/55">
            專注於品牌視覺、包裝設計、版面編排與插畫表現，讓作品以更清楚、更有質感的方式被看見。
          </p>

          <motion.button
            onClick={() => {
              const work = document.getElementById('work');
              work?.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="mt-10 inline-flex items-center gap-4 rounded-full border border-[#ffd9f9] px-7 py-3 text-sm font-bold tracking-[0.12em] text-[#2e406f] dark:text-white hover:bg-[#ffd9f9]/40 transition-colors"
          >
            VIEW MY WORK
            <span>→</span>
          </motion.button>
        </motion.div>

        <motion.div
          style={{ rotate: heroRotate }}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex justify-center md:justify-end"
        >
          <div className="relative w-full max-w-[680px]">
            <div className="absolute -inset-5 rounded-[3rem] bg-white/30 dark:bg-white/[0.03] blur-2xl" />

            <img
              src={desktopHero}
              alt="Cheng Kuei Chien Hero"
              draggable={false}
              className="hidden md:block relative w-full h-auto select-none pointer-events-none"
            />

            <img
              src={mobileHero}
              alt="Cheng Kuei Chien Mobile Hero"
              draggable={false}
              className="block md:hidden relative w-full max-w-[360px] mx-auto h-auto select-none pointer-events-none"
            />
          </div>
        </motion.div>
      </div>

      <div className="absolute left-6 md:left-10 bottom-28 md:bottom-12 hidden sm:flex items-center gap-4 rotate-[-90deg] origin-left text-[10px] tracking-[0.28em] font-bold text-[#2e406f]/45 dark:text-white/30">
        SCROLL TO EXPLORE
        <span className="w-8 h-px bg-[#ffd9f9]" />
      </div>
    </section>
  );
};
