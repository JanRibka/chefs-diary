import { HiSparkles } from "react-icons/hi";

import Button from "@/components/shared/button/Button";

/**
 * NewsletterSection - Newsletter subscription section component
 * Contains the newsletter signup form with styling and layout
 */
export const NewsletterSection = () => {
  return (
    <div className="border-b border-orange-200/30 dark:border-orange-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-3xl mx-auto">
          {/* TODO: Vtvo5it kompoernentu */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 px-6 py-3 rounded-full mb-6">
            <HiSparkles className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            <span className="text-orange-800 dark:text-orange-300 font-medium">
              Zůstaňte v obraze
            </span>
          </div>
          {/* TODO: Vtvo5it kompoernentu */}
          <h3 className="text-3xl lg:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Týdenní kulinářské inspirace
            </span>
          </h3>

          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Každý týden dostanete nejlepší recepty, tipy od profesionálních
            kuchařů a exkluzivní obsah přímo do emailu.
          </p>
          {/* TODO M2la by b7t komponenta z hero a taky by m2la b7t v shared, pou69v8 se to na v9ce m9stech*/}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <div className="flex-1">
              <input
                type="email"
                placeholder="váš@email.cz"
                className="w-full px-6 py-4 rounded-2xl border-2 border-orange-200 dark:border-orange-800 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-orange-500 dark:focus:border-orange-400 focus:ring-4 focus:ring-orange-500/20 transition-all"
              />
            </div>
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-red-600 transition-all duration-200"
            >
              Odebírat
            </Button>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
            ✨ Žádný spam, odhlásit se můžete kdykoliv
          </p>
        </div>
      </div>
    </div>
  );
};
