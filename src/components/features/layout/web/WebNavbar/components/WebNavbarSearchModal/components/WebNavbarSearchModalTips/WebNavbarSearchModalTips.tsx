import { memo } from "react";
import { IoBulbOutline } from "react-icons/io5";
import { searchModalTipsStyles } from "./styles/searchModalTipsStyles";
import { SEARCH_TIPS } from "../../constants/searchTips";
import { WebNavbarSearchModalTipsItem } from "./components/WebNavbarSearchModalTipsItem";

/**
 * WebNavbarSearchModalTips
 * Static tips section for the right column
 */
export const WebNavbarSearchModalTips = memo(() => {
  const styles = searchModalTipsStyles();

  return (
    <div className={styles.rightColumn()}>
      <div className="h-full relative overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 p-8 flex flex-col">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 -ml-4 -mb-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
            <IoBulbOutline className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-bold text-default-900 dark:text-default-100 mb-4">
            Tipy pro vyhledávání
          </h3>

          <ul className="space-y-4">
            {SEARCH_TIPS.map((tip) => (
              <WebNavbarSearchModalTipsItem
                key={tip.key}
                label={tip.label}
                text={tip.text}
              />
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-8">
          <p className="text-xs text-default-400 italic">
            &quot;Vaření je jako láska. Je třeba do něj vstoupit s nespoutanou
            vášní nebo vůbec.&quot;
          </p>
        </div>
      </div>
    </div>
  );
});

WebNavbarSearchModalTips.displayName = "WebNavbarSearchModalTips";
