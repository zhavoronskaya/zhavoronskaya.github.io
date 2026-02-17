"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import particlesVertexShader from "./shaders/particles/vertex";
import particlesFragmentShader from "./shaders/particles/fragment";

const count = 10000;
const size = 800;

const pointsGeometry = (() => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 5.0;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 5.0;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5.0;
    scales[i] = Math.random();
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  return geometry;
})();

function Particles() {
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null);
  const uniforms = useRef({
    uTime: new THREE.Uniform(0),
    uSize: new THREE.Uniform(size),
  });

  useFrame((_state, delta) => {
    if (shaderRef.current)
      shaderRef.current.uniforms.uTime.value += delta * 0.1;
  });

  return (
    <points geometry={pointsGeometry}>
      <shaderMaterial
        ref={shaderRef}
        vertexShader={particlesVertexShader}
        fragmentShader={particlesFragmentShader}
        uniforms={uniforms.current}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        transparent={true}
      />
    </points>
  );
}

export default Particles;
