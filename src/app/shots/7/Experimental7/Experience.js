import { Suspense, useRef } from "react";
import { Environment } from "@react-three/drei";
import React from "react";

import { shaderMaterial, OrbitControls, Sparkles } from "@react-three/drei";

import paintingVertexShader from "./shaders/vertex.js";
import paintingFragmentShader from "./shaders/fragment.js";

import { useThree, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";
import {
  DepthOfField,
  Bloom,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

const ExperimentalShapeMaterialSeven = shaderMaterial(
  {
    uTime: 0,
    uIterration: 4,
    uResolution: new THREE.Vector2(0, 0),
  },
  paintingVertexShader,
  paintingFragmentShader
);
extend({ ExperimentalShapeMaterialSeven });

function Painting() {
  const shaderRef = useRef();
  const geomertyRef = useRef();
  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uTime += delta * 1.1;
      shaderRef.current.uResolution = new THREE.Vector2(
        1,
        viewport.height / viewport.width
      );
    }
    // state.camera.fov = Math.sin(state.clock.getElapsedTime()) * 10 + 45;
    // state.camera.updateProjectionMatrix();
    // geomertyRef.current.rotation.z += delta * 0.2;
  });
  return (
    <mesh rotation={[Math.PI / 6, 0, 0]} ref={geomertyRef} scale={[1.5, 1, 1]}>
      {/* <planeGeometry
        ref={geomertyRef}
        args={[viewport.width, viewport.height, 64, 64]}
      /> */}
      {/* <torusGeometry args={[4, 0.8, 128, 256]} /> */}
      <sphereGeometry args={[2, 512, 512]} />
      {/* <torusKnotGeometry args={[4, 0.8, 128, 256]} /> */}
      <experimentalShapeMaterialSeven ref={shaderRef} wireframe={false} />
    </mesh>
  );
}

export default function Experience() {
  return (
    <>
      <EffectComposer multisampling={4}>
        {/* <DepthOfField
          focusDistance={0.8}
          focalLength={0.02}
          bokehScale={1}
          height={480}
        /> */}
        {/* <Vignette eskil={false} offset={0.1} darkness={1.0} /> */}
        {/* <Bloom luminanceThreshold={1.2} luminanceSmoothing={0.9} height={300} /> */}
        <Noise opacity={0.01} />
      </EffectComposer>
      <color args={["#a395ab"]} attach="background" />
      <OrbitControls />
      {/* <Sparkles
        size={5}
        scale={[40, 40, 40]}
        speed={10}
        count={1000}
        color={"bc4fc2"}
      /> */}

      <Suspense fallback={null}>
        <Painting />
      </Suspense>
    </>
  );
}
