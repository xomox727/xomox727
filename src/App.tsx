/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

// ==========================================
// 🚀 圖片路徑配置 (已對齊 GitHub Pages)
// ==========================================
const heroSvg = '/xomox727/hero.svg';
const heroDarkSvg = '/xomox727/hero-dark.svg';
const heroMobileImage = '/xomox727/hero-mobile.png';
const heroMobileDarkImage = '/xomox727/hero-mobile-dark.svg';
const layoutImage = '/xomox727/layout.png';
const identityImage = '/xomox727/identity.png';
const packageImage = '/xomox727/package-design.png';
const illustrationImage = '/xomox727/illustration.jpg';
const another1Image = '/xomox727/another-1.png';
const another2Image = '/xomox727/another-2.png';
const another3Image = '/xomox727/another-3.png';
const another4Image = '/xomox727/another-4.png';
const another5Image = '/xomox727/another-5.png';
const another6Image = '/xomox727/another-6.png';
const another6Pic1 = '/xomox727/another6-pic1.png';
const another6Pic2 = '/xomox727/another6-pic2.png';
const another6Pic3 = '/xomox727/another6-pic3.png';
const identity1Image = '/xomox727/identity-1.png';
const identityGallery1 = '/xomox727/identity1-pic1.png';
const identityGallery2 = '/xomox727/identity1-pic2.png';
const layoutGallery1 = '/xomox727/layout2-pic1.png';
const layoutGallery2 = '/xomox727/layout2-pic2.png';
const layout1Image = '/xomox727/layout-1.png';
const layout2Image = '/xomox727/layout-2.png';
const layout3Image = '/xomox727/layout-3.png';
const layout1Pic1 = '/xomox727/layout1-pic1.png';
const layout1Pic2 = '/xomox727/layout1-pic2.png';
const layout1Pic3 = '/xomox727/layout1-pic3.png';
const layout3Pic1 = '/xomox727/layout3-pic1.png';
const layout3Pic2 = '/xomox727/layout3-pic2.png';
const identity2Image = '/xomox727/identity-2.svg';
const identity2Pic1 = '/xomox727/identity2-pic1.svg';
const identity2Pic2 = '/xomox727/identity2-pic2.png';
const identity3Image = '/xomox727/identity-3.svg'; 
const identity3Pic1 = '/xomox727/identity3-pic1.png';
const identity3Pic2 = '/xomox727/identity3-pic2.png';
const identity3Pic3 = '/xomox727/identity3-pic3.png';
const identity4Image = '/xomox727/identity-4.svg';
const identity4Pic1 = '/xomox727/identity4-pic1.png';
const identity4Pic2 = '/xomox727/identity4-pic2.png';
const identity4Pic3 = '/xomox727/identity4-pic3.png';
const identity5Image = '/xomox727/identity-5.svg';
const identity5Pic1 = '/xomox727/identity5-pic1.png';
const identity5Pic2 = '/xomox727/identity5-pic2.png';
const package1Image = '/xomox727/package-1.png';
const package2Image = '/xomox727/package-2.jpg';
const illustration1Image = '/xomox727/illustration-1.jpg';
const illustration2Image = '/xomox727/illustration-2.jpg';

import { Navigation } from './components/Navigation';
import { HomeHero } from './components/HomeHero';
import { WorkSection } from './components/WorkSection';
import { AboutSection, ContactSection } from './components/AboutContact';
import { Footer } from './components/Footer';
import { Modals } from './components/Modals';

type Work = {
  id: string; thumb: string; full: string; title?: string;
  type?: 'single' | 'gallery'; galleryImages?: string[];
  contain?: boolean; imageClass?: string;
};

// ... 此處省略作品資料陣列 (anotherWorks, identityWorks, layoutWorks 等，內容維持不變)

const categories = [
  { id: 'identity', title: 'IDENTITY', color: 'bg-neutral-300', image: identityImage, position: 'object-left', works: identityWorks },
  { id: 'layout', title: 'LAYOUT', color: 'bg-neutral-100', image: layoutImage, customClass: 'scale-[1.8]', works: layoutWorks },
  { id: 'package', title: 'PACKAGE DESIGN', color: 'bg-neutral-400', image: packageImage, works: packageWorks },
  { id: 'illustration', title: 'ILLUSTRATION', color: 'bg-neutral-200', image: illustrationImage, works: illustrationWorks },
  { id: 'another', title: 'ANOTHER', color: 'bg-neutral-500', image: another1Image, works: anotherWorks },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const mouseXSpring = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const mouseYSpring = useSpring(mouseY, { damping: 25, stiffness: 200 });
  const dotXSpring = useSpring(mouseX, { damping: 15, stiffness: 500 });
  const dotYSpring = useSpring(mouseY, { damping: 15, stiffness: 500 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'work', 'about', 'contact'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) setActiveSection(current);
      setShowBackToTop(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  const activeCategoryData = categories.find(c => c.id === selectedCategory);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div className="min-h-screen w-full flex flex-col bg-white dark:bg-neutral-950 transition-colors duration-500 overflow-x-hidden">
      
      {/* 🛠️ 終極防抖 CSS：改用 GPU 直接渲染 */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* 針對 WORK 那五格圖片的直接強制優化 */
        .category-card img, .work-card img {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translateZ(0) scale(1);
        }

        /* 滑鼠移入時，避開 JS 計算，改用 CSS 強制放大 */
        .category-card:hover img {
          transform: translateZ(0) scale(1.08) !important;
        }

        /* 移除任何可能導致抖動的模糊濾鏡重繪 */
        .category-card {
          isolation: isolate;
          overflow: hidden;
        }
      `}} />

      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-brand origin-left z-[100]" style={{ scaleX }} />
      
      {/* 滑鼠球 */}
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100]"
        style={{ x: mouseXSpring, y: mouseYSpring, translateX: '-50%', translateY: '-50%' }}
        animate={{
          backgroundColor: isHovering ? '#ffd9f9' : '#2e406f',
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.6 : 1,
        }}
      />
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[101] bg-white"
        style={{ x: dotXSpring, y: dotYSpring, translateX: '-50%', translateY: '-50%' }}
      />

      <Navigation activeSection={activeSection} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setIsHovering={setIsHovering} />

      <main className="flex-1 w-full">
        <HomeHero isDarkMode={isDarkMode} heroMobileImage={heroMobileImage} heroSvg={heroSvg} heroMobileDarkImage={heroMobileDarkImage} heroDarkSvg={heroDarkSvg} />
        {/* 請確保 WorkSection 裡面的每個卡片都有 category-card 這個 class */}
        <WorkSection categories={categories} setSelectedCategory={setSelectedCategory} setIsHovering={setIsHovering} />
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
