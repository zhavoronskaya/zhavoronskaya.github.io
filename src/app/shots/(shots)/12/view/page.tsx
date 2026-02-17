"use client";
import ViewShotPageLayout from "@/modules/shots/components/ViewShotPageLayout";
import Experience from "./FBO2/Experience";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("/shots/fbo/model/flower.glb");

export default function Shot() {
  return (
    <ViewShotPageLayout
      // frameloop="demand"
      dpr={[1, 1.5]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [0, 8, 2],
      }}
      withActions={true}
      hrefBackArrow="/shots"
    >
      <Experience />
    </ViewShotPageLayout>
  );
}
