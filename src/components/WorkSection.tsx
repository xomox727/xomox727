import React, { useState } from 'react';
import { motion } from 'framer-motion'; // 或是 'motion/react' 依照你的設定

interface WorkSectionProps {
  categories: any[];
  setSelectedCategory: (id: string) => void;
  setIsHovering: (val: boolean) => void;
}

export const WorkSection = React.memo(({ categories, setSelectedCategory, setIsHovering }: WorkSectionProps) => {
  return (
    <section id="work" className="min-h-screen flex flex-col items-center justify-center py-32 px-6">
      
      {/* 🚀 殺手鐧：將防抖 CSS 直接注入到這個區塊 */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* 1. 確保卡片容器在縮放時，邊緣絕對鎖死，不重新運算排版 */
        .work-card {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
          will-change: flex, width;
        }

        /* 2. 圖片縮放交給純 CSS GPU 處理，絕對不抖 */
        .work-card-img {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease !important;
          will-change: transform;
          backface-visibility: hidden;
          transform: translateZ(0) scale(1);
        }

        /* 3. Hover 時的縮放，強制使用硬體加速 */
        .work-card:hover .work-card-img {
          transform: translateZ(0) scale(1.08) !important;
        }
      `}} />

      <motion.ul 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-row flex-wrap gap-4 w-full max-w-7xl justify-center group/list list-none p-0 m-0"
      >
        {categories.map((cat, index) => (
          <motion.li
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            // 🚨 關鍵修正：只 transition 寬度相關屬性，拿掉 transition-all
            className="work-card relative w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-auto lg:flex-1 lg:hover:flex-[2.5] transition-[flex,width] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] h-[300px] sm:h-[400px] lg:h-[500px]"
          >
            <button
              onClick={() => setSelectedCategory(cat.id)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              aria-label={`View ${cat.title} projects`}
              // 🚨 關鍵修正：拿掉 framer-motion 的 whileHover，改用原生 button
              className="w-full h-full overflow-hidden text-left rounded-2xl relative block focus:outline-none"
            >
              
              <div className={`absolute inset-0 ${cat.color}`}>
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  loading="lazy"
                  // 🚨 關鍵修正：套用我們上面寫的 .work-card-img
                  className={`work-card-img w-full h-full object-cover ${cat.position || 'object-center'} ${cat.customClass || ''} grayscale sm:group-hover/list:grayscale sm:hover:!grayscale-0`}
                />
              </div>

              {/* 遮罩漸層 (維持原本設計) */}
              <div className="absolute inset-0 bg-black/20 opacity-0 lg:group-hover/list:opacity-100 lg:hover:!opacity-0 transition-opacity duration-500 pointer-events-none z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60 sm:opacity-0 sm:hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

              {/* 標題文字 (維持原本設計) */}
              <div className="absolute bottom-8 left-0 w-full text-center z-30 translate-y-0 sm:translate-y-4 opacity-100 sm:opacity-0 sm:hover:opacity-100 sm:hover:translate-y-0 transition-all duration-500 delay-75">
                <span 
                  className="text-[11px] font-bold tracking-[0.2em] text-white rounded-full px-6 py-3 inline-block"
                  style={{
                    background: 'rgba(255,255,255, 0.15)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px rgba(0,0,0,0.2)'
                  }}
                >
                  {cat.title}
                </span>
              </div>
              
            </button>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
});

WorkSection.displayName = 'WorkSection';
