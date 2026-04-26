import { useEffect, useRef, useState } from 'react';

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState('home');
  const isScrollingRef = useRef(false);
  const navLock = useRef(false);

  const executeNav = (action: () => void) => {
    if (navLock.current) return;

    navLock.current = true;
    action();

    setTimeout(() => {
      navLock.current = false;
    }, 100);
  };

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const syncHomeHash = () => {
      const hash = window.location.hash.replace('#', '');

      if (hash === '') {
        setActiveSection('home');

        if (window.scrollY > 20) {
          isScrollingRef.current = true;
          window.scrollTo({ top: 0, behavior: 'smooth' });

          setTimeout(() => {
            isScrollingRef.current = false;
          }, 800);
        }

        return;
      }

      if (['work', 'about', 'contact'].includes(hash)) {
        setActiveSection(hash);
      }
    };

    window.addEventListener('hashchange', syncHomeHash);
    syncHomeHash();

    return () => window.removeEventListener('hashchange', syncHomeHash);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (document.body.classList.contains('modal-open') || isScrollingRef.current) return;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const current = entry.target.id;
          setActiveSection(current);

          const currentHash = window.location.hash.replace('#', '');

          if (current === 'home') {
            if (currentHash) {
              window.history.replaceState(null, '', window.location.pathname);
            }
          } else if (!currentHash) {
            window.history.pushState(null, '', `#${current}`);
          } else if (['work', 'about', 'contact'].includes(currentHash) && currentHash !== current) {
            window.history.replaceState(null, '', `#${current}`);
          }
        });
      },
      {
        rootMargin: '-40% 0px -50% 0px',
      },
    );

    ['home', 'work', 'about', 'contact'].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id: string) => {
    executeNav(() => {
      if (id === 'home') {
        setActiveSection('home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.replaceState(null, '', window.location.pathname);
        return;
      }

      const element = document.getElementById(id);

      if (!element) return;

      const currentHash = window.location.hash.replace('#', '');

      if (!currentHash) {
        window.history.pushState(null, '', `#${id}`);
      } else if (['work', 'about', 'contact'].includes(currentHash)) {
        window.history.replaceState(null, '', `#${id}`);
      }

      element.scrollIntoView({ behavior: 'smooth' });
    });
  };

  return {
    activeSection,
    handleNavClick,
  };
}
