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

export const HomeHero = ({ setIsHovering }: HomeHeroProps) => {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { stiffness: 70, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 70, damping: 24 });

  const gridX = useTransform(smoothX, [0, 1], ['-18px', '18px']);
  const gridY = useTransform(smoothY, [0, 1], ['-14px', '14px']);

  const blueX = useTransform(smoothX, [0, 1], ['22px', '-22px']);
  const blueY = useTransform(smoothY, [0, 1], ['14px', '-14px']);

  const whiteX = useTransform(smoothX, [0, 1], ['-18px', '18px']);
  const whiteY = useTransform(smoothY, [0, 1], ['-12px', '12px']);

  const pinkX = useTransform(smoothX, [0, 1], ['-28px', '28px']);
  const pinkY = useTransform(smoothY, [0, 1], ['20px', '-20px']);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width);
    mouseY.set((event.clientY - rect.top) / rect.height);
  };

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-[#f8f7f4] dark:bg-[#070b12] px-6 md:px-10 pt-28 md:pt-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(255,217,249,0.28),transparent_24%),radial-gradient(circle_at_78%_32%,rgba(46,64,111,0.10),transparent_32%)] dark:bg-[radial-gradient(circle_at_16%_18%,rgba(255,217,249,0.07),transparent_24%),radial-gradient(circle_at_78%_32%,rgba(46,64,111,0.28),transparent_34%)]" />

      <motion.div
        className="absolute inset-0 opacity-[0.09] dark:opacity-[0.06]"
        style={{
          x: gridX,
          y: gridY,
          backgroundImage:
            'linear-gradient(to right, #2e406f 1px, transparent 1px), linear-gradient(to bottom, #2e406f 1px, transparent 1px)',
          backgroundSize: '88px 88px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto min-h-[calc(100vh-8rem)] grid md:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center md:text-left"
        >
          <p className="text-[#2e406f]/55 dark:text-white/45 font-bold tracking-[0.26em] text-xs md:text-sm mb-7">
            GRAPHIC DESIGNER
          </p>

          <h1 className="text-[#2e406f] dark:text-white font-black leading-[0.95] tracking-[-0.055em] text-[clamp(3.6rem,8vw,8.2rem)]">
            CHENG
            <br />
            KUEI
            <br />
            CHIEN<span className="text-[#ffd9f9]">.</span>
          </h1>

          <p className="mt-7 text-[#2e406f] dark:text-white font-bold tracking-[0.14em] text-xs md:text-sm">
            BRANDING / PACKAGE / LAYOUT / ILLUSTRATION
          </p>

          <p className="mt-9 max-w-md mx-auto md:mx-0 text-[#2e406f]/65 dark:text-white/58 leading-8 text-sm md:text-base">
            專注品牌識別、包裝設計、版面編排與插畫，
            以清晰而有質感的視覺傳達內容。
          </p>

          <motion.button
            onClick={scrollToWork}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="mt-10 inline-flex items-center gap-8 rounded-full border border-[#2e406f]/35 dark:border-white/25 px-8 py-4 text-[#2e406f] dark:text-white text-xs font-black tracking-[0.18em] hover:bg-[#ffd9f9]/45 transition-colors"
          >
            VIEW WORKS
            <span className="text-lg leading-none">→</span>
          </motion.button>
        </motion.div>

        {/* Interactive Graphic Hero */}
        <div className="relative h-[520px] md:h-[680px]">
          {/* back paper */}
          <motion.div
            className="absolute right-0 top-6 w-[78%] h-[82%] rounded-[1.6rem] bg-white/58 dark:bg-white/[0.04] border border-[#2e406f]/12 dark:border-white/10 shadow-[0_30px_90px_rgba(46,64,111,0.10)]"
            style={{ x: gridX, y: gridY }}
          >
            <div className="absolute inset-8 border border-[#2e406f]/16 dark:border-white/10" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#2e406f_1px,transparent_1px),linear-gradient(to_bottom,#2e406f_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.08]" />
            <p className="absolute right-8 top-10 text-[clamp(3rem,7vw,6rem)] font-black tracking-[-0.08em] text-[#2e406f]/15 dark:text-white/10">
              2026
            </p>
          </motion.div>

          {/* blue card */}
          <motion.div
            className="absolute left-[8%] top-[8%] w-[48%] h-[55%] rounded-[1.4rem] bg-[#2e406f] shadow-[0_35px_90px_rgba(46,64,111,0.26)] overflow-hidden"
            style={{ x: blueX, y: blueY, rotate: -1.5 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_32%)]" />
            <p className="absolute left-10 top-9 text-white text-5xl font-black">K</p>
            <p className="absolute left-10 top-28 text-white/70 text-xs leading-5">
              Visual
              <br />
              Communication
              <br />
              Design
            </p>
            <span className="absolute right-10 top-12 text-white/75 text-3xl">＋</span>
            <div className="absolute right-10 bottom-10 grid grid-cols-4 gap-2">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} className="w-2 h-2 rounded-full bg-[#ffd9f9]/75" />
              ))}
            </div>
          </motion.div>

          {/* white card */}
          <motion.div
            className="absolute left-[20%] top-[35%] w-[50%] h-[38%] rounded-[1.3rem] bg-[#f8f7f4] dark:bg-[#101722] border border-white/70 dark:border-white/10 shadow-[0_35px_90px_rgba(46,64,111,0.18)]"
            style={{ x: whiteX, y: whiteY, rotate: 0.8 }}
          >
            <div className="absolute left-0 top-0 w-16 h-16 bg-[#ffd9f9]" />
            <h2 className="absolute left-10 top-24 text-[#2e406f] dark:text-white text-3xl md:text-4xl font-black leading-tight">
              Design
              <br />
              with
              <br />
              clarity.
            </h2>
            <p className="absolute left-10 bottom-10 text-[#2e406f]/55 dark:text-white/45 text-xs leading-5">
              2026
              <br />
              Portfolio
            </p>
          </motion.div>

          {/* pink card */}
          <motion.div
            className="absolute right-[2%] bottom-[7%] w-[38%] h-[32%] rounded-[1.3rem] bg-[#ffd9f9] shadow-[0_30px_80px_rgba(255,217,249,0.35)]"
            style={{ x: pinkX, y: pinkY, rotate: 2 }}
          >
            <div className="absolute right-10 bottom-10 w-16 h-16 rounded-full bg-[#2e406f]" />
            <div className="absolute left-8 top-8 w-12 h-px bg-[#2e406f]" />
          </motion.div>

          {/* front navy card */}
          <motion.div
            className="absolute right-[14%] bottom-[4%] w-[34%] h-[44%] rounded-[1.2rem] bg-[#2e406f] shadow-[0_35px_90px_rgba(46,64,111,0.30)]"
            style={{ x: blueX, y: pinkY, rotate: 3 }}
          >
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffd9f9_1.5px,transparent_1.5px)] bg-[size:18px_18px]" />
            <p className="absolute left-8 bottom-8 text-white/85 text-xs leading-5">
              Branding
              <br />
              Package
              <br />
              Layout
              <br />
              Illustration
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
