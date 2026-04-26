import { img } from './images';

export type Work = {
  id: string;
  thumb: string;
  full: string;
  title?: string;
  type?: 'single' | 'gallery';
  galleryImages?: string[];
  contain?: boolean;
  imageClass?: string;
  customClass?: string;
};

export const heroImages = {
  heroSvg: img('hero.svg'),
  heroDarkSvg: img('hero-dark.svg'),
  heroMobileImage: img('hero-mobile.png'),
  heroMobileDarkImage: img('hero-mobile-dark.svg'),
};

const anotherWorks: Work[] = [
  { id: 'another-0', thumb: img('another-1.png'), full: img('another-1.png'), type: 'gallery', galleryImages: [img('another-1.png')], title: '廣宣品' },
  { id: 'another-1', thumb: img('another-2.png'), full: img('another-2.png'), type: 'gallery', galleryImages: [img('another-2.png')], title: '資訊圖資' },
  { id: 'another-2', thumb: img('another-3.png'), full: img('another-3.png'), type: 'gallery', galleryImages: [img('another-3.png')], title: '刀模客製' },
  { id: 'another-3', thumb: img('another-4.png'), full: img('another-4.png'), type: 'gallery', galleryImages: [img('another-4.png')], title: '亞馬遜電商Premium A+' },
  { id: 'another-4', thumb: img('another-5.png'), full: img('another-5.png'), type: 'gallery', galleryImages: [img('another-5.png')], title: '蝦皮電商圖' },
  {
    id: 'another-5',
    thumb: img('another-6.png'),
    full: img('another-6.png'),
    type: 'gallery',
    title: '社群通知貼圖',
    contain: true,
    galleryImages: [img('another6-pic1.png'), img('another6-pic2.png'), img('another6-pic3.png')],
  },
];

const identityWorks: Work[] = [
  {
    id: 'identity-0',
    thumb: img('identity-1.png'),
    full: img('identity-1.png'),
    title: '攝影展主視覺',
    type: 'gallery',
    contain: true,
    imageClass: 'object-left p-2',
    galleryImages: [img('identity1-pic1.png'), img('identity1-pic2.png')],
  },
  {
    id: 'identity-1',
    thumb: img('identity-2.svg'),
    full: img('identity-2.svg'),
    title: '小黑手工饅頭',
    type: 'gallery',
    galleryImages: [img('identity2-pic1.svg'), img('identity2-pic2.png')],
  },
  {
    id: 'identity-2',
    thumb: img('identity-3.svg'),
    full: img('identity-3.svg'),
    title: '弘霖工程行',
    type: 'gallery',
    contain: true,
    imageClass: 'mix-blend-multiply grayscale contrast-125 brightness-110 opacity-80 dark:invert dark:mix-blend-screen dark:opacity-40',
    galleryImages: [img('identity3-pic1.png'), img('identity3-pic2.png'), img('identity3-pic3.png')],
  },
  {
    id: 'identity-3',
    thumb: img('identity-4.svg'),
    full: img('identity-4.svg'),
    title: 'MYJ服飾',
    type: 'gallery',
    contain: true,
    galleryImages: [img('identity4-pic1.png'), img('identity4-pic2.png'), img('identity4-pic3.png')],
  },
  {
    id: 'identity-4',
    thumb: img('identity-5.svg'),
    full: img('identity-5.svg'),
    title: '台式馬卡龍',
    type: 'gallery',
    contain: true,
    galleryImages: [img('identity5-pic1.png'), img('identity5-pic2.png')],
  },
];

const layoutWorks: Work[] = [
  {
    id: 'layout-0',
    thumb: img('layout-1.png'),
    full: img('layout-1.png'),
    title: '菜單',
    type: 'gallery',
    galleryImages: [img('layout1-pic1.png'), img('layout1-pic2.png'), img('layout1-pic3.png')],
  },
  {
    id: 'layout-1',
    thumb: img('layout-2.png'),
    full: img('layout-2.png'),
    title: '西螺老屋再造計畫手冊',
    type: 'gallery',
    galleryImages: [img('layout2-pic1.png'), img('layout2-pic2.png')],
  },
  {
    id: 'layout-2',
    thumb: img('layout-3.png'),
    full: img('layout-3.png'),
    title: '吉福堂',
    type: 'gallery',
    contain: true,
    imageClass: 'p-10',
    galleryImages: [img('layout3-pic1.png'), img('layout3-pic2.png')],
  },
];

const packageWorks: Work[] = [
  {
    id: 'package-2',
    thumb: img('package-3.png'),
    full: img('package-3.png'),
    title: '東港囡仔',
    type: 'gallery',
    contain: true,
    galleryImages: [img('package3-pic1.png'), img('package3-pic2.png'), img('package3-pic3.png')],
  },
  {
    id: 'package-0',
    thumb: img('package-1.png'),
    full: img('package-1.png'),
    title: 'MOOD咖啡包、外帶杯',
    type: 'gallery',
    galleryImages: [img('package-1.png')],
  },
  {
    id: 'package-1',
    thumb: img('package-2.jpg'),
    full: img('package-2.jpg'),
    title: '甜點包裝',
    type: 'gallery',
    galleryImages: [img('package-2.jpg')],
  },
];

const illustrationWorks: Work[] = [
  {
    id: 'illustration-0',
    thumb: img('illustration-1.jpg'),
    full: img('illustration-1.jpg'),
    title: '明信片設計',
    type: 'gallery',
    galleryImages: [img('illustration-1.jpg')],
  },
  {
    id: 'illustration-1',
    thumb: img('illustration-2.jpg'),
    full: img('illustration-2.jpg'),
    title: '似顏繪明信片',
    type: 'gallery',
    galleryImages: [img('illustration-2.jpg')],
  },
];

export const categories = [
  {
    id: 'identity',
    title: 'IDENTITY',
    color: 'bg-neutral-300',
    image: img('identity.png'),
    position: 'object-left',
    works: identityWorks,
  },
  {
    id: 'layout',
    title: 'LAYOUT',
    color: 'bg-neutral-100',
    image: img('layout.png'),
    customClass: 'scale-[1.8]',
    works: layoutWorks,
  },
  {
    id: 'package',
    title: 'PACKAGE DESIGN',
    color: 'bg-neutral-400',
    image: img('package-design.png'),
    works: packageWorks,
  },
  {
    id: 'illustration',
    title: 'ILLUSTRATION',
    color: 'bg-neutral-200',
    image: img('illustration.jpg'),
    works: illustrationWorks,
  },
  {
    id: 'another',
    title: 'ANOTHER',
    color: 'bg-neutral-500',
    image: img('another-1.png'),
    works: anotherWorks,
  },
];
