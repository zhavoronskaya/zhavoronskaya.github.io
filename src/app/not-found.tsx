"use client";

import TransitionLink from "@/components/TransitionLink";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const jump = (rotate: number, inView: boolean) => ({
  initial: { y: 0, rotate: 0 },
  animate: inView
    ? { y: [0, -10, 0], rotate: [0, rotate, 0] }
    : { y: 0, rotate: 0 },
  transition: {
    duration: 0.15,
    repeat: inView ? 1 : 0,
    repeatDelay: 0.08,
    repeatType: "reverse" as const,
    ease: "easeOut" as const,
  },
});

export default function NotFound() {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { amount: 0.5 });

  return (
    <div className="px-6 sm:px-8 mt-[calc(50vh-20rem)]">
      <div className="sm:grid sm:grid-cols-12 sm:gap-4">
        <div className="sm:col-start-1 sm:col-span-12 lg:col-start-1 lg:col-span-10">
          <p className="text-dissolve-color text-remarkm sm:text-remarkt lg:text-remark uppercase tracking-wide">
            Error
          </p>
          <h1
            ref={ref}
            className="mt-2 text-hlm sm:text-hlt lg:text-hl font-medium tracking-[0.02em] tabular-nums"
          >
            <motion.span
              className="inline-block text-primary-color"
              {...jump(-8, inView)}
            >
              4
            </motion.span>
            <motion.span
              className="inline-block text-accent-color"
              {...jump(6, inView)}
            >
              0
            </motion.span>
            <motion.span
              className="inline-block text-primary-color"
              {...jump(12, inView)}
            >
              4
            </motion.span>
          </h1>
          <p className="mt-1 text-bodysm sm:text-bodyst lg:text-bodys text-primary-color max-w-xl lowercase">
            Lost in the Render Pipeline
          </p>
          <TransitionLink
            href="/"
            className="mt-10 sm:mt-16 lg:mt-24 inline-block text-accent-color uppercase text-pillsmm sm:text-pillsmt lg:text-pillsm hover:text-accent-color-active font-medium transition-colors"
          >
            Back to home
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
