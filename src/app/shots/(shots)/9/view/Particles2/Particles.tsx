"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import particlesVertexShader from "./shaders/particles/vertex";
import particlesFragmentShader from "./shaders/particles/fragment";
import { useGLTF } from "@react-three/drei";

const size = 80;
const uniforms = {
  uTime: new THREE.Uniform(0),
  uSize: new THREE.Uniform(size),
};

function Particles() {
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null);
  const { nodes } = useGLTF("/shots/particles/model/tree2.glb");
  const tree = nodes.tree1 as THREE.Mesh;

  useFrame((_state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta * 0.5;
    }
  });

  const pointsGeometry = useMemo(() => {
    const posAttr = tree.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;
    const count = posAttr.count;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i2 = i * 2;
      positions[i * 3] = arr[i2];
      positions[i * 3 + 1] = arr[i2 + 1];
      positions[i * 3 + 2] = arr[i2 + 2];
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      scales[i] = Math.random();
    }
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    return geometry;
  }, [tree]);

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
