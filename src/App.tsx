import { motion, useMotionValue, useScroll, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

import { Navigation } from './components/Navigation';
import { HomeHero } from './components/HomeHero';
import { WorkSection } from './components/WorkSection';
import { AboutSection, ContactSection } from './components/AboutContact';
import { Footer } from './components/Footer';
import { Modals } from './components/Modals';

import { categories, heroImages } from './data/works';
import { useActiveSection } from './hooks/useActiveSection';
import { usePortfolioRouting } from './hooks/usePortfolioRouting';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const { activeSection, handleNavClick } = useActiveSection();

  const {
    selectedCategory,
    selectedWork,
    enlargedImage,
    setSelectedCategory,
    setSelectedWork,
    setEnlargedImage,
  } = usePortfolioRouting(categories);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 滑鼠外圈：保留原本跟隨感，但減少拖慢
  const mouseXSpring = useSpring(mouseX, {
    damping: 32,
    stiffness: 320,
    mass: 0.35,
  });

  const mouseYSpring = useSpring(mouseY, {
    damping: 32,
    stiffness: 320,
    mass: 0.35,
  });

  // 中心小點：反應更快
  const dotXSpring = useSpring(mouseX, {
    damping: 26,
    stiffness: 750,
    mass: 0.22,
  });

  const dotYSpring = useSpring(mouseY, {
    damping: 26,
    stiffness: 750,
    mass: 0.22,
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const activeCategoryData = categories.find(
    (category) => category.id === selectedCategory,
  );

  useEffect(() => {
    if (selectedCategory || selectedWork || enlargedImage) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [selectedCategory, selectedWork, enlargedImage]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === 'Escape' &&
        (selectedCategory || selectedWork || enlargedImage)
      ) {
        window.history.back();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCategory, selectedWork, enlargedImage]);

  // 滑鼠效能優化：用 requestAnimationFrame 限制更新頻率
  useEffect(() => {
    let frameId: number | null = null;
    let latestX = 0;
    let latestY = 0;

    const updateMousePosition = () => {
      mouseX.set(latestX);
      mouseY.set(latestY);
      frameId = null;
    };

    const handleMouseMove = (event: MouseEvent) => {
      latestX = event.clientX;
      latestY = event.clientY;

      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateMousePosition);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [mouseX, mouseY]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#f8f7f4] dark:bg-[#070b12] transition-colors duration-500 overflow-x-hidden relative selection:bg-[#ffd9f9] selection:text-[#2e406f]">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#ffd9f9] origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* 自訂滑鼠外圈 */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] will-change-transform"
        style={{
          x: mouseXSpring,
          y: mouseYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          backgroundColor: isHovering ? '#ffd9f9' : '#2e406f',
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.6 : 1,
        }}
        transition={{
          backgroundColor: { duration: 0.18 },
          scale: { duration: 0.18 },
          opacity: { duration: 0.18 },
        }}
      />

      {/* 自訂滑鼠中心點 */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[101] bg-white will-change-transform"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      <Navigation
        activeSection={activeSection}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        setIsHovering={setIsHovering}
        onNavClick={handleNavClick}
      />

      <main id="main-content" className="flex-1 w-full">
        <HomeHero
          isDarkMode={isDarkMode}
          heroMobileImage={heroImages.heroMobileImage}
          heroSvg={heroImages.heroSvg}
          heroMobileDarkImage={heroImages.heroMobileDarkImage}
          heroDarkSvg={heroImages.heroDarkSvg}
          setIsHovering={setIsHovering}
        />

        <WorkSection
          categories={categories}
          setSelectedCategory={setSelectedCategory}
          setIsHovering={setIsHovering}
        />

        <AboutSection setIsHovering={setIsHovering} />
        <ContactSection setIsHovering={setIsHovering} />
      </main>

      <Footer setIsHovering={setIsHovering} />

      <Modals
        activeCategoryData={activeCategoryData}
        setSelectedCategory={setSelectedCategory}
        selectedWork={selectedWork}
        setSelectedWork={setSelectedWork}
        enlargedImage={enlargedImage}
        setEnlargedImage={setEnlargedImage}
        setIsHovering={setIsHovering}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
