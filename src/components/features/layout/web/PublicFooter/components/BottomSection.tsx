/**
 * BottomSection - Footer bottom section component
 * Contains copyright and version information
 */
export const BottomSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <span>© 2025 Kuchařův deník</span>
          <span>•</span>
          <span>Provozuje Jan Ribka</span>
        </div>

        <div className="text-sm text-slate-500 dark:text-slate-400">
          <span>Všechna práva vyhrazena</span>
        </div>
      </div>
    </div>
  );
};
