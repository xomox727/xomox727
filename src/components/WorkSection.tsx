import { motion } from 'motion/react';
import React from 'react';

interface WorkSectionProps {
  categories: any[];
  setSelectedCategory: (id: string) => void;
  setIsHovering: (val: boolean) => void;
}

export const WorkSection = React.memo(({ categories, setSelectedCategory, setIsHovering }: WorkSectionProps) => {
  return (
    <section id="work" className="min-h-screen flex flex-col items-center justify-center py-32 px-6">
      
      {/* 🛡️ 終極防護樣式表 */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* 1. 消滅手機版按鈕自帶的點擊灰色遮罩 */
        button {
          -webkit-tap-highlight-color: transparent;
        }

        /* 2. 專注於 flex 變化，打造純淨手風琴展開 */
        .pure-flex-card {
          transition: flex 0.7s cubic-bezier(0.25, 1, 0.5, 1);
        }
        
        /* 3. 獨立的背景圖片過渡動畫 */
        .pure-bg-layer {
          transition: transform 1s cubic-bezier(0.25, 1, 0.5, 1), filter 0.7s ease;
        }

        /* 4. 神級防護：確保觸控設備絕對不會觸發詭異的 Hover 放大 */
        @media (hover: none) {
          .group:hover .pure-bg-layer {
            transform: scale(1) !important;
          }
        }
      `}} />

      <motion.ul 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-row flex-wrap gap-4 w-full max-w-7xl justify-center group/list list-none p-0 m-0"
      >
        {categories.map((cat, index) => {
          // 將 tailwind 的 object-position 轉換為 bg-position
          const bgPosition = cat.position ? cat.position.replace('object-', 'bg-') : 'bg-center';

          return (
            <motion.li
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              // 乾淨的 Flex 排版，拔除所有 JS 動畫干擾
              className="pure-flex-card relative w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-auto lg:flex-1 lg:hover:flex-[2.5] h-[300px] sm:h-[400px] lg:h-[500px]"
            >
              <button
                onClick={() => setSelectedCategory(cat.id)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                aria-label={`View ${cat.title} projects`}
                // 原生按鈕，完全不抖
                className="w-full h-full overflow-hidden group text-left rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-brand relative block"
              >
              
              {/* 背景圖片層：完美透出你的 cat.color */}
              <div className={`absolute inset-0 ${cat.color} overflow-hidden`}>
                <div 
                  className={`pure-bg-layer w-full h-full bg-cover ${bgPosition} ${cat.customClass || ''} 
                    grayscale-0 sm:grayscale sm:group-hover:grayscale-0 
                    opacity-100 sm:opacity-60 sm:group-hover:opacity-100 
                    sm:group-hover:scale-105`}
                  style={{ backgroundImage: `url('${cat.image}')` }}
                />
              </div>

              {/* 遮罩漸層：零延遲、極速反應 */}
              <div className="absolute inset-0 bg-black/30 opacity-0 lg:group-hover/list:opacity-100 lg:group-hover:!opacity-0 transition-opacity duration-300 ease-out pointer-events-none z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none z-10" />

              {/* 標題與毛玻璃：零延遲，瞬間順滑彈出 */}
              <div className="absolute bottom-8 left-0 w-full text-center z-30 translate-y-0 sm:translate-y-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-300 ease-out">
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
      </motion.ul>
    </section>
  );
});

WorkSection.displayName = 'WorkSection';
