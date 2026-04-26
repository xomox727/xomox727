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
    categories[0]?.id ?? null
  );

  return (
    <section
      id="work"
      className="relative min-h-screen bg-[#f8f7f4] dark:bg-[#070b12] px-6 md:px-10 py-28 md:py-36 overflow-hidden"
    >
      {/* 背景 */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_12%_20%,rgba(255,217,249,0.32),transparent_22%),radial-gradient(circle_at_90%_70%,rgba(46,64,111,0.10),transparent_30%)] dark:bg-[radial-gradient(circle_at_12%_20%,rgba(255,217,249,0.08),transparent_22%),radial-gradient(circle_at_90%_70%,rgba(46,64,111,0.22),transparent_30%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* 標題區 */}
        <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-10 md:gap-16 mb-16">
          <div>
            <p className="text-[#ffd9f9] text-xs font-bold tracking-[0.2em] mb-5">
              SELECTED WORK
            </p>

            <h2 className="text-[#2e406f] dark:text-white text-[clamp(2.8rem,5vw,5.8rem)] font-black leading-[0.95] tracking-[-0.05em]">
              WORKS<span className="text-[#ffd9f9]">.</span>
            </h2>
          </div>

          <div className="flex items-end">
            <p className="max-w-md text-[#2e406f]/60 dark:text-white/55 leading-8 text-sm md:text-base">
              品牌識別、包裝設計、版面編排與插畫作品精選。
            </p>
          </div>
        </div>

        {/* 桌機版 Accordion */}
        <div className="hidden md:flex h-[560px] gap-4">
          {categories.map((category) => {
            const active = hovered === category.id;

            return (
              <motion.button
                key={category.id}
                onMouseEnter={() => {
                  setHovered(category.id);
                  setIsHovering(true);
                }}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => setSelectedCategory(category.id)}
                animate={{
                  flex: active ? 2.4 : 0.8,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative overflow-hidden rounded-[2rem] bg-white/65 dark:bg-white/[0.06] border border-white/70 dark:border-white/10 shadow-[0_20px_70px_rgba(46,64,111,0.10)] text-left"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  draggable={false}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    category.position ?? ''
                  } ${category.customClass ?? ''}`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#2e406f]/75 via-[#2e406f]/10 to-white/10 dark:from-black/75" />

                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className="text-white/60 text-[10px] font-bold tracking-[0.22em] mb-3">
                    0{categories.indexOf(category) + 1}
                  </p>

                  <h3 className="text-white text-2xl md:text-4xl font-black tracking-[-0.04em]">
                    {category.title}
                  </h3>

                  <motion.div
                    initial={false}
                    animate={{
                      opacity: active ? 1 : 0,
                      y: active ? 0 : 12,
                    }}
                    transition={{ duration: 0.35 }}
                    className="mt-5"
                  >
                    <p className="text-white/70 text-sm leading-7 max-w-xs">
                      {category.works.length} projects inside
                    </p>

                    <span className="mt-6 inline-flex w-11 h-11 rounded-full items-center justify-center bg-[#ffd9f9] text-[#2e406f]">
                      →
                    </span>
                  </motion.div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* 手機版 */}
        <div className="md:hidden grid gap-5">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="relative h-[220px] rounded-[1.6rem] overflow-hidden bg-white/70 dark:bg-white/[0.06] border border-white/60 dark:border-white/10 text-left"
            >
              <img
                src={category.image}
                alt={category.title}
                draggable={false}
                className={`absolute inset-0 w-full h-full object-cover ${
                  category.position ?? ''
                } ${category.customClass ?? ''}`}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#2e406f]/75 via-transparent to-white/10" />

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-3xl font-black tracking-[-0.04em]">
                  {category.title}
                </h3>

                <p className="text-white/65 text-xs mt-2">
                  {category.works.length} projects
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
