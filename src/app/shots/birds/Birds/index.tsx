"use client";
import BaseCanvas from "@/theme/components/BaseCanvas";
import Experience from "./Experience.js";

export default function Scene() {
  return (
    <BaseCanvas
      shadows
      dpr={[1, 2]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [4, 3, 15],
      }}
    >
      <Experience />
    </BaseCanvas>
  );
}
