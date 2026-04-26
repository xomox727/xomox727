import { motion, AnimatePresence } from 'motion/react';
import React from 'react';

interface Work {
  id: string;
  thumb: string;
  full: string;
  title?: string;
  type?: 'single' | 'gallery';
  galleryImages?: string[];
  contain?: boolean;
  imageClass?: string;
}

interface ModalsProps {
  activeCategoryData: any;
  setSelectedCategory: (id: string | null) => void;
  selectedWork: Work | null;
  setSelectedWork: (work: Work | null) => void;
  enlargedImage: string | null;
  setEnlargedImage: (img: string | null) => void;
  setIsHovering: (val: boolean) => void;
  isDarkMode: boolean;
}

export const Modals = React.memo(
  ({
    activeCategoryData,
    setSelectedCategory,
    selectedWork,
    setSelectedWork,
    enlargedImage,
    setEnlargedImage,
    setIsHovering,
    isDarkMode,
  }: ModalsProps) => {
    return (
      <>
        {/* Category Detail View */}
        <AnimatePresence>
          {activeCategoryData && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 bg-[#f8f7f4] dark:bg-[#070b12] z-[60] overflow-y-auto"
            >
              <div className="min-h-screen px-6 md:px-10 py-20 md:py-28 max-w-7xl mx-auto">
                <div className="flex items-center justify-between gap-6 mb-12 md:mb-16">
                  <div>
                    <p className="text-[#2e406f]/55 dark:text-white/50 text-xs font-bold tracking-[0.2em] mb-4">
                      SELECTED CATEGORY
                    </p>

                    <h2 className="text-[#2e406f] dark:text-white text-4xl md:text-6xl font-black tracking-[-0.05em] leading-none">
                      {activeCategoryData.title}
                      <span className="text-[#ffd9f9]">.</span>
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedCategory(null)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    aria-label="Close category detail view"
                    className="shrink-0 text-xs font-bold tracking-[0.2em] uppercase text-[#2e406f]/60 hover:text-[#2e406f] dark:text-white/55 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2e406f] dark:focus-visible:ring-white focus-visible:rounded-full px-3 py-2"
                  >
                    CLOSE
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {activeCategoryData.works.map((work: Work, index: number) => (
                    <motion.button
                      key={work.id}
                      type="button"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.12 + index * 0.06,
                        duration: 0.45,
                      }}
                      onClick={() => setSelectedWork(work)}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      aria-label={`View details for ${work.title || 'project'}`}
                      className="work-card group relative min-h-[280px] md:min-h-[340px] overflow-hidden bg-white/70 dark:bg-white/[0.06] border border-white/70 dark:border-white/10 rounded-[1.6rem] shadow-[0_18px_55px_rgba(46,64,111,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2e406f] dark:focus-visible:ring-white"
                    >
                      {/* 作品縮圖：改成 contain，避免子圖被裁切 */}
                      <div className="absolute inset-0 flex items-center justify-center bg-white/35 dark:bg-white/[0.025]">
                        <img
                          src={work.thumb}
                          alt={work.title || ''}
                          loading="lazy"
                          draggable={false}
                          className={`max-w-[96%] max-h-[96%] object-contain transition-transform duration-700 group-hover:scale-[1.03] ${
                            work.imageClass || ''
                          }`}
                        />
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-[#2e406f]/72 via-[#2e406f]/8 to-transparent dark:from-black/72" />

                      {work.title && (
                        <div className="absolute left-5 right-5 bottom-5 z-10 text-left">
                          <p className="text-white/65 text-[10px] font-bold tracking-[0.22em] mb-2">
                            0{index + 1}
                          </p>

                          <span
                            className={`inline-block rounded-full px-4 py-2 text-xs font-bold tracking-[0.12em] ${
                              isDarkMode
                                ? 'bg-white/10 text-white'
                                : 'bg-white/75 text-[#2e406f]'
                            } backdrop-blur-md`}
                          >
                            {work.title}
                          </span>
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Gallery View */}
        <AnimatePresence>
          {selectedWork && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`fixed inset-0 z-[70] ${
                selectedWork.type === 'gallery'
                  ? 'bg-[#f8f7f4] dark:bg-[#070b12] overflow-y-auto'
                  : 'bg-[#f8f7f4]/98 dark:bg-[#070b12]/98 flex items-center justify-center p-6 cursor-zoom-out backdrop-blur-sm'
              }`}
              onClick={() => {
                if (selectedWork.type !== 'gallery') {
                  setSelectedWork(null);
                }
              }}
            >
              {selectedWork.type === 'gallery' ? (
                <div className="min-h-screen px-6 md:px-10 py-20 md:py-28 max-w-7xl mx-auto w-full">
                  <div className="flex items-center justify-between gap-6 mb-12 md:mb-16">
                    <div>
                      <p className="text-[#2e406f]/55 dark:text-white/50 text-xs font-bold tracking-[0.2em] mb-4">
                        PROJECT
                      </p>

                      <h2 className="text-[#2e406f] dark:text-white text-3xl md:text-5xl font-black tracking-[-0.05em] leading-tight">
                        {selectedWork.title}
                        <span className="text-[#ffd9f9]">.</span>
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedWork(null)}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      aria-label="Close project view"
                      className="shrink-0 text-xs font-bold tracking-[0.2em] uppercase text-[#2e406f]/60 hover:text-[#2e406f] dark:text-white/55 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2e406f] dark:focus-visible:ring-white focus-visible:rounded-full px-3 py-2"
                    >
                      CLOSE
                    </button>
                  </div>

                  {/* 子圖預覽：全部改成 object-contain，不再裁切 */}
                  <div
                    className={`grid grid-cols-1 md:grid-cols-2 ${
                      selectedWork.galleryImages?.length === 3
                        ? 'xl:grid-cols-3'
                        : ''
                    } gap-6 md:gap-8`}
                  >
                    {selectedWork.galleryImages?.map((img: string, index: number) => (
                      <button
                        key={`${img}-${index}`}
                        type="button"
                        className="group relative overflow-hidden flex items-center justify-center cursor-zoom-in min-h-[280px] md:min-h-[360px] xl:min-h-[420px] bg-white/72 dark:bg-white/[0.06] border border-white/70 dark:border-white/10 rounded-[1.6rem] shadow-[0_18px_55px_rgba(46,64,111,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2e406f] dark:focus-visible:ring-white"
                        onClick={() => setEnlargedImage(img)}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        aria-label="Enlarge image"
                      >
                        <img
                          src={img}
                          alt=""
                          loading="lazy"
                          draggable={false}
                          className="max-w-[96%] max-h-[96%] object-contain transition-transform duration-700 group-hover:scale-[1.025]"
                        />

                        <div className="absolute inset-0 bg-[#2e406f]/0 group-hover:bg-[#2e406f]/5 dark:group-hover:bg-white/5 transition-colors duration-500" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    className="absolute top-8 right-8 text-[#2e406f]/60 dark:text-white/55 hover:text-[#2e406f] dark:hover:text-white text-xs font-bold tracking-[0.2em] uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2e406f] dark:focus-visible:ring-white focus-visible:rounded-full z-50 px-3 py-2"
                    onClick={() => setSelectedWork(null)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    aria-label="Close full screen image"
                  >
                    CLOSE
                  </button>

                  <motion.img
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    src={selectedWork.full}
                    alt={selectedWork.title || 'Full screen project image'}
                    className="max-w-[92vw] max-h-[86vh] object-contain cursor-default rounded-[1.2rem]"
                    onClick={(event) => event.stopPropagation()}
                  />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enlarged Image Lightbox */}
        <AnimatePresence>
          {enlargedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[80] bg-[#f8f7f4]/98 dark:bg-[#070b12]/98 flex items-center justify-center p-4 md:p-8 cursor-zoom-out backdrop-blur-sm"
              onClick={() => setEnlargedImage(null)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              role="button"
              aria-label="Close enlarged view"
            >
              <motion.img
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                src={enlargedImage}
                alt="Enlarged view"
                className="max-w-[96vw] max-h-[92vh] object-contain rounded-[1rem] shadow-[0_24px_80px_rgba(46,64,111,0.12)]"
                onClick={(event) => event.stopPropagation()}
              />

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  setEnlargedImage(null);
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="absolute top-5 right-5 md:top-8 md:right-8 text-xs font-bold tracking-[0.2em] uppercase text-[#2e406f]/60 hover:text-[#2e406f] dark:text-white/55 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2e406f] dark:focus-visible:ring-white focus-visible:rounded-full px-3 py-2"
                aria-label="Close enlarged image"
              >
                CLOSE
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  },
);

Modals.displayName = 'Modals';
