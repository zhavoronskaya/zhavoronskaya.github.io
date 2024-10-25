"use client";

import { useState } from "react";
import { SoundOffIcon, SoundOnIcon } from "../UI/icons";
import useAudio from "@/hooks/useAudio";

export default function SoundToggle({ sound }: { sound: boolean }) {
  const [isActive, setIsActive] = useState(true);
  const { toggle } = useAudio("/sound/sound.mp3", {
    startTime: 0,
    autoplay: false,
    canPlay: sound,
  });
  const handleSoundClick = () => {
    setIsActive((v) => !v);
    toggle();
  };

  if (!sound) return null;

  return (
    <div
      className="cursor-pointer opacity-75 hover:opacity-100 "
      onClick={handleSoundClick}
    >
      {isActive ? <SoundOnIcon /> : <SoundOffIcon />}
    </div>
  );
}
