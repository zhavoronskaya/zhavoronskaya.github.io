"use client";
import ViewShotPageLayout from "@/modules/shots/components/ViewShotPageLayout";
import Experience from "./FBO4/Experience";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("/shots/fbo/model/dolphinCompr.glb");

export default function Shot() {
  return (
    <ViewShotPageLayout
      // frameloop="demand"
      dpr={[1, 1.5]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [-6, 0, -4],
      }}
      withActions={true}
      hrefBackArrow="/shots"
    >
      <Experience />
    </ViewShotPageLayout>
  );
}
