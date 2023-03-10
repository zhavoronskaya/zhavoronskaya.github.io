import { Canvas } from "@react-three/fiber";
import styles from "./Canvas.module.css";
import Experience from "./Experience.js";
import React, { useState, useEffect } from "react";
function useSceneKey() {
  const [key, setKey] = useState(1);
  useEffect(() => {
    const title = document.getElementById("scenename");
    const handleClick = () => setKey(Date.now());
    title.addEventListener("click", handleClick);
    return () => {
      title.removeEventListener("click", handleClick);
    };
  }, []);
  return key;
}

export default function Scene() {
  const key = useSceneKey();
  return (
    <Canvas
      key={key}
      className={styles.canvas}
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.5,
        far: 800,
        position: [0, 4, 8],
      }}
    >
      <Experience />
    </Canvas>
  );
}
