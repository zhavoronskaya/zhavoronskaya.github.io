#!/usr/bin/env bash
# FFmpeg recompression: CRF 22 (good quality, smaller files), 2 resolutions (720p, 1080p)
# Usage: ./scripts/recompress-videos.sh

set -e
VIDEO_DIR="public/video"
OUT_DIR="public/video"
PRESET="slow"

# base:source (use highest res for rose/virtudes)
SOURCES="abstr1:abstr1-compressed-720.mp4 abstr3:abstr3-compressed-720.mp4 fbo1:fbo1-compressed-720.mp4 fbo2:fbo2-compressed-720.mp4 fbo3:fbo3-compressed-720.mp4 fbo4:fbo4-compressed-720.mp4 fbo5:fbo5-compressed-720.mp4 fbo6:fbo6-compressed-720.mp4 fbo7:fbo7-compressed-720.mp4 forever:forever-compressed-720.mp4 grid:grid-compressed-720.mp4 liza:liza.mov mono1:mono1-compressed-720.mp4 object1:object1-compressed-720.mp4 object2:object2-compressed-720.mp4 object3:object3-compressed-720.mp4 object4:object4-compressed-720.mp4 object5:object5-compressed-720.mp4 particles1:particles1-compressed-720.mp4 particles2:particles2-compressed-720.mp4 particles3:particles3-compressed-720.mp4 ray1:ray1-compressed-720.mp4 ray2:ray2-compressed-720.mp4 ray3:ray3-compressed-720.mp4 rose:rose-compressed-1024.mp4 shell:shell-compressed-720.mp4 so:so-cropped.mov space:space-compressed-720.mp4 tr1:tr1-compressed-720.mp4 tr2:tr2-compressed-720.mp4 tr3:tr3-compressed-720.mp4 tr4:tr4-compressed-720.mp4 virtudes:virtudes.mp4"

cd "$(dirname "$0")/.."
mkdir -p "$OUT_DIR/tmp"

for pair in $SOURCES; do
  base="${pair%%:*}"
  src="${pair#*:}"
  [ -f "$VIDEO_DIR/$src" ] || { echo "Skip: $src not found"; continue; }
  
  echo "Processing: $base"
  
  # 720p - standard / mobile
  ffmpeg -y -i "$VIDEO_DIR/$src" \
    -c:v libx264 -preset $PRESET -crf 22 -pix_fmt yuv420p \
    -vf "scale=720:-2:flags=lanczos,setsar=1:1" \
    -movflags +faststart \
    -an \
    "$OUT_DIR/tmp/${base}-compressed-720.mp4" 2>/dev/null
  
  # 1080p - high quality / desktop
  ffmpeg -y -i "$VIDEO_DIR/$src" \
    -c:v libx264 -preset $PRESET -crf 22 -pix_fmt yuv420p \
    -vf "scale=1080:-2:flags=lanczos,setsar=1:1" \
    -movflags +faststart \
    -an \
    "$OUT_DIR/tmp/${base}-compressed-1080.mp4" 2>/dev/null
done

echo "Replacing files..."
for f in "$OUT_DIR/tmp"/*.mp4; do
  [ -f "$f" ] && mv "$f" "$OUT_DIR/"
done
rmdir "$OUT_DIR/tmp" 2>/dev/null || true

echo "Done. New files: *-compressed-720.mp4, *-compressed-1080.mp4"
