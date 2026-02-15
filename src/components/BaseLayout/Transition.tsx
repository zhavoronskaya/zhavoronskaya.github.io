"use client";

import { motion } from "framer-motion";

export default function Transition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
      style={{
        height: "100%",
        willChange: "transform, opacity",
        overflow: "auto",
      }}
    >
      {children}
    </motion.div>
  );
}
