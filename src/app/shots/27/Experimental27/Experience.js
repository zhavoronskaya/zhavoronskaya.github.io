import {
  shaderMaterial,
  OrbitControls,
  useFBO,
  useGLTF,
} from "@react-three/drei";

import { extend, useFrame, useThree, createPortal } from "@react-three/fiber";
import { Suspense, useRef, useEffect } from "react";
import * as THREE from "three";
import React from "react";
import pointsVertexShader from "./shaders/vertex.js";
import pointsFragmentShader from "./shaders/fragment.js";
import {
  DepthOfField,
  EffectComposer,
  Vignette,
  Bloom,
} from "@react-three/postprocessing";
import simulationVertexShader from "./shaders/simulationVertex.js";
import simulationFragmentShader from "./shaders/simulationFragment.js";

function makeTexture(g) {
  console.log("g", g);
  let vertAmount = g.attributes.position.count;
  let texWidth = Math.ceil(Math.sqrt(vertAmount));
  let texHeight = Math.ceil(vertAmount / texWidth);

  let data = new Float32Array(texWidth * texHeight * 4);

  // function shuffleArrayByThree(array) {
  //   const groupLength = 3;

  //   let numGroups = Math.floor(array.length / groupLength);

  //   for (let i = numGroups - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));

  //     for (let k = 0; k < groupLength; k++) {
  //       let temp = array[i * groupLength + k];
  //       array[i * groupLength + k] = array[j * groupLength + k];
  //       array[j * groupLength + k] = temp;
  //     }
  //   }

  //   return array;
  // }

  // shuffleArrayByThree(g.attributes.position.array);

  for (let i = 0; i < vertAmount; i++) {
    const x = g.attributes.position.array[i * 3 + 0];
    const y = g.attributes.position.array[i * 3 + 1];
    const z = g.attributes.position.array[i * 3 + 2];
    const w = 0;

    data[i * 4 + 0] = x;
    data[i * 4 + 1] = y;
    data[i * 4 + 2] = z;
    data[i * 4 + 3] = w;
  }

  let dataTexture = new THREE.DataTexture(
    data,
    texWidth,
    texHeight,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  dataTexture.needsUpdate = true;

  return dataTexture;
}
const radiusVariance = () => Math.random();
const getRandomData = (width, height) => {
  var len = width * height * 4;
  var data = new Float32Array(len);
  const radius = 4.5;

  for (let i = 0; i < data.length; i++) {
    const i1 = i * 4;
    const angle = i * 0.1 * Math.PI * 2;
    data[i1] = Math.sin(angle) * radius * radiusVariance();
    data[i1 + 1] = Math.cos(angle) * radius * radiusVariance();
    data[i1 + 2] =
      Math.sin(angle) * Math.cos(angle) * radius * radiusVariance();
    data[i1 + 3] = 1.0;
  }
  let dataTexture = new THREE.DataTexture(
    data,
    width,
    height,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  dataTexture.needsUpdate = true;

  return dataTexture;
};

const getData = (width, height) => {
  var len = width * height * 4;
  var data = new Float32Array(len);

  for (let i = 0; i < data.length; i++) {
    const i1 = i * 4;

    // const beta = 8 / 3;
    // const rho = 28;
    // const sigma = 10;

    // const dt = 0.005;

    // let x = 15 * Math.random();
    // let y = 15 * Math.random();
    // let z = 15 * Math.random();
    // const dx = sigma * (y - x);
    // const dy = x * (rho - z) - y;
    // const dz = x * y - beta * z;
    // const beta = 8 / 3;
    // const rho = 28;
    // const sigma = 10;

    // const dt = 0.0168;

    // let x = 3 * Math.random();
    // let y = 3 * Math.random();
    // let z = 3 * Math.random();
    // const dx = sigma * (y - x);
    // const dy = x * (rho - z) - y;
    // const dz = x * y - beta * z;

    // x += dx * dt;
    // y += dy * dt;
    // // z += dz * dt;
    // const x = 0;
    // const y = 0;
    // const z = 0;

    // data[i1] = x;
    // data[i1 + 1] = y;
    // data[i1 + 2] = z;
    // data[i1 + 3] = 1.0;

    const distance = Math.sqrt(Math.random()) * 2.0;
    const theta = THREE.MathUtils.randFloatSpread(360);
    const phi = THREE.MathUtils.randFloatSpread(360);

    data[i1] = distance * Math.sin(theta) * Math.cos(phi);
    data[i1 + 1] = distance * Math.sin(theta) * Math.sin(phi);
    data[i1 + 2] = distance * Math.cos(theta);
    data[i1 + 3] = 1.0; // this value will not have any impact
  }
  let dataTexture = new THREE.DataTexture(
    data,
    width,
    height,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  dataTexture.needsUpdate = true;

  return dataTexture;
};

const getRandomDataSphere = (width, height) => {
  const length = width * height * 4;
  const data = new Float32Array(length);

  for (let i = 0; i < length; i++) {
    const i1 = i * 4;

    const distance = Math.sqrt(Math.random()) * 2.0;
    const theta = THREE.MathUtils.randFloatSpread(360);
    const phi = THREE.MathUtils.randFloatSpread(360);

    data[i1] = distance * Math.sin(theta) * Math.cos(phi);
    data[i1 + 1] = distance * Math.sin(theta) * Math.sin(phi);
    data[i1 + 2] = distance * Math.cos(theta);
    data[i1 + 3] = 1.0;
  }

  let dataTexture = new THREE.DataTexture(
    data,
    width,
    height,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  dataTexture.needsUpdate = true;

  return dataTexture;
};

const SIZE = 512;
const positionsTexture = getRandomData(SIZE, SIZE);
const positionTex = getRandomDataSphere(SIZE, SIZE);

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
  -1,
  1,
  1,
  -1,
  1 / Math.pow(2, 53),
  1
);
const positions = new Float32Array([
  -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0,
]);
const uvs = new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0]);

const FBOParticles = () => {
  const points = useRef();
  const simulationMaterialRef = useRef();

  // console.log(positionsTexture);

  const renderTarget = useFBO(SIZE, SIZE, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    type: THREE.FloatType,
  });

  const particlesPosition = React.useMemo(() => {
    const length = SIZE * SIZE;
    const particles = new Float32Array(length * 3);
    for (let i = 0; i < length; i++) {
      let i3 = i * 3;
      particles[i3 + 0] = (i % SIZE) / SIZE;
      particles[i3 + 1] = i / SIZE / SIZE;
    }
    return particles;
  }, []);

  const uniforms = React.useRef({
    uPositions: { value: null },
    uTime: { value: 0 },
  });

  const simUniforms = React.useRef({
    positions: { value: positionTex },
    positionsA: { value: positionsTexture },
    positionsB: { value: positionTex },
    uFrequency: { value: 0.9 },
    uTime: { value: 0 },
  });

  useFrame((state, delta) => {
    const { gl, clock } = state;

    gl.setRenderTarget(renderTarget);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);

    points.current.material.uniforms.uPositions.value = renderTarget.texture;
    // points.current.material.uniforms.uTime.value += delta * 0.5;
    simulationMaterialRef.current.uniforms.uTime.value =
      clock.elapsedTime * 0.7;
    // simulationMaterialRef.current.uniforms.uTime.value = delta;
    // console.log("TTT", simulationMaterialRef.current.uniforms.uTime.value);
    // simulationMaterialRef.current.uniforms.positions = positionsTextureA;
    // simulationMaterialRef.current.uniforms.positionsA = positionsTexture;
  });

  return (
    <>
      {createPortal(
        <mesh>
          <shaderMaterial
            ref={simulationMaterialRef}
            fragmentShader={simulationFragmentShader}
            vertexShader={simulationVertexShader}
            uniforms={simUniforms.current}
          />
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={positions.length / 3}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-uv"
              count={uvs.length / 2}
              array={uvs}
              itemSize={2}
            />
          </bufferGeometry>
        </mesh>,
        scene
      )}

      <points ref={points} transparent={true}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlesPosition.length / 3}
            array={particlesPosition}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          blending={THREE.AdditiveBlending}
          transparent={true}
          vertexColors
          depthWrite={false}
          fragmentShader={pointsFragmentShader}
          vertexShader={pointsVertexShader}
          uniforms={uniforms.current}
        />
      </points>
    </>
  );
};

export default function Experience() {
  return (
    <>
      <OrbitControls />
      {/* <EffectComposer multisampling={2}>
        <DepthOfField
          focusDistance={0.8}
          focalLength={0.08}
          bokehScale={0}
          height={480}
        />

        <Vignette eskil={false} offset={0.0} darkness={1.0} />
      </EffectComposer> */}

      {/* <color args={["#02241a"]} attach="background" /> */}
      <ambientLight intensity={1.0} color={"#14010f"} />
      {/* <color args={["#371f40"]} attach="background" /> */}
      {/* <color args={["#0d0109"]} attach="background" /> */}

      {/* <color args={["#070c1c"]} attach="background" /> */}
      <color args={["#0c0f17"]} attach="background" />
      <Suspense fallback={null}>
        <FBOParticles />
      </Suspense>
    </>
  );
}
