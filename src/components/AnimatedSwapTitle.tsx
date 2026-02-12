"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type AnimatedSwapTitleProps = {
  topText: string;
  bottomText: string;
  intervalMs?: number;
  className?: string;
};

const AnimatedSwapTitle = ({
  topText,
  bottomText,
  intervalMs = 2200,
  className = "",
}: AnimatedSwapTitleProps) => {
  const [swapped, setSwapped] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSwapped((prev) => !prev);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return (
    <div className={className}>
      <div className="relative h-[1.2em] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={swapped ? "top-b" : "top-a"}
            className="block"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {swapped ? bottomText : topText}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="relative h-[1.2em] overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={swapped ? "bottom-a" : "bottom-b"}
            className="block"
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {swapped ? topText : bottomText}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimatedSwapTitle;
