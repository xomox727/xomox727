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

  const smoothX = useSpring(mouseX, {
    stiffness: 60,
    damping: 26,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 60,
    damping: 26,
  });

  const gridX = useTransform(smoothX, [0, 1], ['-12px', '12px']);
  const gridY = useTransform(smoothY, [0, 1], ['-10px', '10px']);

  const blueX = useTransform(smoothX, [0, 1], ['16px', '-16px']);
  const blueY = useTransform(smoothY, [0, 1], ['10px', '-10px']);

  const whiteX = useTransform(smoothX, [0, 1], ['-12px', '12px']);
  const whiteY = useTransform(smoothY, [0, 1], ['-8px', '8px']);

  const pinkX = useTransform(smoothX, [0, 1], ['-18px', '18px']);
  const pinkY = useTransform(smoothY, [0, 1], ['12px', '-12px']);

  const frameRef = React.useRef<number | null>(null);
  const latestPosition = React.useRef({ x: 0.5, y: 0.5 });

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    latestPosition.current = {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
    };

    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      mouseX.set(latestPosition.current.x);
      mouseY.set(latestPosition.current.y);
      frameRef.current = null;
    });
  };

  React.useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen overflow-hidden bg-[#f8f7f4] dark:bg-[#070b12] px-6 md:px-10 pt-28 md:pt-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(255,217,249,0.18),transparent_24%),radial-gradient(circle_at_78%_32%,rgba(46,64,111,0.08),transparent_32%)] dark:bg-[radial-gradient(circle_at_16%_18%,rgba(255,217,249,0.05),transparent_24%),radial-gradient(circle_at_78%_32%,rgba(46,64,111,0.22),transparent_34%)]" />

      <motion.div
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.045] motion-safe-layer"
        style={{
          x: gridX,
          y: gridY,
          backgroundImage:
            'linear-gradient(to right, #2e406f 1px, transparent 1px), linear-gradient(to bottom, #2e406f 1px, transparent 1px)',
          backgroundSize: '88px 88px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto min-h-[calc(100vh-8rem)] grid md:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-center md:text-left"
        >
          <p className="text-[#2e406f]/60 dark:text-white/55 font-bold tracking-[0.26em] text-xs md:text-sm mb-7">
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

          <p className="mt-9 max-w-md mx-auto md:mx-0 text-[#2e406f]/70 dark:text-white/68 leading-8 text-sm md:text-base">
            專注品牌識別、包裝設計、版面編排與插畫，
            以清晰而有質感的視覺傳達內容。
          </p>

          <motion.button
            type="button"
            onClick={scrollToWork}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="mt-10 inline-flex items-center gap-8 rounded-full border border-[#2e406f]/40 dark:border-white/35 px-10 py-5 text-[#2e406f] dark:text-white text-xs font-black tracking-[0.18em] hover:bg-[#ffd9f9]/45 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2e406f] dark:focus-visible:ring-white"
          >
            VIEW WORKS
            <span className="text-lg leading-none">→</span>
          </motion.button>
        </motion.div>

        <div className="relative h-[500px] md:h-[660px]">
          <motion.div
            className="absolute right-0 top-8 w-[76%] h-[78%] rounded-[1.6rem] bg-white/50 dark:bg-white/[0.035] border border-[#2e406f]/10 dark:border-white/10 shadow-[0_24px_70px_rgba(46,64,111,0.08)] motion-safe-layer"
            style={{
              x: gridX,
              y: gridY,
            }}
          >
            <div className="absolute inset-8 border border-[#2e406f]/12 dark:border-white/10" />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#2e406f_1px,transparent_1px),linear-gradient(to_bottom,#2e406f_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.06]" />
          </motion.div>

          <motion.div
            className="absolute left-[8%] top-[9%] w-[46%] h-[52%] rounded-[1.4rem] bg-[#2e406f] shadow-[0_28px_70px_rgba(46,64,111,0.22)] overflow-hidden motion-safe-layer"
            style={{
              x: blueX,
              y: blueY,
              rotate: -1.2,
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.10),transparent_32%)]" />

            <p className="absolute left-9 top-8 text-white text-5xl font-black">
              K
            </p>

            <p className="absolute left-9 top-28 text-white/78 text-xs leading-5">
              Visual
              <br />
              Communication
              <br />
              Design
            </p>

            <span className="absolute right-9 top-11 text-white/80 text-3xl">
              ＋
            </span>

            <div className="absolute right-9 bottom-9 grid grid-cols-4 gap-2">
              {Array.from({ length: 16 }).map((_, i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#ffd9f9]/70"
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="absolute left-[20%] top-[35%] w-[50%] h-[37%] rounded-[1.3rem] bg-[#f8f7f4] dark:bg-[#101722] border border-white/70 dark:border-white/10 shadow-[0_28px_70px_rgba(46,64,111,0.14)] overflow-hidden motion-safe-layer"
            style={{
              x: whiteX,
              y: whiteY,
              rotate: 0.6,
            }}
          >
            <div className="absolute left-0 top-0 w-12 h-12 rounded-br-[1rem] bg-[#ffd9f9]" />

            <div className="absolute left-10 top-24 w-[62%] h-px bg-[#2e406f]/22 dark:bg-white/18" />
            <div className="absolute left-10 top-36 w-[48%] h-px bg-[#2e406f]/18 dark:bg-white/14" />
            <div className="absolute left-10 top-48 w-[70%] h-px bg-[#2e406f]/16 dark:bg-white/12" />

            <div className="absolute right-10 top-24 w-14 h-14 rounded-full border border-[#2e406f]/20 dark:border-white/14" />

            <p className="absolute left-10 bottom-10 text-[#2e406f]/65 dark:text-white/55 text-xs leading-6 tracking-[0.14em] font-semibold">
              BRANDING
              <br />
              PORTFOLIO
            </p>
          </motion.div>

          <motion.div
            className="absolute right-[4%] bottom-[10%] w-[32%] h-[26%] rounded-[1.3rem] bg-[#ffd9f9] shadow-[0_24px_58px_rgba(255,217,249,0.24)] motion-safe-layer"
            style={{
              x: pinkX,
              y: pinkY,
              rotate: 1.6,
            }}
          >
            <div className="absolute right-9 bottom-9 w-14 h-14 rounded-full bg-[#2e406f]" />
            <div className="absolute left-7 top-7 w-12 h-px bg-[#2e406f]" />
          </motion.div>

          <motion.div
            className="absolute right-[16%] bottom-[7%] w-[32%] h-[40%] rounded-[1.2rem] bg-[#2e406f] shadow-[0_28px_70px_rgba(46,64,111,0.24)] motion-safe-layer"
            style={{
              x: blueX,
              y: pinkY,
              rotate: 2.4,
            }}
          >
            <div className="absolute inset-0 opacity-16 bg-[radial-gradient(#ffd9f9_1.5px,transparent_1.5px)] bg-[size:18px_18px]" />

            <p className="absolute left-8 bottom-8 text-white/88 text-xs leading-5">
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
