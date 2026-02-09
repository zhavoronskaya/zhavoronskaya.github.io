"use client";

import React, { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  id?: string;
  children: string;
  delay?: number;
  className: string;
};

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const GradientText = ({ id, children, className }: Props) => {
  const words = children.split(" ");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  const letterData = useMemo(() => {
    const flat: { char: string; isLast: boolean; gradientDeg: number }[] = [];
    words.forEach((word) => {
      const chars = word.split("");
      chars.forEach((char, i) => {
        flat.push({
          char,
          isLast: i === chars.length - 1,
          gradientDeg: (Math.random() + 1) * 45,
        });
      });
    });
    const order = shuffle(flat.map((_, i) => i));
    return flat.map((item, i) => ({ ...item, staggerOrder: order[i] }));
  }, [children]);

  let letterIndex = 0;

  return (
    <div ref={ref} id={id} className={className}>
      {words.map((word, widx) => (
        <span className="inline-block" key={widx}>
          {word.split("").map((letter, idx) => {
            const data = letterData[letterIndex++];
            const letterContent = data.isLast ? <>{letter}&nbsp;</> : letter;
            return (
              <span
                key={`${widx}-${idx}`}
                className="inline-block relative"
                style={{
                  backgroundImage: `linear-gradient(${data.gradientDeg}deg, #F08CAE, #0B0014)`,
                  color: "transparent",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {letterContent}
                <motion.span
                  className="absolute inset-0 inline-block"
                  style={{ color: "#0B0014" }}
                  initial={{ opacity: 1 }}
                  animate={isInView ? { opacity: [1, 0, 1] } : { opacity: 1 }}
                  transition={{
                    duration: 0.1,
                    repeat: 1,
                    repeatDelay: 0.2,
                    repeatType: "reverse",
                    delay: 0.05 + data.staggerOrder * 0.05,
                    ease: "easeOut",
                  }}
                >
                  {letterContent}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
};

export default GradientText;
