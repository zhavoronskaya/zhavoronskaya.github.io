#!/usr/bin/env bash
# Extract first frame from client grid videos and save as WebP. Usage: ./scripts/generate-video-posters.sh

set -e
VIDEO_DIR="public/video"
cd "$(dirname "$0")/.."

SLUGS="visa promeat chipsa chillbase mono vki vileda"

for slug in $SLUGS; do
  # Prefer 720p, then 1080p, then 1440
  src=""
  for res in 720 1080 1440; do
    if [ -f "$VIDEO_DIR/${slug}-compressed-${res}.mp4" ]; then
      src="$VIDEO_DIR/${slug}-compressed-${res}.mp4"
      break
    fi
  done
  if [ -z "$src" ]; then
    echo "Skip: no video for $slug"
    continue
  fi
  echo "Poster: $slug <- $src"
  ffmpeg -y -i "$src" -vframes 1 -c:v libwebp -quality 85 -lossless 0 \
    "$VIDEO_DIR/${slug}-poster.webp" 2>/dev/null
done

echo "Done. Posters: $VIDEO_DIR/*-poster.webp"
