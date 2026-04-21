/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

// ==========================================
// 🚀 圖片路徑配置 (100% 留存)
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

type Work = { id: string; thumb: string; full: string; title?: string; type?: 'single' | 'gallery'; galleryImages?: string[]; contain?: boolean; imageClass?: string; };

const categories = [
  { id: 'identity', title: 'IDENTITY', color: 'bg-neutral-300', image: identityImage, position: 'object-left', works: [
    { id: 'identity-0', thumb: identity1Image, full: identity1Image, title: '攝影展主視覺', type: 'gallery', contain: true, imageClass: 'object-left p-2', galleryImages: [identityGallery1, identityGallery2] },
    { id: 'identity-1', thumb: identity2Image, full: identity2Image, title: '小黑手工饅頭', type: 'gallery', galleryImages: [identity2Pic1, identity2Pic2] },
    { id: 'identity-2', thumb: identity3Image, full: identity3Image, title: '弘霖工程行', type: 'gallery', contain: true, imageClass: 'mix-blend-multiply grayscale contrast-125 brightness-110 opacity-80 dark:invert dark:mix-blend-screen dark:opacity-40', galleryImages: [identity3Pic1, identity3Pic2, identity3Pic3] },
    { id: 'identity-3', thumb: identity4Image, full: identity4Image, title: 'MYJ服飾', type: 'gallery', contain: true, galleryImages: [identity4Pic1, identity4Pic2, identity4Pic3] },
    { id: 'identity-4', thumb: identity5Image, full: identity5Image, title: '台式馬卡龍', type: 'gallery', contain: true, galleryImages: [identity5Pic1, identity5Pic2] }
  ] },
  { id: 'layout', title: 'LAYOUT', color: 'bg-neutral-100', image: layoutImage, customClass: 'scale-[1.8]', works: [
    { id: 'layout-0', thumb: layout1Image, full: layout1Image, title: '菜單', type: 'gallery', galleryImages: [layout1Pic1, layout1Pic2, layout1Pic3] },
    { id: 'layout-1', thumb: layout2Image, full: layout2Image, title: '西螺老屋再造計畫手冊', type: 'gallery', galleryImages: [layoutGallery1, layoutGallery2] },
    { id: 'layout-2', thumb: layout3Image, full: layout3Image, title: '吉福堂', type: 'gallery', contain: true, imageClass: 'p-10', galleryImages: [layout3Pic1, layout3Pic2] }
  ] },
  { id: 'package', title: 'PACKAGE DESIGN', color: 'bg-neutral-400', image: packageImage, works: [
    { id: 'package-0', thumb: package1Image, full: package1Image, title: 'MOOD咖啡包、外帶杯', type: 'single' },
    { id: 'package-1', thumb: package2Image, full: package2Image, title: '甜點包裝', type: 'single' }
  ] },
  { id: 'illustration', title: 'ILLUSTRATION', color: 'bg-neutral-200', image: illustrationImage, works: [
    { id: 'illustration-0', thumb: illustration1Image, full: illustration1Image, title: '明信片設計', type: 'single' },
    { id: 'illustration-1', thumb: illustration2Image, full: illustration2Image, title: '似顏繪明信片', type: 'single' }
  ] },
  { id: 'another', title: 'ANOTHER', color: 'bg-neutral-500', image: another1Image, works: [
    { id: 'another-0', thumb: another1Image, full: another1Image, type: 'single', title: '廣宣品' },
    { id: 'another-1', thumb: another2Image, full: another2Image, type: 'single', title: '資訊圖資' },
    { id: 'another-2', thumb: another3Image, full: another3Image, type: 'single', title: '刀模客製' },
    { id: 'another-3', thumb: another4Image, full: another4Image, type: 'single', title: '亞馬遜電商Premium A+' },
    { id: 'another-4', thumb: another5Image, full: another5Image, type: 'single', title: '蝦皮電商圖' },
    { id: 'another-5', thumb: another6Image, full: another6Image, type: 'gallery', title: '社群通知貼圖', contain: true, galleryImages: [another6Pic1, another6Pic2, another6Pic3] }
  ] },
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

  const isScrollingToTop = useRef(false);

  // ==========================================
  // ✨ 核心修復：接管捲動控制權
  // ==========================================
  useEffect(() => {
    // 禁止瀏覽器自動恢復捲動位置，防止衝突
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const parts = hash.split('/');
      const catId = parts[0];

      if (!hash || hash === 'home') {
        setSelectedCategory(null);
        setSelectedWork(null);
        setEnlargedImage(null);

        if (window.scrollY > 20) {
          isScrollingToTop.current = true;
          // 強制同步 Bar 顯示為 Home
          setActiveSection('home'); 
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          setTimeout(() => { isScrollingToTop.current = false; }, 1000);
        }
      } 
      else if (hash === 'view') {
        setSelectedCategory(null);
        setSelectedWork(null);
        setEnlargedImage(null);
      } 
      else {
        const currentCat = categories.find(c => c.id === catId);
        if (currentCat) {
          setSelectedCategory(catId);
          const workId = parts[1];
          if (workId) {
            const currentWork = currentCat.works?.find(w => w.id === workId);
            setSelectedWork(currentWork || null);
            setEnlargedImage(parts[2] ? decodeURIComponent(parts.slice(2).join('/')) : null);
          } else {
            setSelectedWork(null);
            setEnlargedImage(null);
          }
        }
      }
    };

    const handleManualScroll = () => {
      if (isScrollingToTop.current || selectedCategory || selectedWork || enlargedImage) return;

      const isPastHero = window.scrollY > 150;
      const currentHash = window.location.hash;

      if (isPastHero && !currentHash) {
        window.history.pushState({ isView: true }, '', '#view');
      } else if (!isPastHero && currentHash === '#view') {
        window.history.replaceState(null, '', window.location.pathname);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('scroll', handleManualScroll);
    handleHashChange(); 

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('scroll', handleManualScroll);
    };
  }, [selectedCategory, selectedWork, enlargedImage]);

  const handleNavClick = (id: string) => {
    if (id === 'home') {
      isScrollingToTop.current = true;
      setActiveSection('home');
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', window.location.pathname);
      setTimeout(() => { isScrollingToTop.current = false; }, 1000);
      setSelectedCategory(null);
    } else {
      const el = document.getElementById(id);
      if (el) {
        window.history.replaceState(null, '', '#view');
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleSetSelectedCategory = (id: string | null) => {
    if (id) window.location.hash = id;
    else window.history.back();
  };

  const handleSetSelectedWork = (work: Work | null) => {
    if (work && selectedCategory) window.location.hash = `${selectedCategory}/${work.id}`;
    else window.history.back();
  };

  const handleSetEnlargedImage = (img: string | null) => {
    if (img && selectedCategory && selectedWork) {
      window.location.hash = `${selectedCategory}/${selectedWork.id}/${encodeURIComponent(img)}`;
    } else window.history.back();
  };

  useEffect(() => {
    if (selectedCategory || selectedWork || enlargedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedCategory, selectedWork, enlargedImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && (selectedCategory || selectedWork || enlargedImage)) {
        window.history.back();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCategory, selectedWork, enlargedImage]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleScroll = () => {
      // 💡 關鍵修復：如果在自動置頂期間，不要讓偵測器亂切導覽列狀態
      if (isScrollingToTop.current) return;
      
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
      <style dangerouslySetInnerHTML={{ __html: `
        .category-card img, .work-card img {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) !important;
          will-change: transform;
          backface-visibility: hidden;
          transform: translateZ(0) scale(1);
        }
        .category-card:hover img { transform: translateZ(0) scale(1.08) !important; }
      `}} />

      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-brand origin-left z-[100]" style={{ scaleX }} />
      
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

      <Navigation 
        activeSection={activeSection} 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        setIsHovering={setIsHovering}
        onNavClick={handleNavClick} 
      />

      <main className="flex-1 w-full">
        <HomeHero isDarkMode={isDarkMode} heroMobileImage={heroMobileImage} heroSvg={heroSvg} heroMobileDarkImage={heroMobileDarkImage} heroDarkSvg={heroDarkSvg} />
        <WorkSection categories={categories} setSelectedCategory={handleSetSelectedCategory} setIsHovering={setIsHovering} />
        <AboutSection />
        <ContactSection setIsHovering={setIsHovering} />
      </main>

      <Footer />

      <Modals 
        activeCategoryData={activeCategoryData}
        setSelectedCategory={handleSetSelectedCategory}
        selectedWork={selectedWork}
        setSelectedWork={handleSetSelectedWork} 
        enlargedImage={enlargedImage}
        setEnlargedImage={handleSetEnlargedImage} 
        setIsHovering={setIsHovering}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}
