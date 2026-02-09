#!/bin/bash
# Compress GLB (geometry only, no textures): prune, dedup, weld, reorder, draco
# Usage: ./scripts/compress-glb.sh -n modelname [-d mobile]
# Requires: npm install -g @gltf-transform/cli

set -e

device=default

while getopts n:d: flag; do
  case "${flag}" in
    n) name=${OPTARG};;
    d) device=${OPTARG};;
  esac
done

if [ -z "$name" ]; then
  echo "Usage: $0 -n <modelname> [-d mobile]"
  echo "  -n  model name without extension (e.g. scene)"
  echo "  -d  mobile — lower draco quantize for smaller file"
  exit 1
fi

INPUT_NAME=$name.glb
OUTPUT_NAME=$name-opt.glb

if ! test -f "$INPUT_NAME"; then
  echo "File '${INPUT_NAME}' not found."
  exit 1
fi

if [ "$device" == "mobile" ]; then
  QUANTIZE_POS=14
  QUANTIZE_NORM=10
else
  QUANTIZE_POS=20
  QUANTIZE_NORM=12
fi

echo "Compressing: $INPUT_NAME -> $OUTPUT_NAME (device=$device)"

gltf-transform prune "$INPUT_NAME" "$OUTPUT_NAME"
gltf-transform dedup "$OUTPUT_NAME" "$OUTPUT_NAME"
gltf-transform weld "$OUTPUT_NAME" "$OUTPUT_NAME"
gltf-transform reorder "$OUTPUT_NAME" "$OUTPUT_NAME"
gltf-transform draco "$OUTPUT_NAME" "$OUTPUT_NAME \
  --method edgebreaker \
  --quantize-position $QUANTIZE_POS \
  --quantize-normal $QUANTIZE_NORM"

echo "Done: $OUTPUT_NAME"
