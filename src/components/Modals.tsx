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
    const closeLockRef = React.useRef(false);

    const closeEnlargedImage = () => {
      if (closeLockRef.current) return;

      closeLockRef.current = true;
      setEnlargedImage(null);

      window.setTimeout(() => {
        closeLockRef.current = false;
      }, 500);
    };

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
                  {activeCategoryData.works.map((work: Work) => (
                    <motion.button
                      key={work.id}
                      type="button"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45 }}
                      onClick={() => setSelectedWork(work)}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      aria-label={`View details for ${work.title || 'project'}`}
                      className="work-card group relative min-h-[280px] md:min-h-[340px] overflow-hidden bg-white/70 dark:bg-white/[0.06] border border-white/70 dark:border-white/10 rounded-[1.6rem] shadow-[0_18px_55px_rgba(46,64,111,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2e406f] dark:focus-visible:ring-white"
                    >
                      {/* 作品縮圖展示底板：黑暗模式也維持白底，避免深色 LOGO 看不清楚 */}
                      <div className="absolute inset-0 flex items-center justify-center bg-white/85 dark:bg-white/90 p-5">
                        <img
                          src={work.thumb}
                          alt={work.title || ''}
                          loading="lazy"
                          draggable={false}
                          className={`max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-[1.025] ${
                            work.imageClass || ''
                          }`}
                        />
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-[#2e406f]/72 via-[#2e406f]/8 to-transparent dark:from-black/42 dark:via-black/0" />

                      {work.title && (
                        <div className="absolute left-5 right-5 bottom-5 z-10 text-left">
                          <span
                            className={`inline-block rounded-full px-4 py-2 text-xs font-bold tracking-[0.12em] ${
                              isDarkMode
                                ? 'bg-white/90 text-[#2e406f]'
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
                        className="group relative overflow-hidden flex items-center justify-center cursor-zoom-in min-h-[280px] md:min-h-[360px] xl:min-h-[420px] bg-white/85 dark:bg-white/90 border border-white/70 dark:border-white/10 rounded-[1.6rem] shadow-[0_18px_55px_rgba(46,64,111,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2e406f] dark:focus-visible:ring-white p-4"
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
                          className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                        />

                        <div className="absolute inset-0 bg-[#2e406f]/0 group-hover:bg-[#2e406f]/4 dark:group-hover:bg-[#2e406f]/4 transition-colors duration-500" />
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

                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-[92vw] max-h-[86vh] bg-white/95 rounded-[1.2rem] p-4 md:p-6 shadow-[0_24px_80px_rgba(46,64,111,0.12)] cursor-default"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <img
                      src={selectedWork.full}
                      alt={selectedWork.title || 'Full screen project image'}
                      draggable={false}
                      className="max-w-[calc(92vw-2rem)] md:max-w-[calc(92vw-3rem)] max-h-[calc(86vh-2rem)] md:max-h-[calc(86vh-3rem)] object-contain"
                    />
                  </motion.div>
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
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[80] bg-[#f8f7f4]/98 dark:bg-[#070b12]/98 flex items-center justify-center p-4 md:p-8 cursor-zoom-out backdrop-blur-sm"
              onClick={closeEnlargedImage}
              onDoubleClick={(event) => event.preventDefault()}
              role="presentation"
            >
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  closeEnlargedImage();
                }}
                onDoubleClick={(event) => event.preventDefault()}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="absolute top-5 right-5 md:top-8 md:right-8 z-10 text-xs font-bold tracking-[0.2em] uppercase text-[#2e406f]/60 hover:text-[#2e406f] dark:text-white/55 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2e406f] dark:focus-visible:ring-white focus-visible:rounded-full px-3 py-2"
                aria-label="Close enlarged image"
              >
                CLOSE
              </button>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[96vw] max-h-[92vh] bg-white/95 rounded-[1rem] shadow-[0_24px_80px_rgba(46,64,111,0.12)] cursor-zoom-out p-4 md:p-6"
                onClick={(event) => {
                  event.stopPropagation();
                  closeEnlargedImage();
                }}
                onDoubleClick={(event) => event.preventDefault()}
              >
                <img
                  src={enlargedImage}
                  alt="Enlarged view"
                  draggable={false}
                  className="max-w-[calc(96vw-2rem)] md:max-w-[calc(96vw-3rem)] max-h-[calc(92vh-2rem)] md:max-h-[calc(92vh-3rem)] object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  },
);

Modals.displayName = 'Modals';
