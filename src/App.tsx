import { useState, useEffect, useMemo } from 'react';
import { WorkSection } from './components/WorkSection';

// 💡 溫馨提醒：等你把這些檔案建立好之後，再把前面的 // 刪掉來啟用它們！
// import { Navbar } from './components/Navbar';
// import { Hero } from './components/Hero';
// import { AboutSection } from './components/AboutSection';
// import { ContactSection } from './components/ContactSection';
// import { CursorCustom } from './components/CursorCustom';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // 1. 監聽網址 Hash 變化，實現「上一頁」返回功能
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      
      // 這是你網頁的四大區塊，如果網址是這些，代表沒有要打開作品
      const pageSections = ['home', 'work', 'about', 'contact'];
      
      if (!hash || pageSections.includes(hash)) {
        setSelectedCategory(null);
      } else {
        setSelectedCategory(hash); // 網址是 branding 等 ID 時，打開作品
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); 
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 2. 關閉作品視窗的邏輯
  const closeDetail = () => {
    window.location.hash = "work"; 
  };

  // 3. 你的作品資料
  const categoriesData = useMemo(() => [
    { id: 'branding', title: 'BRAND IDENTIFICATION', color: 'bg-zinc-200', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80' },
    { id: 'packaging', title: 'PACKAGING DESIGN', color: 'bg-stone-200', image: 'https://images.unsplash.com/photo-1530533335057-0fe91f2d9ad6?auto=format&fit=crop&q=80' },
    { id: 'visual', title: 'VISUAL STRATEGY', color: 'bg-neutral-200', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80' },
    { id: 'advertising', title: 'ADVERTISING', color: 'bg-gray-200', image: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80' },
    { id: 'photography', title: 'PHOTOGRAPHY', color: 'bg-zinc-300', image: 'https://images.unsplash.com/photo-1493723843671-1d655e7d98f0?auto=format&fit=crop&q=80' },
  ], []);

  return (
    <div className="bg-[#f8f8f8] min-h-screen font-sans selection:bg-brand/30 relative">
      
      {/* 臨時的導航欄 Placeholder (等你做好 Navbar 組件就可以替換掉這塊) */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-[40] mix-blend-difference text-white">
        <div className="font-bold tracking-widest text-sm">GUAN WEI</div>
        <div className="flex gap-6 text-xs tracking-widest">
          <a href="#home" className="hover:opacity-50 transition-opacity">HOME</a>
          <a href="#work" className="hover:opacity-50 transition-opacity">WORK</a>
          <a href="#about" className="hover:opacity-50 transition-opacity">ABOUT</a>
          <a href="#contact" className="hover:opacity-50 transition-opacity">CONTACT</a>
        </div>
      </nav>

      <main>
        {/* 1. 首頁 Hero 區塊 Placeholder */}
        <section id="home" className="min-h-screen flex items-center justify-center bg-neutral-200 text-neutral-400">
          <h1 className="text-4xl tracking-widest font-light">HERO SECTION</h1>
        </section>

        {/* 2. 核心作品區塊 (真實組件) */}
        <WorkSection 
          categories={categoriesData} 
          selectedCategory={selectedCategory}
          setIsHovering={setIsHovering}
        />

        {/* 3. 關於我 About 區塊 Placeholder */}
        <section id="about" className="min-h-screen flex items-center justify-center bg-white text-neutral-400">
          <h2 className="text-4xl tracking-widest font-light">ABOUT SECTION</h2>
        </section>

        {/* 4. 聯絡 Contact 區塊 Placeholder */}
        <section id="contact" className="min-h-[50vh] flex items-center justify-center bg-black text-white/50">
          <h2 className="text-4xl tracking-widest font-light">CONTACT SECTION</h2>
        </section>
      </main>

      {/* 作品詳細內容彈出層 */}
      {selectedCategory && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-white p-6 md:p-12 animate-in fade-in duration-300">
          <button 
            onClick={closeDetail}
            className="fixed top-6 right-6 md:top-12 md:right-12 z-[110] w-12 h-12 rounded-full border border-black/10 flex items-center justify-center bg-white hover:bg-black hover:text-white transition-all cursor-pointer"
          >
            ✕
          </button>

          <article className="max-w-5xl mx-auto pt-16 md:pt-24">
            <h1 className="text-4xl md:text-6xl font-light uppercase tracking-tighter mb-10">
              {categoriesData.find(c => c.id === selectedCategory)?.title || selectedCategory}
            </h1>
            <div className="aspect-video bg-neutral-100 rounded-3xl flex items-center justify-center text-neutral-400 tracking-widest text-sm">
              這裡放 {selectedCategory} 的專案詳細圖文...
            </div>
          </article>
        </div>
      )}
    </div>
  );
}

export default App;
