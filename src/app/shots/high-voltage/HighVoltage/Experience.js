import { Suspense, useEffect, useRef, useState } from "react";
import React from "react";

import { OrbitControls, Stage, Environment } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";

import Model from "./Model.js";
import * as THREE from "three";
import {
  DepthOfField,
  Bloom,
  EffectComposer,
} from "@react-three/postprocessing";

export default function Experience() {
  useFrame((state, delta) => {});
  return (
    <>
      <OrbitControls
      // onEnd={(e) => console.log(e.target.object.position.toArray())}
      />

      <color args={["#F3CBFE"]} attach="background" />
      {/* <EffectComposer multisampling={4}>
        <DepthOfField
          focusDistance={0.025}
          focalLength={0.55}
          bokehScale={10}
        />
        <Bloom mipmapBlur intensity={0.2} luminanceThreshold={1} />
      </EffectComposer> */}

      {/* <Environment preset="sunset"></Environment> */}
      {/* <color args={["#000000"]} attach="background" /> */}

      <Suspense fallback={"LOADING"}>
        <Stage intensity={2}>
          <Model position={new THREE.Vector3(0, 0, 0)} yo="11" />

          <Model position={new THREE.Vector3(0, 0, -10)} yo="22" />

          <Model position={new THREE.Vector3(0, 0, 10)} yo="33" />
        </Stage>
      </Suspense>
    </>
  );
}
