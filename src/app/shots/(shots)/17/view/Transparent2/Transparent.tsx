"use client";

import { useRef, useMemo, type ComponentRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import vertexShader from "./shaders/transparent/vertex";
import fragmentShader from "./shaders/transparent/fragment";

import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";

const size = 20;
const uniforms = {
  uTime: new THREE.Uniform(0),
  uSize: new THREE.Uniform(size),
};

function Transparent() {
  const shaderRef = useRef<THREE.ShaderMaterial | null>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const transmissionRef =
    useRef<ComponentRef<typeof MeshTransmissionMaterial>>(null);
  const transmissionShaderRef =
    useRef<THREE.WebGLProgramParametersWithUniforms | null>(null);

  const { nodes } = useGLTF("/shots/transparent/model/shell.glb");
  const shell = nodes.shell as THREE.Mesh;

  const pointsGeometry = useMemo(() => {
    if (!shell) return null;
    const posAttr = shell.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;
    const count = posAttr.count;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const i1 = i * 3;
      positions[i * 3] = arr[i1];
      positions[i * 3 + 1] = arr[i1 + 1];
      positions[i * 3 + 2] = arr[i1 + 2];
      scales[i] = Math.random();
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    return geometry;
  }, [shell]);

  useFrame((_state, delta) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.uTime.value += delta * 0.5;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.4;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.6;
    }
  });

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      <mesh position={[0, 0, 0]} ref={meshRef}>
        <boxGeometry args={[0.8, 0.8, 0.8, 64, 64]} />
        <MeshTransmissionMaterial
          distortion={0.5}
          distortionScale={0.9}
          thickness={1.08}
          ior={1.0}
          roughness={0.2}
          transmission={1.0}
          chromaticAberration={5.0}
          anisotropicBlur={10.0}
        />
      </mesh>

      {pointsGeometry && (
        <group scale={0.05}>
          <points geometry={pointsGeometry} ref={pointsRef}>
            <shaderMaterial
              ref={shaderRef}
              transparent={true}
              uniforms={uniforms}
              vertexShader={vertexShader}
              fragmentShader={fragmentShader}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              vertexColors
            />
          </points>
        </group>
      )}
    </group>
  );
}

export default Transparent;
