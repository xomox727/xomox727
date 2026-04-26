import { motion } from 'motion/react';
import { useState } from 'react';

type Work = {
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

type Category = {
  id: string;
  title: string;
  color: string;
  image: string;
  position?: string;
  customClass?: string;
  works: Work[];
};

interface WorkSectionProps {
  categories: Category[];
  setSelectedCategory: (id: string | null) => void;
  setIsHovering: (val: boolean) => void;
}

export const WorkSection = ({
  categories,
  setSelectedCategory,
  setIsHovering,
}: WorkSectionProps) => {
  const [hovered, setHovered] = useState<string | null>(
    categories[0]?.id ?? null,
  );

  return (
    <section
      id="work"
      className="relative min-h-screen bg-[#f8f7f4] dark:bg-[#070b12] px-6 md:px-10 py-28 md:py-36 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_12%_20%,rgba(255,217,249,0.20),transparent_22%),radial-gradient(circle_at_90%_70%,rgba(46,64,111,0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_12%_20%,rgba(255,217,249,0.06),transparent_22%),radial-gradient(circle_at_90%_70%,rgba(46,64,111,0.20),transparent_30%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid xl:grid-cols-[0.8fr_1.2fr] gap-10 xl:gap-16 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-[#ffd9f9]" />
              <p className="text-[#2e406f]/60 dark:text-white/55 text-xs font-bold tracking-[0.2em]">
                SELECTED WORK
              </p>
            </div>

            <h2 className="text-[#2e406f] dark:text-white text-[clamp(2.8rem,5vw,5.8rem)] font-black leading-[0.95] tracking-[-0.05em]">
              WORKS<span className="text-[#ffd9f9]">.</span>
            </h2>
          </div>

          <div className="flex items-end">
            <p className="max-w-md text-[#2e406f]/70 dark:text-white/65 leading-8 text-sm md:text-base">
              品牌識別、包裝設計、版面編排與插畫作品精選。
            </p>
          </div>
        </div>

        {/* 桌機版：xl 以上才使用 accordion，不影響平板 */}
        <div className="hidden xl:flex h-[560px] gap-4">
          {categories.map((category, index) => {
            const active = hovered === category.id;

            return (
              <motion.button
                key={category.id}
                type="button"
                onMouseEnter={() => {
                  setHovered(category.id);
                  setIsHovering(true);
                }}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => setSelectedCategory(category.id)}
                animate={{
                  flex: active ? 2.6 : 0.9,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="category-card group relative min-w-[112px] overflow-hidden rounded-[2rem] bg-white/65 dark:bg-white/[0.06] border border-white/70 dark:border-white/10 shadow-[0_20px_70px_rgba(46,64,111,0.10)] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2e406f] dark:focus-visible:ring-white"
              >
                <div className="absolute inset-0 flex items-center justify-center bg-white/25 dark:bg-white/[0.025]">
                  <img
                    src={category.image}
                    alt={category.title}
                    draggable={false}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025] ${
                      category.position ?? ''
                    } ${category.customClass ?? ''}`}
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#2e406f]/82 via-[#2e406f]/14 to-white/10 dark:from-black/82" />

                {/* 收合狀態：直式分類名稱 */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: active ? 0 : 1,
                  }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-none"
                >
                  <div className="[writing-mode:vertical-rl] rotate-180 flex items-center gap-4">
                    <span className="text-white/60 text-[10px] font-bold tracking-[0.22em]">
                      0{index + 1}
                    </span>

                    <h3 className="text-white text-lg xl:text-xl font-black tracking-[0.12em] whitespace-nowrap">
                      {category.title}
                    </h3>
                  </div>
                </motion.div>

                {/* 展開狀態：完整資訊 */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: active ? 1 : 0,
                    y: active ? 0 : 18,
                  }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-x-0 bottom-0 p-8 pointer-events-none"
                >
                  <p className="text-white/72 text-[10px] font-bold tracking-[0.22em] mb-3">
                    0{index + 1}
                  </p>

                  <h3 className="text-white text-2xl xl:text-4xl font-black tracking-[-0.04em] leading-tight break-words max-w-[420px]">
                    {category.title}
                  </h3>

                  <p className="mt-5 text-white/78 text-sm leading-7 max-w-xs">
                    {category.works.length} projects inside
                  </p>

                  <span className="mt-6 inline-flex w-11 h-11 rounded-full items-center justify-center bg-[#ffd9f9] text-[#2e406f]">
                    →
                  </span>
                </motion.div>
              </motion.button>
            );
          })}
        </div>

        {/* 平板 / 小桌機 / 手機：完整卡片 + 輕微上浮，不影響桌機 accordion */}
        <div className="grid gap-5 sm:grid-cols-2 xl:hidden">
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                duration: 0.28,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative min-h-[260px] md:min-h-[320px] lg:min-h-[360px] rounded-[1.6rem] overflow-hidden bg-white/72 dark:bg-white/[0.06] border border-white/70 dark:border-white/10 text-left shadow-[0_18px_55px_rgba(46,64,111,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2e406f] dark:focus-visible:ring-white"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-white/35 dark:bg-white/[0.025] p-5 md:p-7">
                <img
                  src={category.image}
                  alt={category.title}
                  draggable={false}
                  className={`w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.01] ${
                    category.position ?? ''
                  } ${category.customClass ?? ''}`}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#2e406f]/82 via-[#2e406f]/18 to-white/5 dark:from-black/82" />

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <p className="text-white/72 text-[10px] font-bold tracking-[0.22em] mb-3">
                  0{index + 1}
                </p>

                <h3 className="text-white text-2xl md:text-3xl font-black tracking-[-0.04em] leading-tight break-words">
                  {category.title}
                </h3>

                <p className="text-white/78 text-xs md:text-sm mt-3">
                  {category.works.length} projects
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};
