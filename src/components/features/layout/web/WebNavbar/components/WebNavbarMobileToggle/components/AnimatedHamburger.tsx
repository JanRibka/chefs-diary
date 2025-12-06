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
        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}
          className={mergeStyles(
            `relative h-12 w-12 rounded-full group`,
            className
          )}
          aria-hidden="true"
        >
          {/* Top Line */}
          <motion.span
            style={{
              left: "50%",
              top: "50%",
              x: "-50%",
            }}
            className="absolute h-0.5 w-6 bg-muted-foreground group-hover:bg-primary transition-colors duration-300 rounded-full origin-center"
            variants={{
              open: {
                rotate: 45,
                y: "-50%",
              },
              closed: {
                rotate: 0,
                y: "calc(-50% - 8px)",
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
            className="absolute h-0.5 w-6 bg-muted-foreground group-hover:bg-primary transition-colors duration-300 rounded-full"
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
              top: "50%",
              x: "-50%",
            }}
            className="absolute h-0.5 w-6 bg-muted-foreground group-hover:bg-primary transition-colors duration-300 rounded-full origin-center"
            variants={{
              open: {
                rotate: -45,
                y: "-50%",
              },
              closed: {
                rotate: 0,
                y: "calc(-50% + 8px)",
              },
            }}
          />
        </motion.div>
      </MotionConfig>
    );
  }
);

AnimatedHamburger.displayName = "AnimatedHamburger";
