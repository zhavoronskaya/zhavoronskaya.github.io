"use client";

import * as THREE from "three";
import { Tween, Group, Easing } from "@tweenjs/tween.js";
import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useFrame, useThree } from "@react-three/fiber";
import { useVideoTexture } from "@react-three/drei";

import vertex from "./shaders/vertex";
import fragment from "./shaders/fragment";
import isMobile from "@/helpers/DeviceDefenition";
import useWindowPointerFromCenter from "@/hooks/usePointerMove";
import { scrollStore } from "@/store/scrollStore";

const GALLERY_IMAGES = [
  {
    link: "2",
    href: "/gallery/1.webp",
    video: "/video/ray2-compressed-720.mp4",
  },
  {
    link: "18",
    href: "/gallery/3.webp",
    video: "/video/tr1-compressed-720.mp4",
  },
  {
    link: "4",
    href: "/gallery/2.webp",
    video: "/video/object2-compressed-720.mp4",
  },
  {
    link: "1",
    href: "/gallery/4.webp",
    video: "/video/ray1-compressed-720.mp4",
  },
  {
    link: "12",
    href: "/gallery/5.webp",
    video: "/video/fbo1-compressed-720.mp4",
  },
  {
    link: "11",
    href: "/gallery/6.webp",
    video: "/video/fbo2-compressed-720.mp4",
  },
  {
    link: "15",
    href: "/gallery/7.webp",
    video: "/video/fbo3-compressed-720.mp4",
  },
  {
    link: "8",
    href: "/gallery/8.webp",
    video: "/video/particles2-compressed-720.mp4",
  },
  {
    link: "21",
    href: "/gallery/9.webp",
    video: "/video/grid-compressed-720.mp4",
  },
  {
    link: "3",
    href: "/gallery/11.webp",
    video: "/video/object1-compressed-720.mp4",
  },
  {
    link: "19",
    href: "/gallery/10.webp",
    video: "/video/rose-compressed-720.mp4",
  },
];

const tweenGroup = new Group();
const getGalleryLayout = (touchScreen: boolean) => {
  const xW = touchScreen ? 4 : 5.5;
  const gap = touchScreen ? 0.1 : 0.2;
  const totalWidth = GALLERY_IMAGES.length * (xW + gap) - gap;
  return { xW, gap, totalWidth };
};

const GALLERY_POSITION = new THREE.Vector3(0, -15, 6);
const GALLERY_DAMP_START = 0.2;

// Active index: 0 at start, then 1, 2, ... in order based on scroll
const getActiveIndex = (galleryOffset: number) => {
  const count = GALLERY_IMAGES.length;
  return Math.min(count - 1, Math.floor(galleryOffset * count));
};

type GalleryState = { hovered: number | null };
type SetStateFn = (fn: (s: GalleryState) => GalleryState) => void;

function GalleryItem({
  index,
  xOffset,
  xW,
  hovered,
  setState,
}: {
  index: number;
  xOffset: number;
  xW: number;
  hovered: boolean;
  setState: SetStateFn;
}) {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<THREE.Mesh | null>(null);
  const group = useRef<THREE.Group | null>(null);

  const { video } = GALLERY_IMAGES[index];
  const texture = useVideoTexture(video, {
    start: false,
    playsInline: true,
    autoplay: true,
    loop: true,
  });
  const imgRatio = texture.image.videoWidth / texture.image.videoHeight;
  const height = 1.6;
  const planeRatio = 1 / height;
  const ratio = planeRatio / imgRatio;
  const uniforms = useRef({
    uImage: new THREE.Uniform(texture),
    uRatio: new THREE.Uniform(ratio),
    uResolution: new THREE.Uniform(new THREE.Vector2(xW, xW * height)),
    uTime: new THREE.Uniform(0),
    uActive: new THREE.Uniform(0),
    uOpacity: new THREE.Uniform(0),
  });
  const tweenRef = useRef<Tween<{ progress: number }> | null>(null);

  useEffect(() => {
    if (isActive || hovered) texture.image.play();
    else texture.image.pause();
  }, [isActive, hovered, texture]);

  useEffect(() => {
    if (!group.current || !ref.current) return;
    group.current.position.z = index % 2 === 0 ? 0 : -1;
  }, [index]);

  const animateActiveUniform = () => {
    if (!ref.current) return;
    const material = ref.current.material as THREE.ShaderMaterial;
    tweenRef.current?.stop();
    const data = { progress: hovered ? 0 : 1 };
    const to = { progress: hovered ? 1 : 0 };
    const tween = new Tween(data, tweenGroup)
      .to(to, 400)
      .easing(Easing.Cubic.InOut)
      .onUpdate(() => {
        material.uniforms.uActive.value = data.progress;
      })
      .start();
    tweenRef.current = tween;
  };

  useEffect(() => {
    animateActiveUniform();
  }, [hovered]);

  useFrame((_, delta) => {
    if (index === 0) tweenGroup.update();
    if (!group.current || !ref.current) return;
    if (!(ref.current.material instanceof THREE.ShaderMaterial)) return;
    const { section3, galleryOffset } = scrollStore.get();
    ref.current.material.uniforms.uTime.value += delta;
    ref.current.material.uniforms.uOpacity.value =
      section3 < GALLERY_DAMP_START ? section3 / GALLERY_DAMP_START : 1;
    const activeIndex = getActiveIndex(galleryOffset ?? 0);
    setIsActive(index === activeIndex);
  });

  return (
    <group ref={group} position={[xOffset, 0, 0]}>
      <mesh ref={ref} userData={{ index }}>
        <planeGeometry args={[xW, xW * height]} />
        <shaderMaterial
          uniforms={uniforms.current}
          vertexShader={vertex}
          fragmentShader={fragment}
          transparent
        />
      </mesh>
    </group>
  );
}

export default function ShotsGalleryContent() {
  const router = useRouter();
  const { camera, raycaster, size } = useThree();
  const touchScreen =
    isMobile().phone || (isMobile().tablet && size.width <= 1024);
  const { xW, gap, totalWidth } = getGalleryLayout(touchScreen);
  const pointer = useWindowPointerFromCenter();
  const [state, setState] = useState<GalleryState>({ hovered: null });
  const groupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      const { section3 } = scrollStore.get();
      if (section3 < GALLERY_DAMP_START) return;
      if (!groupRef.current) return;
      const section5 = document.querySelector(".section-5");
      if (
        !section5 ||
        !(e.target instanceof Node) ||
        !section5.contains(e.target)
      )
        return;
      const vec = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
      raycaster.setFromCamera(vec, camera);
      const hits = raycaster.intersectObject(groupRef.current, true);
      const mesh = hits.find((h) => h.object.userData?.index != null)?.object;
      if (mesh && typeof mesh.userData.index === "number") {
        router.push(`/shots/${GALLERY_IMAGES[mesh.userData.index].link}/view`);
      }
    };
    window.addEventListener("click", listener, true);
    return () => window.removeEventListener("click", listener, true);
  }, [camera, raycaster, router]);

  useFrame(() => {
    if (!groupRef.current) return;
    const galleryOffset = scrollStore.get().galleryOffset ?? 0;
    const offset = galleryOffset * totalWidth;
    groupRef.current.position.x = GALLERY_POSITION.x - offset;
    groupRef.current.position.y = GALLERY_POSITION.y;
    groupRef.current.position.z = GALLERY_POSITION.z;

    const { section3 } = scrollStore.get();
    if (section3 >= GALLERY_DAMP_START) {
      raycaster.setFromCamera(
        new THREE.Vector2(pointer.current.x, pointer.current.y),
        camera
      );
      const hits = raycaster.intersectObject(groupRef.current, true);
      const mesh = hits.find((h) => h.object.userData?.index != null)?.object;
      const hoveredIndex =
        mesh && typeof mesh.userData.index === "number"
          ? mesh.userData.index
          : null;
      setState((v) =>
        v.hovered === hoveredIndex ? v : { ...v, hovered: hoveredIndex }
      );
    } else {
      setState((v) => (v.hovered === null ? v : { ...v, hovered: null }));
    }
  });

  return (
    <group ref={groupRef} position={[0, -15, 4]}>
      <Suspense fallback={null}>
        {GALLERY_IMAGES.map((img, i) => {
          const xOffset = -totalWidth / 2 + xW / 2 + i * (xW + gap);
          return (
            <GalleryItem
              key={img.href}
              index={i}
              xOffset={xOffset}
              xW={xW}
              hovered={i === state.hovered}
              setState={setState}
            />
          );
        })}
      </Suspense>
    </group>
  );
}
