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
      
      {/* 👑 終極魔法：用 CSS Grid 徹底消滅 Flexbox 抖動 Bug */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 1024px) {
          /* 讓電腦版改用 Grid 排版 */
          .work-grid-container {
            display: grid !important;
            /* 預設 5 個等寬網格 */
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            /* Grid 寬度過渡非常滑順，且不會有捨入誤差 */
            transition: grid-template-columns 0.7s cubic-bezier(0.25, 1, 0.5, 1);
          }
          
          /* 透過 :has 偵測哪一個子元素被 Hover，並精確改變軌道寬度 */
          .work-grid-container:has(> li:nth-child(1):hover) { grid-template-columns: 2.5fr 1fr 1fr 1fr 1fr; }
          .work-grid-container:has(> li:nth-child(2):hover) { grid-template-columns: 1fr 2.5fr 1fr 1fr 1fr; }
          .work-grid-container:has(> li:nth-child(3):hover) { grid-template-columns: 1fr 1fr 2.5fr 1fr 1fr; }
          .work-grid-container:has(> li:nth-child(4):hover) { grid-template-columns: 1fr 1fr 1fr 2.5fr 1fr; }
          .work-grid-container:has(> li:nth-child(5):hover) { grid-template-columns: 1fr 1fr 1fr 1fr 2.5fr; }

          /* 取消 Flexbox 的干擾 */
          .work-grid-item {
            width: 100% !important;
            max-width: none !important;
          }
        }

        /* 將背景圖片獨立出 GPU 渲染，不跟著排版重繪 */
        .work-bg-img {
          transform: translateZ(0) scale(1);
          backface-visibility: hidden;
          perspective: 1000px;
          will-change: transform;
          transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1) !important;
        }
        
        .work-grid-item:hover .work-bg-img {
          transform: translateZ(0) scale(1.05) !important;
        }
      `}} />

      <motion.ul 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        // 加上 custom class：work-grid-container
        className="work-grid-container flex flex-row flex-wrap gap-4 w-full max-w-7xl justify-center group/list list-none p-0 m-0"
      >
        {categories.map((cat, index) => {
          const bgPosition = cat.position ? cat.position.replace('object-', 'bg-') : 'bg-center';

          return (
            <motion.li
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              // 🚨 拔除所有 Flex 動畫 class，交給上面的 Grid 處理
              className="work-grid-item relative w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] h-[300px] sm:h-[400px] lg:h-[500px]"
            >
              <button
                onClick={() => setSelectedCategory(cat.id)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                aria-label={`View ${cat.title} projects`}
                className="w-full h-full overflow-hidden group text-left rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-brand relative block"
              >
              
              {/* 背景圖片層 (完全隔離排版) */}
              <div className={`absolute inset-0 ${cat.color} overflow-hidden`}>
                <div 
                  className={`work-bg-img w-full h-full bg-cover ${bgPosition} ${cat.customClass || ''} 
                    grayscale-0 sm:grayscale sm:group-hover:grayscale-0 
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
      </motion.ul>
    </section>
  );
});

WorkSection.displayName = 'WorkSection';
