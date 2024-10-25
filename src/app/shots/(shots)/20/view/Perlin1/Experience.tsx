import { Suspense } from "react";
import { Html, OrbitControls, useProgress } from "@react-three/drei";
import Perlin from "./Perlin";

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return (
    <Html center style={{ color: "rgba(11, 0, 20, 1)", fontFamily: "Satoshi" }}>
      Loading...
    </Html>
  );
}

export default function Experience() {
  return (
    <>
      <color args={["#FFFFFF"]} attach="background" />
      <OrbitControls
        makeDefault
        minDistance={9}
        screenSpacePanning={false}
        maxDistance={30}
        zoomSpeed={1}
        // enablePan={false}
        enableDamping
      />
      <Suspense fallback={<Loader />}>
        <Perlin />
      </Suspense>
    </>
  );
}