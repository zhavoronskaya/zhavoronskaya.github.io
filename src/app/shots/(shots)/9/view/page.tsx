"use client";
import ViewShotPageLayout from "@/modules/shots/components/ViewShotPageLayout";
import Experience from "./Particles2/Experience";
import { Loader, useGLTF } from "@react-three/drei";

useGLTF.preload("/shots/particles/model/tree2.glb");

export default function Shot() {
  return (
    <>
      <ViewShotPageLayout
        dpr={[1, 1.5]}
        camera={{
          fov: 45,
          near: 0.5,
          far: 800,
          position: [0, 0, 20],
        }}
        withActions={true}
        hrefBackArrow="/shots"
      >
        <Experience />
      </ViewShotPageLayout>
      <Loader />
    </>
  );
}
