import { mergeStyles } from "@/lib/utils/styles";
import { motion, MotionConfig } from "framer-motion";
import { memo } from "react";

interface AnimatedHamburgerProps {
  isOpen: boolean;
  className?: string;
}

/**
 * AnimatedHamburger - Modern animated toggle icon
 * Smoothly transitions between hamburger (3 lines) and X (close) state
 */
export const AnimatedHamburger = memo(
  ({ isOpen, className }: AnimatedHamburgerProps) => {
    return (
      <MotionConfig transition={{ duration: 0.4, ease: "easeInOut" }}>
        <motion.button
          initial={false}
          animate={isOpen ? "open" : "closed"}
          className={mergeStyles(
            `relative h-12 w-12 rounded-full flex flex-col items-center justify-center gap-1.5`,
            className
          )}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {/* Top Line */}
          <motion.span
            style={{
              left: "50%",
              top: "35%",
              x: "-50%",
              y: "-50%",
            }}
            className="absolute h-0.5 w-6 bg-current rounded-full origin-center"
            variants={{
              open: {
                rotate: 45,
                top: "50%",
              },
              closed: {
                rotate: 0,
                top: "35%",
              },
            }}
          />

          {/* Middle Line */}
          <motion.span
            style={{
              left: "50%",
              top: "50%",
              x: "-50%",
              y: "-50%",
            }}
            className="absolute h-0.5 w-6 bg-current rounded-full"
            variants={{
              open: {
                opacity: 0,
                scale: 0.5,
              },
              closed: {
                opacity: 1,
                scale: 1,
              },
            }}
          />

          {/* Bottom Line */}
          <motion.span
            style={{
              left: "50%",
              top: "65%",
              x: "-50%",
              y: "-50%",
            }}
            className="absolute h-0.5 w-6 bg-current rounded-full origin-center"
            variants={{
              open: {
                rotate: -45,
                top: "50%",
              },
              closed: {
                rotate: 0,
                top: "65%",
              },
            }}
          />
        </motion.button>
      </MotionConfig>
    );
  }
);

AnimatedHamburger.displayName = "AnimatedHamburger";
