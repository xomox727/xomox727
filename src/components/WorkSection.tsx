import React from 'react';
import { motion } from 'motion/react';

interface WorkSectionProps {
  categories: any[];
  setSelectedCategory: (id: string) => void;
  setIsHovering: (val: boolean) => void;
}

export const WorkSection = React.memo(({ categories, setSelectedCategory, setIsHovering }: WorkSectionProps) => {
  return (
    <section id="work" className="min-h-screen flex flex-col items-center justify-center py-32 px-6">
      
      {/* 🛡️ 終極硬體加速與防抖樣式 */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* 讓圖片完全由顯示卡 (GPU) 渲染，與外層排版脫鉤 */
        .work-card-img {
          transform: translateZ(0) scale(1);
          backface-visibility: hidden;
          perspective: 1000px;
          will-change: transform;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.6s ease !important;
        }

        /* 卡片 Hover 時，只放大圖片，不觸發 JS 重算 */
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
            // ✨ 靈魂核心：加入 layout 屬性，讓 Framer Motion 的物理引擎接管變寬的動畫
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            // ✨ 給排版變化加上彈簧物理效果，這會吃掉所有抖動感
            transition={{ 
              layout: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.5, delay: index * 0.1 }
            }}
            // 🚨 絕對禁止在這裡寫任何 CSS 的 transition (拿掉 transition-all)
            className="work-card relative w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-auto lg:flex-1 lg:hover:flex-[2.5] h-[300px] sm:h-[400px] lg:h-[500px]"
          >
            <button
              onClick={() => setSelectedCategory(cat.id)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              aria-label={`View ${cat.title} projects`}
              className="w-full h-full overflow-hidden text-left rounded-2xl relative block focus:outline-none"
            >
              
              <div className={`absolute inset-0 ${cat.color}`}>
                <img 
                  src={cat.image} 
                  alt={cat.title} 
                  loading="lazy"
                  className={`work-card-img w-full h-full object-cover ${cat.position || 'object-center'} ${cat.customClass || ''} grayscale sm:group-hover/list:grayscale sm:hover:!grayscale-0`}
                />
              </div>

              {/* 遮罩漸層 */}
              <div className="absolute inset-0 bg-black/20 opacity-0 lg:group-hover/list:opacity-100 lg:hover:!opacity-0 transition-opacity duration-500 pointer-events-none z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60 sm:opacity-0 sm:hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

              {/* 標題文字 */}
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
