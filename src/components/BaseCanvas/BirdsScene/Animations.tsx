import { useFrame, useThree } from "@react-three/fiber";
import { damp } from "maath/easing";
import * as THREE from "three";
import { useRef } from "react";
import isMobile from "@/helpers/DeviceDefenition";
import {
  CAMERA_POSITIONINGS_MAP,
  CAMERA_POSITIONINGS_MAP_TOUCH_SCREEN,
} from "./CameraSettings";
import { scrollStore } from "@/store/scrollStore";

const GALLERY_IMAGES_COUNT = 11;
const GALLERY_DESKTOP = { xW: 5.5, gap: 0.2 };
const GALLERY_MOBILE = { xW: 4, gap: 0.1 };

const getGalleryParams = (mobile: boolean) => {
  const { xW, gap } = mobile ? GALLERY_MOBILE : GALLERY_DESKTOP;
  const totalWidth = GALLERY_IMAGES_COUNT * (xW + gap) - gap;
  const firstImageCenter = -totalWidth / 2 + xW / 2;
  const secondImageCenter = firstImageCenter + (xW + gap);
  const lastImageCenter =
    firstImageCenter + (GALLERY_IMAGES_COUNT - 1) * (xW + gap);
  return { totalWidth, firstImageCenter, secondImageCenter, lastImageCenter };
};

const GALLERY_DAMP_START = 0.2;
const COLLABORATE_DAMP_START = 0.2;

const cameraTarget = new THREE.Vector3(0, 10, 0);

const SMOOTH_TIME = 0.1;
const COLLABORATE_SMOOTH_TIME = 0.22;

function lerpSection(
  out: THREE.Vector3,
  a: THREE.Vector3,
  b: THREE.Vector3,
  t: number
) {
  out.x = a.x + (b.x - a.x) * t;
  out.y = a.y + (b.y - a.y) * t;
  out.z = a.z + (b.z - a.z) * t;
  return out;
}

export default function Animations() {
  const { size, camera } = useThree();
  const touchScreen =
    isMobile().phone || (isMobile().tablet && size.width <= 1024);

  const cameraData = touchScreen
    ? CAMERA_POSITIONINGS_MAP_TOUCH_SCREEN
    : CAMERA_POSITIONINGS_MAP;

  const targetPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  const galleryPosScratch = useRef(new THREE.Vector3());
  const galleryTargetScratch = useRef(new THREE.Vector3());
  const galleryTargetPosScratch = useRef(new THREE.Vector3());
  const galleryTargetLookAtScratch = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const { section1, section2, section3, section4, galleryOffset } =
      scrollStore.get();

    const targetPosCur = targetPos.current;
    const targetLookAtCur = targetLookAt.current;

    if (section4 >= COLLABORATE_DAMP_START) {
      targetPosCur.copy(cameraData.collaborate.position);
      targetLookAtCur.copy(cameraData.collaborate.target);
    } else if (section4 > 0 && section4 < COLLABORATE_DAMP_START) {
      const dampT = section4 / COLLABORATE_DAMP_START;
      const gallery = getGalleryParams(touchScreen);
      const {
        firstImageCenter,
        secondImageCenter,
        lastImageCenter,
        totalWidth,
      } = gallery;
      const lookAtIndex = touchScreen ? 0 : 1;
      const baseOffset =
        lookAtIndex === 0 ? firstImageCenter : secondImageCenter;
      const lastImageWorldX = -totalWidth + lastImageCenter;
      const scrollRange = lastImageWorldX - baseOffset;
      const offset = baseOffset + (galleryOffset ?? 0) * scrollRange;
      const galleryPos = galleryPosScratch.current.copy(
        cameraData.gallery.position
      );
      galleryPos.x += offset;
      const galleryTarget = galleryTargetScratch.current.copy(
        cameraData.gallery.target
      );
      galleryTarget.x += offset;
      lerpSection(
        targetPosCur,
        galleryPos,
        cameraData.collaborate.position,
        dampT
      );
      lerpSection(
        targetLookAtCur,
        galleryTarget,
        cameraData.collaborate.target,
        dampT
      );
    } else if (section3 >= GALLERY_DAMP_START) {
      targetPosCur.copy(cameraData.gallery.position);
      targetLookAtCur.copy(cameraData.gallery.target);
      const gallery = getGalleryParams(touchScreen);
      const {
        firstImageCenter,
        secondImageCenter,
        lastImageCenter,
        totalWidth,
      } = gallery;
      const lookAtIndex = touchScreen ? 0 : 1;
      const baseOffset =
        lookAtIndex === 0 ? firstImageCenter : secondImageCenter;
      const lastImageWorldX = -totalWidth + lastImageCenter;
      const scrollRange = lastImageWorldX - baseOffset;
      const offset = baseOffset + (galleryOffset ?? 0) * scrollRange;
      targetPosCur.x += offset;
      targetLookAtCur.x += offset;
    } else if (section3 > 0) {
      const dampT = section3 / GALLERY_DAMP_START;
      const gallery = getGalleryParams(touchScreen);
      const lookAtIndex = touchScreen ? 0 : 1;
      const baseOffset =
        lookAtIndex === 0
          ? gallery.firstImageCenter
          : gallery.secondImageCenter;
      const galleryTargetPos = galleryTargetPosScratch.current.copy(
        cameraData.gallery.position
      );
      galleryTargetPos.x += baseOffset;
      const galleryTargetLookAt = galleryTargetLookAtScratch.current.copy(
        cameraData.gallery.target
      );
      galleryTargetLookAt.x += baseOffset;
      lerpSection(
        targetPosCur,
        cameraData.secondTurn.position,
        galleryTargetPos,
        dampT
      );
      lerpSection(
        targetLookAtCur,
        cameraData.secondTurn.target,
        galleryTargetLookAt,
        dampT
      );
    } else if (section2 > 0) {
      lerpSection(
        targetPosCur,
        cameraData.firsTurn.position,
        cameraData.secondTurn.position,
        section2
      );
      lerpSection(
        targetLookAtCur,
        cameraData.firsTurn.target,
        cameraData.secondTurn.target,
        section2
      );
    } else if (section1 > 0) {
      lerpSection(
        targetPosCur,
        cameraData.default.position,
        cameraData.firsTurn.position,
        section1
      );
      lerpSection(
        targetLookAtCur,
        cameraData.default.target,
        cameraData.firsTurn.target,
        section1
      );
    } else {
      targetPosCur.copy(cameraData.default.position);
      targetLookAtCur.copy(cameraData.default.target);
    }

    const smoothTime = section3 > 0 ? COLLABORATE_SMOOTH_TIME : SMOOTH_TIME;
    damp(camera.position, "x", targetPosCur.x, smoothTime, delta);
    damp(camera.position, "y", targetPosCur.y, smoothTime, delta);
    damp(camera.position, "z", targetPosCur.z, smoothTime, delta);
    damp(cameraTarget, "x", targetLookAtCur.x, smoothTime, delta);
    damp(cameraTarget, "y", targetLookAtCur.y, smoothTime, delta);
    damp(cameraTarget, "z", targetLookAtCur.z, smoothTime, delta);

    camera.lookAt(cameraTarget);
  });

  return null;
}
