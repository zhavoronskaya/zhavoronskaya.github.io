"use client";
import ViewShotPageLayout from "@/modules/shots/components/ViewShotPageLayout";
import Experience from "./Transparent1/Experience";
import { useGLTF } from "@react-three/drei";

useGLTF.preload("/shots/transparent/model/abstract1compr.glb");

export default function Shot() {
  return (
    <ViewShotPageLayout
      // frameloop="demand"
      dpr={[1,1.5]}
      camera={{
        fov: 45,
        near: 0.5,
        far: 800,
        position: [-36.67, 15.54, -10.36],
      }}
      withActions={true}
      hrefBackArrow="/shots"
    >
      <Experience />
    </ViewShotPageLayout>
  );
}
