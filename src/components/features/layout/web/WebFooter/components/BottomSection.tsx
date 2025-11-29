import { memo } from 'react';

/**
 * BottomSection - Footer bottom section component
 * Contains copyright and version information
 */
export const BottomSection = memo(() => {
  const currentYear = new Date().getFullYear();
  const copyrightText = currentYear === 2025 ? "2025" : `2025 - ${currentYear}`;

  return (
    <div className="max-w-main mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <span>© {copyrightText} Kuchařův deník</span>
          <span>•</span>
          <span>Provozuje Jan Ribka</span>
        </div>

        <div className="text-sm text-slate-500 dark:text-slate-400">
          <span>Všechna práva vyhrazena</span>
        </div>
      </div>
    </div>
  );
});

BottomSection.displayName = "BottomSection";
