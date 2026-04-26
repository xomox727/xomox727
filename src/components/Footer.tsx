interface FooterProps {
  setIsHovering?: (val: boolean) => void;
}

export const Footer = ({ setIsHovering }: FooterProps) => {
  return (
    <footer className="bg-[#07101d] text-white px-6 md:px-10 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
        <p className="text-[11px] font-bold tracking-[0.18em]">
          CHENG KUEI CHIEN<span className="text-[#ffd9f9]">.</span>
        </p>

        <p className="text-xs text-white/55">
          © 2026 Cheng Kuei Chien. All rights reserved.
        </p>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onMouseEnter={() => setIsHovering?.(true)}
          onMouseLeave={() => setIsHovering?.(false)}
          className="text-[11px] font-bold tracking-[0.18em] text-white/65 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:rounded-full px-3 py-2"
        >
          TOP ↑
        </button>
      </div>
    </footer>
  );
};
