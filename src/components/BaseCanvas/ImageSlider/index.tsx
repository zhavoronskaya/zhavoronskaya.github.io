import { useFrame, useThree } from "@react-three/fiber";
import { memo, useCallback, useEffect, useRef } from "react";
import {
  Group,
  Mesh,
  ShaderMaterial,
  Texture,
  Uniform,
  Vector2,
  Vector3,
} from "three";
import vertex from "@/shaders/slider/vertex";
import fragment from "@/shaders/slider/fragment";

import * as TWEEN from "@tweenjs/tween.js";
import { isShaderMaterial } from "@/helpers/Material";
import { isMesh } from "@/helpers/Object3d";
import { disposeMesh } from "@/helpers/Mesh";

type Props = {
  textures: Texture[];
  activeImageIdx: number;
  sizes: [number, number];
};

function initUniforms(texture: Texture) {
  return {
    uTime: new Uniform(0),
    uImage: new Uniform(texture),
    uResolution: new Uniform(new Vector2(600, 600)),
    uProgress: new Uniform(0),
    uMouse: new Uniform(new Vector2(0.0, 0.0)),
  };
}
const CanvasImageSlider = ({ textures, activeImageIdx, sizes }: Props) => {
  const group = useRef<Group>(null);
  const queueGroup = useRef<Group>(null);
  const active = useRef<Mesh | null>(null);

  const { pointer } = useThree();
  const pointerRef = useRef(pointer);
  pointerRef.current = pointer;

  const meshFadeOut = useCallback((mesh: Mesh | null) => {
    if (!mesh) return;
    if (!(mesh.material instanceof ShaderMaterial)) return;

    const mat = mesh.material;
    mat.depthWrite = false;
    mesh.renderOrder = 1;

    const uniforms = mat.uniforms;
    const data = { z: mesh.position.z, progress: 0 };
    const to = { z: 500, progress: 1 };
    const ndcX = pointerRef.current.x;
    const ndcY = pointerRef.current.y;
    const uvX = (ndcX + 1) * 0.5;
    const uvY = (ndcY + 1) * 0.5;
    uniforms.uMouse.value.set(uvX, uvY);

    new TWEEN.Tween(data, true)
      .to(to, 2000)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(() => {
        mesh.position.z = data.z;
        uniforms.uProgress.value = data.progress;
      })
      .onComplete(() => {
        if (!queueGroup.current) return;
        queueGroup.current.remove(mesh);
        disposeMesh(mesh);
      })
      .start();
  }, []);

  const addMesh = useCallback(
    (idx: number) => {
      if (!group.current) return;
      if (!queueGroup.current) return;

      const originalMesh = group.current.children[idx];
      if (!isMesh(originalMesh)) return;

      const originaMaterial = originalMesh.material;
      if (!isShaderMaterial(originaMaterial)) return;

      const mesh = new Mesh(
        originalMesh.geometry.clone(),
        originaMaterial.clone()
      );

      meshFadeOut(active.current);
      active.current = mesh;
      active.current.position.z = 200;
      active.current.renderOrder = 0;
      queueGroup.current.add(active.current);

      const data = { position: mesh.position };
      const to = { position: new Vector3(0, 0, 0) };
      new TWEEN.Tween(data, true)
        .to(to, 1500)
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
    },
    [meshFadeOut]
  );

  useEffect(() => {
    addMesh(activeImageIdx);
  }, [addMesh, activeImageIdx]);

  useFrame(() => {
    TWEEN.update(typeof performance !== "undefined" ? performance.now() : 0);
  });

  return (
    <>
      <group ref={queueGroup} />
      <group ref={group}>
        <Meshes textures={textures} sizes={sizes} />
      </group>
    </>
  );
};

const Meshes = memo(
  function Meshes({
    textures,
    sizes,
  }: {
    textures: Texture[];
    sizes: [number, number];
  }) {
    const { viewport } = useThree();
    return (
      <>
        {textures.map((texture, idx) => (
          <mesh key={texture.uuid} position={[0, 0, 9999]}>
            <planeGeometry args={[sizes[0], sizes[1]]} />
            <shaderMaterial
              vertexShader={vertex}
              fragmentShader={fragment}
              uniforms={initUniforms(texture)}
              transparent
              depthWrite={false}
            />
          </mesh>
        ))}
      </>
    );
  },
  () => true
);

export default CanvasImageSlider;
