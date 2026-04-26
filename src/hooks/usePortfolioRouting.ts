import { useEffect, useRef, useState } from 'react';
import type { Work } from '../data/works';

type Category = {
  id: string;
  works: Work[];
};

export function usePortfolioRouting(categories: Category[]) {
  const [selectedCategory, setSelectedCategoryState] = useState<string | null>(null);
  const [selectedWork, setSelectedWorkState] = useState<Work | null>(null);
  const [enlargedImage, setEnlargedImageState] = useState<string | null>(null);

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
    const syncStateWithHash = () => {
      const hash = window.location.hash.replace('#', '');
      const [catId, workId, imgParam] = hash.split('/');

      if (!hash || ['work', 'about', 'contact'].includes(hash)) {
        setSelectedCategoryState(null);
        setSelectedWorkState(null);
        setEnlargedImageState(null);
        return;
      }

      const currentCat = categories.find((category) => category.id === catId);

      if (!currentCat) return;

      setSelectedCategoryState(catId);

      if (!workId) {
        setSelectedWorkState(null);
        setEnlargedImageState(null);
        return;
      }

      const currentWork = currentCat.works.find((work) => work.id === workId) ?? null;

      setSelectedWorkState(currentWork);

      if (!currentWork || !imgParam) {
        setEnlargedImageState(null);
        return;
      }

      if (imgParam.startsWith('img-') && currentWork.galleryImages) {
        const imageIndex = Number(imgParam.replace('img-', ''));
        setEnlargedImageState(currentWork.galleryImages[imageIndex] ?? null);
      } else {
        setEnlargedImageState(decodeURIComponent(imgParam));
      }
    };

    window.addEventListener('popstate', syncStateWithHash);
    window.addEventListener('hashchange', syncStateWithHash);

    syncStateWithHash();

    return () => {
      window.removeEventListener('popstate', syncStateWithHash);
      window.removeEventListener('hashchange', syncStateWithHash);
    };
  }, [categories]);

  const setSelectedCategory = (id: string | null) => {
    executeNav(() => {
      if (id) {
        setSelectedCategoryState(id);
        window.history.pushState(null, '', `#${id}`);
      } else {
        window.history.back();
      }
    });
  };

  const setSelectedWork = (work: Work | null) => {
    executeNav(() => {
      if (work && selectedCategory) {
        setSelectedWorkState(work);
        window.history.pushState(null, '', `#${selectedCategory}/${work.id}`);
      } else {
        window.history.back();
      }
    });
  };

  const setEnlargedImage = (image: string | null) => {
    executeNav(() => {
      if (image && selectedCategory && selectedWork) {
        setEnlargedImageState(image);

        const imageIndex = selectedWork.galleryImages?.findIndex((item) => item === image) ?? 0;

        window.history.pushState(
          null,
          '',
          `#${selectedCategory}/${selectedWork.id}/img-${imageIndex}`,
        );
      } else {
        window.history.back();
      }
    });
  };

  return {
    selectedCategory,
    selectedWork,
    enlargedImage,
    setSelectedCategory,
    setSelectedWork,
    setEnlargedImage,
  };
}
