"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import particlesVertexShader from "./shaders/particles/vertex";
import particlesFragmentShader from "./shaders/particles/fragment";

const count = 7000;
const size = 800;
const radius = 30.0;
const uniforms = {
  uTime: new THREE.Uniform(0),
  uSize: new THREE.Uniform(size),
};

const pointsGeometry = (() => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const spherical = new THREE.Spherical();
  const position = new THREE.Vector3();
  for (let i = 0; i < count; i++) {
    spherical.radius = radius * (0.25 + Math.random() * 0.75);
    spherical.phi = Math.random() * Math.PI;
    spherical.theta = Math.random() * Math.PI * 2;
    position.setFromSpherical(spherical);
    positions[i * 3] = position.x;
    positions[i * 3 + 1] = position.y;
    positions[i * 3 + 2] = position.z;
    scales[i] = Math.random();
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  return geometry;
})();

function Particles() {
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null);

  useFrame((_state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta * 0.1;
    }
  });

  return (
    <points geometry={pointsGeometry}>
      <shaderMaterial
        ref={shaderRef}
        vertexShader={particlesVertexShader}
        fragmentShader={particlesFragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        transparent={true}
      />
    </points>
  );
}

export default Particles;
