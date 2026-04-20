/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

// ==========================================
// 🚀 圖片路徑配置 (對齊 GitHub Pages)
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
  id: string;
  thumb: string;
  full: string;
  title?: string;
  type?: 'single' | 'gallery';
  galleryImages?: string[];
  contain?: boolean;
  imageClass?: string;
};

// ==========================================
// 📦 完整作品資料陣列 (不再省略)
// ==========================================
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
    galleryImages: [another6Pic1, another6Pic2, another6Pic3]
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
    galleryImages: [identityGallery1, identityGallery2]
  },
  {
    id: 'identity-1',
    thumb: identity2Image,
    full: identity2Image,
    title: '小黑手工饅頭',
    type: 'gallery',
    galleryImages: [identity2Pic1, identity2Pic2]
  },
  {
    id: 'identity-2',
    thumb: identity3Image,
    full: identity3Image,
    title: '弘霖工程行',
    type: 'gallery',
    contain: true,
    imageClass: 'mix-blend-multiply grayscale contrast-125 brightness-110 opacity-80 dark:invert dark:mix-blend-screen dark:opacity-40', 
    galleryImages: [identity3Pic1, identity3Pic2, identity3Pic3]
  },
  {
    id: 'identity-3',
    thumb: identity4Image,
    full: identity4Image,
    title: 'MYJ服飾',
    type: 'gallery',
    contain: true,
    galleryImages: [identity4Pic1, identity4Pic2, identity4Pic3]
  },
  {
    id: 'identity-4',
    thumb: identity5Image,
    full: identity5Image,
    title: '台式馬卡龍',
    type: 'gallery',
    contain: true,
    galleryImages: [identity5Pic1, identity5Pic2]
  }
];

const layoutWorks: Work[] = [
  {
    id: 'layout-0',
    thumb: layout1Image,
    full: layout1Image,
    title: '菜單',
    type: 'gallery',
    galleryImages: [layout1Pic1, layout1Pic2, layout1Pic3]
  },
  {
    id: 'layout-1',
    thumb: layout2Image,
    full: layout2Image,
    title: '西螺老屋再造計畫手冊',
    type: 'gallery',
    galleryImages: [layoutGallery1, layoutGallery2]
  },
  {
    id: 'layout-2',
    thumb: layout3Image,
    full: layout3Image,
    title: '吉福堂',
    type: 'gallery',
    contain: true,
    imageClass: 'p-10',
    galleryImages: [layout3Pic1, layout3Pic2]
  }
];

const packageWorks: Work[] = [
  { id: 'package-0', thumb: package1Image, full: package1Image, title: 'MOOD咖啡包、外帶杯', type: 'single' },
  { id: 'package-1', thumb: package2Image, full: package2Image, title:
