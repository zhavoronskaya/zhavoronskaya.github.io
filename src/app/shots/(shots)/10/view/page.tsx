"use client";
import ViewShotPageLayout from "@/modules/shots/components/ViewShotPageLayout";
import Experience from "./Particles3/Experience";
import { Loader, useGLTF } from "@react-three/drei";

useGLTF.preload("/shots/particles/model/mushroomsUv.glb");

export default function Shot() {
  return (
    <>
      <ViewShotPageLayout
        dpr={[1, 1.5]}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [12.96, 16.91, 24.63],
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
