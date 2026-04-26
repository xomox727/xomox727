export const ContactSection = ({ setIsHovering }: SectionProps) => {
  return (
    <section
      id="contact"
      className="relative bg-[#f8f7f4] dark:bg-[#070b12] px-6 md:px-10 py-28 md:py-36 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_45%,rgba(255,217,249,0.38),transparent_25%),radial-gradient(circle_at_20%_20%,rgba(46,64,111,0.08),transparent_30%)] dark:bg-[radial-gradient(circle_at_80%_45%,rgba(255,217,249,0.10),transparent_25%),radial-gradient(circle_at_20%_20%,rgba(46,64,111,0.24),transparent_30%)]" />

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
        <div>
          <p className="text-[#ffd9f9] text-xs font-bold tracking-[0.2em] mb-6">
            CONTACT
          </p>

          <h2 className="text-[#2e406f] dark:text-white text-[clamp(2.5rem,5vw,5.5rem)] font-black leading-[0.98] tracking-[-0.04em]">
            LET&apos;S CREATE
            <br />
            SOMETHING
            <br />
            GREAT<span className="text-[#ffd9f9]">.</span>
          </h2>

          <p className="mt-8 text-[#2e406f]/60 dark:text-white/55 leading-8 max-w-md text-sm md:text-base">
            如果你有任何合作需求、接案邀約，或想聊聊設計相關內容，
            歡迎直接與我聯繫。
          </p>
        </div>

        <div className="rounded-[2rem] bg-white/65 dark:bg-white/[0.06] border border-white/70 dark:border-white/10 p-8 md:p-10 shadow-[0_20px_70px_rgba(46,64,111,0.10)]">
          <div className="space-y-7">
            <a
              href="mailto:xomox727@gmail.com"
              onMouseEnter={() => setIsHovering?.(true)}
              onMouseLeave={() => setIsHovering?.(false)}
              className="flex items-center gap-5 text-[#2e406f] dark:text-white"
            >
              <span className="w-12 h-12 rounded-full bg-[#ffd9f9]/45 flex items-center justify-center">
                <Mail size={18} />
              </span>

              <div>
                <p className="text-[10px] tracking-[0.2em] font-bold opacity-50">
                  EMAIL
                </p>
                <p className="font-bold">xomox727@gmail.com</p>
              </div>
            </a>

            <div className="flex items-center gap-5 text-[#2e406f] dark:text-white">
              <span className="w-12 h-12 rounded-full bg-[#ffd9f9]/45 flex items-center justify-center">
                <MapPin size={18} />
              </span>

              <div>
                <p className="text-[10px] tracking-[0.2em] font-bold opacity-50">
                  LOCATION
                </p>
                <p className="font-bold">台灣 / 台南</p>
              </div>
            </div>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setIsHovering?.(true)}
              onMouseLeave={() => setIsHovering?.(false)}
              className="flex items-center gap-5 text-[#2e406f] dark:text-white"
            >
              <span className="w-12 h-12 rounded-full bg-[#ffd9f9]/45 flex items-center justify-center">
                <Instagram size={18} />
              </span>

              <div>
                <p className="text-[10px] tracking-[0.2em] font-bold opacity-50">
                  SOCIAL
                </p>
                <p className="font-bold">@xomox727</p>
              </div>
            </a>
          </div>

          <motion.a
            href="mailto:xomox727@gmail.com"
            onMouseEnter={() => setIsHovering?.(true)}
            onMouseLeave={() => setIsHovering?.(false)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="mt-10 inline-flex w-full justify-center items-center gap-4 rounded-full bg-[#2e406f] dark:bg-white text-white dark:text-[#2e406f] px-7 py-4 text-sm font-bold tracking-[0.12em]"
          >
            SEND MESSAGE
            <span>→</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};
