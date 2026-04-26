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

  const mouseXSpring = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const mouseYSpring = useSpring(mouseY, { damping: 25, stiffness: 200 });
  const dotXSpring = useSpring(mouseX, { damping: 15, stiffness: 500 });
  const dotYSpring = useSpring(mouseY, { damping: 15, stiffness: 500 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const activeCategoryData = categories.find((category) => category.id === selectedCategory);

  useEffect(() => {
    if (selectedCategory || selectedWork || enlargedImage) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [selectedCategory, selectedWork, enlargedImage]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && (selectedCategory || selectedWork || enlargedImage)) {
        window.history.back();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCategory, selectedWork, enlargedImage]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="min-h-screen w-full flex flex-col bg-white dark:bg-neutral-950 transition-colors duration-500 overflow-x-hidden relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-brand origin-left z-[100]"
        style={{ scaleX }}
      />

      <motion.div
        className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100]"
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
      />

      <motion.div
        className="hidden md:block fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[101] bg-white"
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

      <main className="flex-1 w-full">
        <HomeHero
          isDarkMode={isDarkMode}
          heroMobileImage={heroImages.heroMobileImage}
          heroSvg={heroImages.heroSvg}
          heroMobileDarkImage={heroImages.heroMobileDarkImage}
          heroDarkSvg={heroImages.heroDarkSvg}
        />

        <WorkSection
          categories={categories}
          setSelectedCategory={setSelectedCategory}
          setIsHovering={setIsHovering}
        />

        <AboutSection />
        <ContactSection setIsHovering={setIsHovering} />
      </main>

      <Footer />

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
