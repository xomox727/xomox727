import { useState, useEffect, useCallback, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkSection } from './components/WorkSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { CursorCustom } from './components/CursorCustom';
// 如果你有 ProjectDetail 組件，請取消註釋下方這行
// import { ProjectDetail } from './components/ProjectDetail';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // 1. 核心邏輯：監聽網址 Hash 變化，實現「上一頁」返回功能
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      
      // 定義你現有的頁面錨點，避免跟作品 ID 混淆
      const pageSections = ['home', 'work', 'about', 'contact'];
      
      if (!hash || pageSections.includes(hash)) {
        setSelectedCategory(null);
        if (hash) setActiveSection(hash);
      } else {
        // 如果 Hash 不屬於頁面錨點，則視為作品分類 ID
        setSelectedCategory(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // 初始載入檢查
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 2. 關閉作品詳細內容的函數
  const closeDetail = useCallback(() => {
    window.location.hash = "#work"; // 關閉時回到作品區塊的網址
  }, []);

  // 3. 你的作品分類資料 (請根據你的實際內容修改)
  const categoriesData = useMemo(() => [
    { id: 'branding', title: 'BRAND IDENTIFICATION', color: 'bg-zinc-200', image: '/images/branding-cover.jpg' },
    { id: 'packaging', title: 'PACKAGING DESIGN', color: 'bg-stone-200', image: '/images/packaging-cover.jpg' },
    { id: 'visual', title: 'VISUAL STRATEGY', color: 'bg-neutral-200', image: '/images/visual-cover.jpg' },
    { id: 'advertising', title: 'ADVERTISING', color: 'bg-gray-200', image: '/images/adv-cover.jpg' },
    { id: 'photography', title: 'PHOTOGRAPHY', color: 'bg-zinc-300', image: '/images/photo-cover.jpg' },
  ], []);

  return (
    <div className="bg-[#f8f8f8] min-h-screen font-sans selection:bg-brand/30">
      {/* 自定義游標 */}
      <CursorCustom isHovering={isHovering} />

      {/* 導航欄 */}
      <Navbar activeSection={activeSection} />

      {/* 主要內容區塊 */}
      <main>
        <Hero />
        
        <WorkSection 
          categories={categoriesData} 
          selectedCategory={selectedCategory}
          setSelectedCategory={(id) => {
            if(id) window.location.hash = id;
            else window.location.hash = "#work";
          }}
          setIsHovering={setIsHovering}
        />

        <AboutSection />
        
        <ContactSection />
      </main>

      {/* 4. 作品詳細內容彈出層 (Overlay) */}
      {selectedCategory && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-white animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* 關閉按鈕 */}
          <button 
            onClick={closeDetail}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="fixed top-8 right-8 md:top-12 md:right-12 z-[110] group flex items-center gap-2"
          >
            <span className="text-[10px] tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 transition-opacity">CLOSE</span>
            <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center bg-white/80 backdrop-blur-md hover:bg-black hover:text-white transition-all">
              ✕
            </div>
          </button>

          {/* 作品內容容器 */}
          <article className="max-w-5xl mx-auto px-6 py-24 md:py-32">
            <header className="mb-16">
              <p className="text-xs tracking-[0.4em] text-black/40 mb-4 uppercase">Project Category</p>
              <h1 className="text-5xl md:text-7xl font-light tracking-tighter uppercase">
                {categoriesData.find(c => c.id === selectedCategory)?.title || selectedCategory}
              </h1>
            </header>

            {/* 這裡可以根據 selectedCategory 渲染不同的作品內容 */}
            <div className="space-y-12">
              <div className="aspect-[16/9] bg-neutral-100 rounded-3xl overflow-hidden">
                 {/* <ProjectDetail id={selectedCategory} /> */}
                 <div className="w-full h-full flex items-center justify-center text-sm tracking-widest text-black/20 italic">
                   CONTENT LOADING...
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
                <div className="space-y-4">
                  <h4 className="font-bold tracking-widest uppercase">Challenge</h4>
                  <p className="text-black/60 leading-relaxed">針對品牌核心價值進行視覺重塑，在極簡與溫度之間取得平衡。</p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold tracking-widest uppercase">Solution</h4>
                  <p className="text-black/60 leading-relaxed">運用 RWD 技術與流暢互動，提升數位載體的品牌專業感。</p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold tracking-widest uppercase">Role</h4>
                  <p className="text-black/60 leading-relaxed">Art Direction / UI Design / Frontend Development</p>
                </div>
              </div>
            </div>
          </article>
        </div>
      )}

      {/* 頁尾 */}
      <footer className="py-12 text-center text-[10px] tracking-[0.2em] text-black/30 border-t border-black/5">
        © {new Date().getFullYear()} GUAN WEI DESIGN. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}

export default App;
