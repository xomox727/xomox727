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

export const Modals = React.memo(({ 
  activeCategoryData, 
  setSelectedCategory, 
  selectedWork, 
  setSelectedWork, 
  enlargedImage, 
  setEnlargedImage, 
  setIsHovering,
  isDarkMode
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
            className="fixed inset-0 bg-white dark:bg-neutral-950 z-[60] overflow-y-auto"
          >
            <div className="min-h-screen px-6 py-20 max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-16">
                <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-neutral-900 dark:text-white">{activeCategoryData.title}</h2>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  aria-label="Close category detail view"
                  className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:rounded-sm"
                >
                  CLOSE
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {activeCategoryData.works.map((work: Work, idx: number) => (
                  <motion.button
                    key={work.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                    onClick={() => setSelectedWork(work)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    aria-label={`View details for ${work.title || 'project'}`}
                    className="relative aspect-square overflow-hidden group bg-neutral-100 dark:bg-neutral-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand focus-visible:ring-inset rounded-lg"
                  >
                    <img 
                      src={work.thumb} 
                      alt="" 
                      loading="lazy"
                      className={`w-full h-full transition-transform duration-1000 group-hover:scale-105 ${work.contain ? 'object-contain p-8' : 'object-cover'} ${work.imageClass || ''}`}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                    {work.title && (
                      <div className="absolute top-4 left-4 text-left z-10">
                        <span 
                          className={`text-xs font-bold tracking-wider px-5 py-2.5 rounded-xl inline-block transition-all duration-500 ${
                            isDarkMode 
                              ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' 
                              : 'text-[#2e406f] drop-shadow-[0_1px_2px_rgba(255,255,255,1)]'
                          }`}
                          style={{
                            background: isDarkMode 
                              ? 'rgba(255,255,255, 0.1)' 
                              : 'rgba(255,255,255, 0.2)',
                            backdropFilter: 'blur(6px) url(#liquid_glass_filter)',
                            WebkitBackdropFilter: 'blur(6px) url(#liquid_glass_filter)',
                            boxShadow: isDarkMode 
                              ? 'inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(255,255,255,0.1), inset 8px 8px 20px rgba(255,255,255,0.05), 0 12px 32px rgba(0,0,0,0.5)'
                              : 'inset 0 1.5px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(255,255,255,0.2), inset 8px 8px 20px rgba(255,255,255,0.3), 0 10px 25px rgba(0,0,0,0.15)'
                          }}
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

      {/* Lightbox / Gallery View */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-[70] ${selectedWork.type === 'gallery' ? 'bg-white dark:bg-neutral-950 overflow-y-auto' : 'bg-white/98 dark:bg-neutral-950/98 flex items-center justify-center p-6 cursor-zoom-out backdrop-blur-sm'}`}
            onClick={() => selectedWork.type !== 'gallery' && setSelectedWork(null)}
          >
            {selectedWork.type === 'gallery' ? (
              <div className="min-h-screen px-6 py-20 max-w-7xl mx-auto w-full">
                <div className="flex items-center justify-between mb-16">
                  <h2 className="text-3xl md:text-5xl font-light tracking-tighter text-neutral-900 dark:text-white">{selectedWork.title}</h2>
                  <button 
                    onClick={() => setSelectedWork(null)}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    aria-label="Close project view"
                    className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:rounded-sm"
                  >
                    CLOSE
                  </button>
                </div>
                <div className={`grid grid-cols-1 md:grid-cols-2 ${selectedWork.galleryImages?.length === 3 ? 'lg:grid-cols-3' : ''} gap-8`}>
                  {selectedWork.galleryImages?.map((img: string, i: number) => (
                    <button 
                      key={i} 
                      className={`overflow-hidden relative group flex items-center justify-center cursor-zoom-in aspect-[4/3] focus:outline-none focus-visible:ring-4 focus-visible:ring-brand focus-visible:ring-inset rounded-lg ${img.includes('identity4-pic1') ? 'bg-neutral-100' : 'bg-neutral-100 dark:bg-neutral-900'}`}
                      onClick={() => setEnlargedImage(img)}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      aria-label="Enlarge image"
                    >
                      <img 
                        src={img} 
                        alt="" 
                        className={`w-full h-full transition-transform duration-1000 group-hover:scale-105 ${img.includes('another6') ? 'object-contain p-12 lg:p-16' : img.includes('identity4-pic1') || img.includes('layout3-pic2') || img.includes('identity5-pic1') ? 'object-contain p-8' : 'object-cover'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <button 
                  className="absolute top-8 right-8 text-neutral-400 dark:text-white/50 hover:text-neutral-900 dark:hover:text-white text-xs font-bold tracking-[0.2em] uppercase transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:rounded-sm z-50"
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
                  alt={selectedWork.title || "Full screen project image"} 
                  className="max-w-full max-h-full object-contain cursor-default"
                  onClick={(e) => e.stopPropagation()}
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
            className="fixed inset-0 z-[80] bg-white/98 dark:bg-neutral-950/98 flex items-center justify-center p-6 cursor-zoom-out backdrop-blur-sm"
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
              className={`max-w-full max-h-full object-contain ${enlargedImage.includes('identity4-pic1') ? 'bg-neutral-100 rounded-lg p-8 shadow-2xl' : ''}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

Modals.displayName = 'Modals';
