"use client";
import BaseCanvas from "@/theme/components/BaseCanvas";
import Experience from "./Experience.js";

export default function Scene() {
  // return <h2>TEST</h2>;
  return (
    <BaseCanvas
      shadows
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 5, 9],
      }}
    >
      <Experience />
    </BaseCanvas>
  );
}
