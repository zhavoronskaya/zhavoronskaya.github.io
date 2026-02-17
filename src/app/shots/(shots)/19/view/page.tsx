"use client";
import ViewShotPageLayout from "@/modules/shots/components/ViewShotPageLayout";
import Experience from "./Transparent4/Experience";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("/shots/transparent/model/rose.glb");

export default function Shot() {
  return (
    <ViewShotPageLayout
      // frameloop="demand"
      dpr={[1, 1.5]}
      camera={{
        fov: 45,
        near: 0.1,
        far: 100,
        position: [7, 18, 10],
      }}
      withActions={true}
      hrefBackArrow="/shots"
    >
      <Experience />
    </ViewShotPageLayout>
  );
}
