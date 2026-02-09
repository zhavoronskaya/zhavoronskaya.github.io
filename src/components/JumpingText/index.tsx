"use client";

import React, { useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  id?: string;
  children: string;
  delay?: number;
  className: string;
  y?: number;
};

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const JumpingText = ({ id, children, className, y = 18 }: Props) => {
  const words = children.split(" ");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const letterData = useMemo(() => {
    const flat: { char: string; isLast: boolean; rotate: number }[] = [];
    words.forEach((word) => {
      const chars = word.split("");
      chars.forEach((char, i) => {
        flat.push({
          char,
          isLast: i === chars.length - 1,
          rotate: Math.random() > 0.5 ? Math.random() * 5 : -Math.random() * 20,
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
            return (
              <motion.span
                key={`${widx}-${idx}`}
                className="inline-block"
                initial={{ y: 0, rotate: 0 }}
                animate={
                  isInView
                    ? { y: [0, -y], rotate: [0, data.rotate] }
                    : { y: 0, rotate: 0 }
                }
                transition={{
                  duration: 0.12,
                  repeat: 1,
                  repeatDelay: 0.1,
                  repeatType: "reverse",
                  delay: 0.1 + data.staggerOrder * 0.05,
                  ease: "easeOut",
                }}
              >
                {data.isLast ? <>{letter}&nbsp;</> : letter}
              </motion.span>
            );
          })}
        </span>
      ))}
    </div>
  );
};

export default JumpingText;
