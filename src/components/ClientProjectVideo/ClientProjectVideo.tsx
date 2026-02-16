"use client";

type Props = {
  slug: string;
  alt: string;
  className?: string;
};

export const getClientVideoSources = (slug: string) => {
  const is1440 = slug === "chipsa" || slug === "visa";
  const is1080Default = slug === "mono";
  return {
    high: `/video/${slug}-compressed-${is1440 ? "1440" : "1080"}.mp4`,
    default: `/video/${slug}-compressed-${is1080Default ? "1080" : "720"}.mp4`,
  };
};

export default function ClientProjectVideo({ slug, alt, className }: Props) {
  const { high, default: defaultSrc } = getClientVideoSources(slug);
  return (
    <video
      muted
      playsInline
      loop
      autoPlay
      preload="metadata"
      poster={`/video/${slug}-poster.webp`}
      className={className}
    >
      <source src={high} type="video/mp4" media="(min-width: 1280px)" />
      <source src={defaultSrc} type="video/mp4" />
    </video>
  );
}
