import { motion } from 'motion/react';
import {
  Mail,
  MapPin,
  Instagram,
  PenTool,
  Layout,
  Package,
  Image,
} from 'lucide-react';

interface SectionProps {
  setIsHovering?: (val: boolean) => void;
}

export const AboutSection = ({ setIsHovering }: SectionProps) => {
  const skills = [
    { title: 'BRAND IDENTITY', desc: '品牌識別 / 視覺規劃', icon: PenTool },
    { title: 'LAYOUT DESIGN', desc: '版面編排 / 印刷品設計', icon: Layout },
    { title: 'PACKAGE DESIGN', desc: '包裝設計 / 商品視覺', icon: Package },
    { title: 'ILLUSTRATION', desc: '插畫應用 / 風格視覺', icon: Image },
  ];

  return (
    <section
      id="about"
      className="relative bg-[#07101d] text-white px-6 md:px-10 py-28 md:py-36 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_70%,rgba(255,217,249,0.18),transparent_28%),radial-gradient(circle_at_85%_30%,rgba(46,64,111,0.45),transparent_34%)]" />

      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:90px_90px]" />

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-[0.85fr_1.15fr] gap-14 md:gap-20 items-center">
        <div>
          <p className="text-[#ffd9f9] text-xs font-bold tracking-[0.2em] mb-6">
            ABOUT ME
          </p>

          <h2 className="text-[clamp(2.2rem,5vw,5.2rem)] font-black leading-[1.02] tracking-[-0.04em]">
            從設計中思考
            <br />
            用視覺讓事情
            <br />
            變得更好<span className="text-[#ffd9f9]">。</span>
          </h2>

          <p className="mt-8 text-white/58 leading-8 max-w-lg text-sm md:text-base">
            我是 Cheng Kuei Chien，專注於平面視覺、品牌識別、
            包裝設計與版面編排。希望透過乾淨的視覺秩序，
            讓作品更容易被理解，也更有記憶點。
          </p>

          <motion.a
            href="#contact"
            onMouseEnter={() => setIsHovering?.(true)}
            onMouseLeave={() => setIsHovering?.(false)}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96 }}
            className="mt-10 inline-flex items-center gap-4 rounded-full border border-[#ffd9f9]/60 px-7 py-3 text-sm font-bold tracking-[0.12em] text-white hover:bg-[#ffd9f9]/10 transition-colors"
          >
            CONTACT ME
            <span>→</span>
          </motion.a>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {skills.map((skill) => {
            const Icon = skill.icon;

            return (
              <motion.div
                key={skill.title}
                whileHover={{ y: -6 }}
                onMouseEnter={() => setIsHovering?.(true)}
                onMouseLeave={() => setIsHovering?.(false)}
                className="rounded-[1.6rem] p-6 border border-white/10 bg-white/[0.045] backdrop-blur-xl"
              >
                <div className="w-12 h-12 rounded-full bg-[#ffd9f9]/12 text-[#ffd9f9] flex items-center justify-center mb-8">
                  <Icon size={20} />
                </div>

                <h3 className="font-black tracking-[0.12em] text-sm">
                  {skill.title}
                </h3>

                <p className="mt-3 text-white/48 text-sm">{skill.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

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
            如果你有任何合作需求、接案邀約，
            或想聊聊設計相關內容，
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
              href="https://www.instagram.com/xomox727/"
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
