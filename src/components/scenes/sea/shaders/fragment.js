export default /*glsl */ `

#define PI 3.1415926535897932384626433832795
uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;
varying float vDisplacement;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vColor;



vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec3 P){
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}

float fbm(vec3 p, int octaves, float persistence, float lacunarity) {
  float amplitude = 1.0;
  float frequency = 1.0;
  float total = 0.0;
  float normalization = 0.0;

  for (int i = 0; i < octaves; ++i) {
    float noiseValue = cnoise(p * frequency);
    total += noiseValue * amplitude;
    normalization += amplitude;
    amplitude *= persistence;
    frequency *= lacunarity;
  }

  total /= normalization;
  total = smoothstep(-1.0, 1.0, total);

  return total;
}

float inverseLerp(float v, float minValue, float maxValue) {
  return (v - minValue) / (maxValue - minValue);
}

float remap(float v, float inMin, float inMax, float outMin, float outMax) {
  float t = inverseLerp(v, inMin, inMax);
  return mix(outMin, outMax, t);
}


vec3 hash( vec3 p ) 
{
	p = vec3( dot(p,vec3(127.1,311.7, 74.7)),
            dot(p,vec3(269.5,183.3,246.1)),
            dot(p,vec3(113.5,271.9,124.6)));

	return -1.0 + 2.0*fract(sin(p)*43758.5453123);
}






vec3 CreateSand() {
  vec3 colour1 = vec3(0.86, 0.56, 0.63);
  vec3 colour2 = vec3(0.54, 0.35, 0.39);
  vec3 colour3 = vec3(0.31,0.24,0.25);
  return mix(mix(
      colour1, colour2, smoothstep(0.8, 1.0, vUv.y)), colour3, smoothstep(0.0, 1.0, vUv.y));
}



vec3 CreateGridSandGlare(
    vec2 pixelCoords, float glareRadius, float cellWidth,
    float seed, bool twinkle) {
  vec2 cellCoords = (fract(pixelCoords / cellWidth) - 0.5) * cellWidth;
  vec2 cellID = floor(pixelCoords / cellWidth) + seed / 100.0;
  vec3 cellHashValue = hash(vec3(cellID, 0.0));

  float glareBrightness = saturate(cellHashValue.z*0.5);
  vec2 glarePosition = vec2(0.0);
  glarePosition += cellHashValue.xy * (cellWidth * 0.5 - glareRadius * 4.0);
  float distToGlare = length(cellCoords - glarePosition);
  // float glow = smoothstep(starRadius + 1.0, starRadius, distToStar);
  float glow = exp(-2.0 * distToGlare / glareRadius);

  return vec3(glow * glareBrightness);
}

vec3 CreateSandGlare(vec2 pixelCoords) {
  vec3 glares = vec3(0.0);

  float size = 10.0;
  float cellWidth = 500.0;
  for (float i = 0.0; i <= 2.0; i++) {
    glares += CreateGridSandGlare(pixelCoords, size, cellWidth, i, true);
    size *= 0.5;
    cellWidth *= 0.35;
  }

  for (float i = 3.0; i < 5.0; i++) {
    glares += CreateGridSandGlare(pixelCoords, size, cellWidth, i, false);
    size *= 0.5;
    cellWidth *= 0.35;
  }

  return glares;
}





float domainWarpingFBM(vec3 coords) {
  vec3 offset = vec3(
    fbm(coords, 4, 0.5, 2.0),
    fbm(coords + vec3(43.235, 23.112, 0.0), 4, 0.5, 2.0), 0.0);
  float noiseSample = fbm(coords + offset, 1, 0.5, 2.0);

  vec3 offset2 = vec3(
    fbm(coords + 4.0 * offset + vec3(5.325, 1.421, 3.235), 4, 0.5, 2.0),
    fbm(coords + 4.0 * offset + vec3(4.32, 0.532, 6.324), 4, 0.5, 2.0), 0.0);
  noiseSample = fbm(coords + 4.0 * offset2, 1, 0.5, 2.0);

  return noiseSample;
}



vec3 DrawWaves(
    vec3 background, vec3 waveColour, vec2 pixelCoords, float depth) {
  float y = fbm(
    vec3(pixelCoords.x *0.004, 0.9, uTime*0.1), 3, 0.5, 2.0) * 300.0;




  // float noiseSample = domainWarpingFBM( vec3(depth + pixelCoords.y / (256.0), 2.432, uTime*0.1))*2.58;
  //   vec3 light = normalize(vec3(1.0));

  // waveColour = mix( vec3(0.858,0.96,0.93),waveColour,smoothstep(noiseSample,0.0,1.0));

  vec3 foamColour = vec3(0.99, 0.93, 0.97);
  // float foamFactor = smoothstep(0.0, 100.0, depth) * 0.5;

  // float heightFactor = smoothstep(-900.0, -320.00, pixelCoords.y);
  // heightFactor *= heightFactor;
  // foamFactor = mix(heightFactor, foamFactor, heightFactor);

  // waveColour = mix(foamColour, waveColour,heightFactor);
  float sdfWave = pixelCoords.y - y;
  waveColour = mix(foamColour, waveColour, smoothstep(0.9,0.0,(pixelCoords.y-y)*0.4));

  // sin(modelPosition.x * uBigWavesFrequency.x + uTime * uBigWavesSpeed)
  float wSmpl = domainWarpingFBM(vec3(pixelCoords*0.01,uTime*0.05))*1.2;
  waveColour = mix( vec3(0.98,0.94,0.95),waveColour, smoothstep(0.0,1.0,wSmpl));
 wSmpl = domainWarpingFBM(vec3(pixelCoords*0.05,uTime*0.05))*1.6;
  waveColour = mix( vec3(0.98,0.94,0.95),waveColour, smoothstep(0.0,1.0,wSmpl));

  float blur = 1.0 + smoothstep(50.0, 2000.0, depth) * 64.0 + smoothstep(50.0, -500.0, depth) * 64.0;
  vec3 colour = mix(
      waveColour,
      background,
      smoothstep(0.0, blur, sdfWave));

  return colour;
}

mat2 rotate2D(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c);
}



float sdEllipsoid( vec3 p, vec3 r )
{
  float k0 = length(p/r);
  float k1 = length(p/(r*r));
  return k0*(k0-1.0)/k1;
}


void main() {


  //Sand
  vec3 modelColour = vec3(0.0);
  modelColour += CreateSand();

  vec2 pixelCoords = vUv*uResolution ;
  modelColour += CreateSandGlare(pixelCoords*30.0);
  float noiseSample = domainWarpingFBM(vec3(pixelCoords*0.2,uTime*0.0))*1.8;
  modelColour = mix( vec3(0.31,0.24,0.25),modelColour, noiseSample);


  //Stone
//   vec3 stonePos = vec3(pixelCoords - vec2(1050.0,100.0), 0.0);
// float stone = sdEllipsoid(stonePos, vec3(0.50));
// modelColour += mix( modelColour, vec3(0.2), stone);

  //Waves
  vec2 timeOffset = vec2(0.0 * 50.0, remap(sin(uTime),-1.0,1.0, -0.5,0.0)*10.0);

  vec2  waveCoords = (pixelCoords - vec2(0.0, 0.9)) * 80.1+timeOffset;

  vec3 waveColour = vec3(0.024,0.19,0.27);
  waveCoords = rotate2D(PI * -0.2) * waveCoords;
  // waveColour = mix(vec3(0.97), waveColour, smoothstep(0.9,0.89,waveCoords.y*0.1));
  // float wSmpl = domainWarpingFBM(vec3(waveCoords*0.01,uTime*0.05))*0.8;
  // waveColour = mix( vec3(0.98,0.94,0.95),waveColour, smoothstep(0.0,1.0,wSmpl));
  modelColour = DrawWaves(modelColour, waveColour, waveCoords, 500.0);

   waveCoords = (pixelCoords - vec2(0.0, -0.2)) * 200.1+timeOffset;

// waveColour = vec3(0.024,0.19,0.27);
// waveCoords = rotate2D(PI * 0.05) * waveCoords;
// // waveColour = mix(vec3(0.97), waveColour, smoothstep(0.9,0.89,waveCoords.y*0.1));
//  wSmpl = domainWarpingFBM(vec3(waveCoords*0.01,uTime*0.1))*2.8;
// waveColour = mix( vec3(0.98,0.94,0.95),waveColour, smoothstep(0.0,1.0,wSmpl));
// modelColour = DrawWaves(modelColour, waveColour, waveCoords, 400.0);




  // waveCoords = (pixelCoords - vec2(0.0, -150.0)) * 0.35+timeOffset*0.8;
  // waveCoords = rotate2D(PI * -0.2) * waveCoords;
  // modelColour = DrawWaves(modelColour, waveColour, waveCoords, 800.0);
  // waveCoords = (pixelCoords - vec2(0.0, -100.0)) * 0.85+timeOffset*0.6;
  // waveCoords = rotate2D(PI * -0.2) * waveCoords;
  // modelColour = DrawWaves(modelColour, waveColour, waveCoords, 1200.0);







  vec3 lighting = vec3(0.0);

  vec3 normal = normalize(vNormal);

  vec3 viewDir = normalize(cameraPosition - vPosition);

  // Ambient
  vec3 ambient = vec3(1.0);

  // Hemi
  vec3 skyColour = vec3(0.0, 0.3, 0.76);
  vec3 groundColour = vec3(0.54, 0.33, 0.1);



  // Diffuse lighting
  vec3 lightDir = normalize(vec3(0.0, 1.0, 1.0));
  vec3 lightColour = vec3(1.0, 1.0, 0.98);
  float dp = max(0.0, dot(lightDir, normal));

  vec3 diffuse = dp * lightColour;
  vec3 specular = vec3(0.0);

  // Specular
  vec3 r = normalize(reflect(-lightDir, normal));
  float phongValue = max(0.0, dot(viewDir, r));
  phongValue = pow(phongValue, 8.0);

  specular += phongValue * 1.15;

  // Combine lighting
  lighting = diffuse;

  vec3 colour = modelColour * lighting +specular;

gl_FragColor = vec4(pow(colour, vec3(1.0 / 2.0)), 1.0);


}`;
