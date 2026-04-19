/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, useMotionValue } from 'motion/react';
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import heroSvg from './hero.svg';
import heroDarkSvg from './hero-dark.svg';
import heroMobileImage from './hero-mobile.png';
import heroMobileDarkImage from './hero-mobile-dark.svg';
import layoutImage from './layout.png';
import identityImage from './identity.png';
import packageImage from './package-design.png';
import illustrationImage from './illustration.jpg';
import another1Image from './another-1.png';
import another2Image from './another-2.png';
import another3Image from './another-3.png';
import another4Image from './another-4.png';
import another5Image from './another-5.png';
import another6Image from './another-6.png';
import another6Pic1 from './another6-pic1.png';
import another6Pic2 from './another6-pic2.png';
import another6Pic3 from './another6-pic3.png';
import identity1Image from './identity-1.png';
import identityGallery1 from './identity1-pic1.png';
import identityGallery2 from './identity1-pic2.png';
import layoutGallery1 from './layout2-pic1.png';
import layoutGallery2 from './layout2-pic2.png';
import layout1Image from './layout-1.png';
import layout2Image from './layout-2.png';
import layout3Image from './layout-3.png';
import layout1Pic1 from './layout1-pic1.png';
import layout1Pic2 from './layout1-pic2.png';
import layout1Pic3 from './layout1-pic3.png';
import layout3Pic1 from './layout3-pic1.png';
import layout3Pic2 from './layout3-pic2.png';
import identity2Image from './identity-2.svg';
import identity2Pic1 from './identity2-pic1.svg';
import identity2Pic2 from './identity2-pic2.png';
import identity3Image from './identity-3.png';
import identity3Pic1 from './identity3-pic1.png';
import identity3Pic2 from './identity3-pic2.png';
import identity3Pic3 from './identity3-pic3.png';
import identity4Image from './identity-4.svg';
import identity4Pic1 from './identity4-pic1.png';
import identity4Pic2 from './identity4-pic2.png';
import identity4Pic3 from './identity4-pic3.png';
import identity5Image from './identity-5.svg';
import identity5Pic1 from './identity5-pic1.png';
import identity5Pic2 from './identity5-pic2.png';
import package1Image from './package-1.png';
import package2Image from './package-2.jpg';
import illustration1Image from './illustration-1.jpg';
import illustration2Image from './illustration-2.jpg';

import { Navigation } from './components/Navigation';
import { HomeHero } from './components/HomeHero';
import { WorkSection } from './components/WorkSection';
import { AboutSection, ContactSection } from './components/AboutContact';
import { Footer } from './components/Footer';
import { Modals } from './components/Modals';

type Work = {
  id: string;
  thumb: string;
  full: string;
  title?: string;
  type?: 'single' | 'gallery';
  galleryImages?: string[];
  contain?: boolean;
  imageClass?: string;
};

const anotherWorks: Work[] = [
  { id: 'another-0', thumb: another1Image, full: another1Image, type: 'single', title: '廣宣品' },
  { id: 'another-1', thumb: another2Image, full: another2Image, type: 'single', title: '資訊圖資' },
  { id: 'another-2', thumb: another3Image, full: another3Image, type: 'single', title: '刀模客製' },
  { id: 'another-3', thumb: another4Image, full: another4Image, type: 'single', title: '亞馬遜電商Premium A+' },
  { id: 'another-4', thumb: another5Image, full: another5Image, type: 'single', title: '蝦皮電商圖' },
  { 
    id: 'another-5', 
    thumb: another6Image, 
    full: another6Image, 
    type: 'gallery', 
    title: '社群通知貼圖',
    contain: true,
    galleryImages: [
      another6Pic1,
      another6Pic2,
      another6Pic3
    ]
  },
];

const identityWorks: Work[] = [
  {
    id: 'identity-0',
    thumb: identity1Image,
    full: identity1Image,
    title: '攝影展主視覺',
    type: 'gallery',
    contain: true,
    imageClass: 'object-left p-2',
    galleryImages: [
      identityGallery1,
      identityGallery2
    ]
  },
  {
    id: 'identity-1',
    thumb: identity2Image,
    full: identity2Image,
    title: '小黑手工饅頭',
    type: 'gallery',
    galleryImages: [
      identity2Pic1,
      identity2Pic2
    ]
  },
  {
    id: 'identity-2',
    thumb: identity3Image,
    full: identity3Image,
    title: '弘霖工程行',
    type: 'gallery',
    contain: true,
    imageClass: 'mix-blend-multiply grayscale contrast-125 brightness-110 opacity-80 dark:invert dark:mix-blend-screen dark:opacity-40',
    galleryImages: [
      identity3Pic1,
      identity3Pic2,
      identity3Pic3
    ]
  },
  {
    id: 'identity-3',
    thumb: identity4Image,
    full: identity4Image,
    title: 'MYJ服飾',
    type: 'gallery',
    contain: true,
    galleryImages: [
      identity4Pic1,
      identity4Pic2,
      identity4Pic3
    ]
  },
  {
    id: 'identity-4',
    thumb: identity5Image,
    full: identity5Image,
    title: '台式馬卡龍',
    type: 'gallery',
    contain: true,
    galleryImages: [
      identity5Pic1,
      identity5Pic2
    ]
  }
];

const layoutWorks: Work[] = [
  {
    id: 'layout-0',
    thumb: layout1Image,
    full: layout1Image,
    title: '菜單',
    type: 'gallery',
    galleryImages: [
      layout1Pic1,
      layout1Pic2,
      layout1Pic3
    ]
  },
  {
    id: 'layout-1',
    thumb: layout2Image,
    full: layout2Image,
    title: '西螺老屋再造計畫手冊',
    type: 'gallery',
    galleryImages: [
      layoutGallery1,
      layoutGallery2
    ]
  },
  {
    id: 'layout-2',
    thumb: layout3Image,
    full: layout3Image,
    title: '吉福堂',
    type: 'gallery',
    contain: true,
    imageClass: 'p-10',
    galleryImages: [
      layout3Pic1,
      layout3Pic2
    ]
  }
];

const packageWorks: Work[] = [
  {
    id: 'package-0',
    thumb: package1Image,
    full: package1Image,
    title: 'MOOD咖啡包、外帶杯',
    type: 'single'
  },
  {
    id: 'package-1',
    thumb: package2Image,
    full: package2Image,
    title: '甜點包裝',
    type: 'single'
  }
];

const illustrationWorks: Work[] = [
  {
    id: 'illustration-0',
    thumb: illustration1Image,
    full: illustration1Image,
    title: '明信片設計',
    type: 'single'
  },
  {
    id: 'illustration-1',
    thumb: illustration2Image,
    full: illustration2Image,
    title: '似顏繪明信片',
    type: 'single'
  }
];

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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  // Smooth springs for the cursor
  const mouseXSpring = useSpring(mouseX, { damping: 25, stiffness: 200, mass: 0.5 });
  const mouseYSpring = useSpring(mouseY, { damping: 25, stiffness: 200, mass: 0.5 });
  const dotXSpring = useSpring(mouseX, { damping: 15, stiffness: 500, mass: 0.1 });
  const dotYSpring = useSpring(mouseY, { damping: 15, stiffness: 500, mass: 0.1 });

  useEffect(() => {
    let touchTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseX.set(e.touches[0].clientX);
        mouseY.set(e.touches[0].clientY);
      }
    };
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouseX.set(e.touches[0].clientX);
        mouseY.set(e.touches[0].clientY);
        
        const target = e.target as HTMLElement;
        const isInteractive = target.closest('button, a, [role="button"], img');
        
        if (isInteractive) {
          setIsHovering(true);
          clearTimeout(touchTimeout);
        } else {
          setIsHovering(false);
        }
      }
    };
    const handleTouchEnd = () => {
      // Delay the un-hover so the color switch animation has time to be seen by the user on mobile
      touchTimeout = setTimeout(() => {
        setIsHovering(false);
      }, 400);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(touchTimeout);
    };
  }, [mouseX, mouseY]);

  const activeCategoryData = categories.find(c => c.id === selectedCategory);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'work', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900 transition-colors duration-500">
      {/* Liquid Glass SVG Filter */}
      <svg width="0" height="0" style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
        <defs>
          <filter id="liquid_glass_filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.003" numOctaves="2" seed="7" result="noise"/>
            <feGaussianBlur in="noise" stdDeviation="1.2" result="map"/>
            <feDisplacementMap in="SourceGraphic" in2="map" scale="110" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
      </svg>

      {/* Global Noise Texture for cohesion */}
      <div className="fixed inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-50 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} aria-hidden="true"></div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-brand origin-left z-[100]"
        style={{ scaleX }}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={NaN} /* Would need scroll tracking for accurate percentage, hiding from SR is generally fine for purely visual progress bars */
        aria-hidden="true"
      />

      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] shadow-sm overflow-hidden will-change-transform"
        style={{ 
          x: mouseXSpring, 
          y: mouseYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          backgroundColor: isHovering ? '#ffd9f9' : '#2e406f',
          scale: isHovering ? 1.1 : 1,
          opacity: isHovering ? 0.8 : 1,
        }}
      >
        {/* Grainy Texture Overlay */}
        <div className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[101] overflow-hidden will-change-transform"
        style={{ 
          x: dotXSpring, 
          y: dotYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          backgroundColor: isHovering ? '#ffffff' : '#ffd9f9',
        }}
      >
        {/* Grainy Texture Overlay for small dot */}
        <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </motion.div>

      <Navigation 
        activeSection={activeSection} 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode} 
        setIsHovering={setIsHovering} 
      />

<main id="main-content">
      <HomeHero 
        isDarkMode={isDarkMode} 
        heroMobileImage={heroMobileImage} 
        heroSvg={heroSvg} 
        heroMobileDarkImage={heroMobileDarkImage} 
        heroDarkSvg={heroDarkSvg} 
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
