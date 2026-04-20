import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface WorkSectionProps {
  categories: any[];
  setSelectedCategory: (id: string) => void;
  setIsHovering: (val: boolean) => void;
}

export const WorkSection = React.memo(({ categories, setSelectedCategory, setIsHovering }: WorkSectionProps) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 1. 偵測螢幕尺寸 (區分手機版與電腦版)
  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // 2. 精準監測容器寬度 (取得最外層總像素)
  useEffect(() => {
    if (!isDesktop) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        // 強制取整數，絕不讓小數點出現
        setContainerWidth(Math.floor(entries[0].contentRect.width));
      }
    });
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isDesktop]);

  // 3. 核心大絕招：用 JS 算出每一張卡片的絕對整數寬度與 X 座標
  const getLayout = (index: number) => {
    if (!isDesktop || containerWidth === 0) return { width: "", x: 0 };

    const gap = 16; // 1rem = 16px
    const availableWidth = containerWidth - (gap * 4);
    
    const itemNormalW = Math.floor(availableWidth / 5);
    const itemHoverW = Math.floor(availableWidth * 0.4); // Hover 時佔 40%
    const itemShrinkW = Math.floor((availableWidth - itemHoverW) / 4); // 其他分剩下的

    let targetWidth = itemNormalW;
    let targetX = index * (itemNormalW + gap);

    if (hoveredIndex !== null) {
      targetWidth = index === hoveredIndex ? itemHoverW : itemShrinkW;
      
      // 計算 X 軸偏移，確保不會疊在一起
      if (index < hoveredIndex) {
        targetX = index * (itemShrinkW + gap);
      } else if (index === hoveredIndex) {
        targetX = index * (itemShrinkW + gap);
      } else {
        targetX = (index - 1) * (itemShrinkW + gap) + itemHoverW + gap;
      }
    }

    return { width: targetWidth, x: targetX };
  };

  return (
    <section id="work" className="min-h-screen flex flex-col items-center justify-center py-32 px-6">
      
      {/* 獨立 GPU 渲染背景圖的樣式 */}
      <style dangerouslySetInnerHTML={{ __html: `
        .bg-gpu-layer {
          transform: translateZ(0) scale(1);
          backface-visibility: hidden;
          perspective: 1000px;
          will-change: transform;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .group:hover .bg-gpu-layer {
          transform: translateZ(0) scale(1.06) !important;
        }
      `}} />

      {/* 電腦版高度寫死 500px，手機版 auto */}
      <ul 
        ref={containerRef} 
        className="relative flex flex-row flex-wrap gap-4 lg:gap-0 w-full max-w-7xl justify-center group/list list-none p-0 m-0 lg:h-[500px]"
      >
        {categories.map((cat, index) => {
          const isDesktopLayout = isDesktop && containerWidth > 0;
          const layout = getLayout(index);
          const bgPosition = cat.position ? cat.position.replace('object-', 'bg-') : 'bg-center';

          return (
            <motion.li
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              // 🚀 關鍵點：用 GPU 動畫推動 X 與 Width，如果不符合條件就放開讓 CSS 接管
              animate={isDesktopLayout ? { width: layout.width, x: layout.x } : { width: "", x: 0 }}
              transition={{ duration: isDesktopLayout ? 0.7 : 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                position: isDesktopLayout ? 'absolute' : 'relative',
                left: 0, top: 0, transformOrigin: 'left center'
              }}
              // 把 Flexbox 那些 class 全部拔掉
              className="w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] h-[300px] sm:h-[400px] lg:h-[500px]"
              onMouseEnter={() => { setIsHovering(true); setHoveredIndex(index); }}
              onMouseLeave={() => { setIsHovering(false); setHoveredIndex(null); }}
            >
              <button
                onClick={() => setSelectedCategory(cat.id)}
                aria-label={`View ${cat.title} projects`}
                className="w-full h-full group text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-brand relative block rounded-2xl overflow-hidden"
              >
                
                {/* 🚀 背景圖片替換大法 (沒有 img 標籤了) */}
                <div className={`absolute inset-0 ${cat.color} rounded-2xl overflow-hidden`}>
                  <div 
                    className={`bg-gpu-layer w-full h-full bg-cover ${bgPosition} ${cat.customClass || ''} 
                      grayscale-0 sm:grayscale sm:group-hover/list:grayscale sm:group-hover:!grayscale-0 
                      opacity-100 sm:opacity-60 sm:group-hover:opacity-100
                      transition-[filter,opacity] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]`}
                    style={{ backgroundImage: `url('${cat.image}')` }}
                  />
                </div>

                {/* 遮罩漸層 */}
                <div className="absolute inset-0 bg-black/30 opacity-0 lg:group-hover/list:opacity-100 lg:group-hover:!opacity-0 transition-opacity duration-500 pointer-events-none z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                {/* 介紹標題按鈕 */}
                <div className="absolute bottom-8 left-0 w-full text-center z-30 translate-y-0 sm:translate-y-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-500 delay-75">
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
          );
        })}
      </ul>
    </section>
  );
});

WorkSection.displayName = 'WorkSection';
