import React from 'react';
import { useApp } from '../context/AppContext';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbsProps {
  items: { labelBn: string; labelEn: string; view?: string }[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const { lang, setCurrentView } = useApp();

  return (
    <nav className="flex items-center gap-1.5 text-xs text-stone-500 py-3 font-medium">
      <button
        onClick={() => setCurrentView('home')}
        className="flex items-center gap-1 hover:text-amber-800 transition-colors"
      >
        <Home className="w-3.5 h-3.5 text-amber-700" />
        <span>{lang === 'bn' ? 'হোম' : 'Home'}</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
            {isLast || !item.view ? (
              <span className="text-amber-950 font-semibold truncate max-w-xs">
                {lang === 'bn' ? item.labelBn : item.labelEn}
              </span>
            ) : (
              <button
                onClick={() => item.view && setCurrentView(item.view)}
                className="hover:text-amber-800 transition-colors truncate max-w-xs"
              >
                {lang === 'bn' ? item.labelBn : item.labelEn}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
