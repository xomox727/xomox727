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
      <motion.ul 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-row flex-wrap gap-4 w-full max-w-7xl justify-center group/list list-none p-0 m-0"
      >
        {categories.map((cat, index) => {
          // 💡 小技巧：將原本的 object-left 轉換成 Tailwind 的 bg-left
          const bgPosition = cat.position ? cat.position.replace('object-', 'bg-') : 'bg-center';

          return (
            <motion.li
              key={cat.id}
              className="relative w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-auto lg:flex-1 lg:hover:flex-[2.5] transition-[flex,width,max-width] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] h-[300px] sm:h-[400px] lg:h-[500px]"
            >
              <motion.button
                onClick={() => setSelectedCategory(cat.id)}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                aria-label={`View ${cat.title} projects`}
                className="w-full h-full overflow-hidden group text-left rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-brand relative block"
              >
              
              {/* 🚀 終極防抖：完全拔除 <img>，改用 background-image */}
              <div className={`absolute inset-0 ${cat.color} overflow-hidden`}>
                <div 
                  className={`w-full h-full bg-cover ${bgPosition} ${cat.customClass || ''} 
                    grayscale-0 sm:grayscale sm:group-hover:grayscale-0 
                    opacity-100 sm:opacity-60 sm:group-hover:opacity-100
                    transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] 
                    group-hover:scale-105 will-change-transform transform-gpu`}
                  style={{ 
                    backgroundImage: `url('${cat.image}')`,
                    backfaceVisibility: 'hidden', 
                    transform: 'translateZ(0)' 
                  }}
                />
              </div>

              {/* 遮罩漸層 */}
              <div className="absolute inset-0 bg-black/30 opacity-0 lg:group-hover/list:opacity-100 lg:group-hover:!opacity-0 transition-opacity duration-500 pointer-events-none z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

              {/* 介紹按鈕 */}
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
              </motion.button>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
});

WorkSection.displayName = 'WorkSection';
