import { Canvas } from "@react-three/fiber";
import styles from "./Canvas.module.css";
import Experience from "./Experience.js";
import React from "react";

export default function Scene() {
  return (
    <Canvas
      shadows
      className={styles.canvas}
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [4, 3, 8],
      }}
    >
      <Experience />
    </Canvas>
  );
}
