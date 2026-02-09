import { useFrame, useThree } from "@react-three/fiber";
import { damp } from "maath/easing";
import * as THREE from "three";
import isMobile from "@/helpers/DeviceDefenition";
import {
  CAMERA_POSITIONINGS_MAP,
  CAMERA_POSITIONINGS_MAP_TOUCH_SCREEN,
} from "./CameraSettings";

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
import { scrollStore } from "@/store/scrollStore";

const cameraTarget = new THREE.Vector3(0, 10, 0);

const SMOOTH_TIME = 0.15;
const COLLABORATE_SMOOTH_TIME = 0.35;

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

  useFrame((_, delta) => {
    const { section1, section2, section3, section4, galleryOffset } =
      scrollStore.get();

    const targetPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3();

    if (section4 >= COLLABORATE_DAMP_START) {
      targetPos.copy(cameraData.collaborate.position);
      targetLookAt.copy(cameraData.collaborate.target);
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
      const galleryPos = cameraData.gallery.position.clone();
      galleryPos.x += offset;
      const galleryTarget = cameraData.gallery.target.clone();
      galleryTarget.x += offset;
      lerpSection(
        targetPos,
        galleryPos,
        cameraData.collaborate.position,
        dampT
      );
      lerpSection(
        targetLookAt,
        galleryTarget,
        cameraData.collaborate.target,
        dampT
      );
    } else if (section3 >= GALLERY_DAMP_START) {
      targetPos.copy(cameraData.gallery.position);
      targetLookAt.copy(cameraData.gallery.target);
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
      targetPos.x += offset;
      targetLookAt.x += offset;
    } else if (section3 > 0) {
      const dampT = section3 / GALLERY_DAMP_START;
      const gallery = getGalleryParams(touchScreen);
      const lookAtIndex = touchScreen ? 0 : 1;
      const baseOffset =
        lookAtIndex === 0
          ? gallery.firstImageCenter
          : gallery.secondImageCenter;
      const galleryTargetPos = cameraData.gallery.position.clone();
      galleryTargetPos.x += baseOffset;
      const galleryTargetLookAt = cameraData.gallery.target.clone();
      galleryTargetLookAt.x += baseOffset;
      lerpSection(
        targetPos,
        cameraData.secondTurn.position,
        galleryTargetPos,
        dampT
      );
      lerpSection(
        targetLookAt,
        cameraData.secondTurn.target,
        galleryTargetLookAt,
        dampT
      );
    } else if (section2 > 0) {
      lerpSection(
        targetPos,
        cameraData.firsTurn.position,
        cameraData.secondTurn.position,
        section2
      );
      lerpSection(
        targetLookAt,
        cameraData.firsTurn.target,
        cameraData.secondTurn.target,
        section2
      );
    } else if (section1 > 0) {
      lerpSection(
        targetPos,
        cameraData.default.position,
        cameraData.firsTurn.position,
        section1
      );
      lerpSection(
        targetLookAt,
        cameraData.default.target,
        cameraData.firsTurn.target,
        section1
      );
    } else {
      targetPos.copy(cameraData.default.position);
      targetLookAt.copy(cameraData.default.target);
    }

    const smoothTime = section3 > 0 ? COLLABORATE_SMOOTH_TIME : SMOOTH_TIME;
    damp(camera.position, "x", targetPos.x, smoothTime, delta);
    damp(camera.position, "y", targetPos.y, smoothTime, delta);
    damp(camera.position, "z", targetPos.z, smoothTime, delta);
    damp(cameraTarget, "x", targetLookAt.x, smoothTime, delta);
    damp(cameraTarget, "y", targetLookAt.y, smoothTime, delta);
    damp(cameraTarget, "z", targetLookAt.z, smoothTime, delta);

    camera.lookAt(cameraTarget);
  });

  return null;
}
