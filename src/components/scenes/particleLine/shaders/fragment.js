export default /*glsl */ `


// #define PI 3.1415926535897932384626433832795

// uniform vec2 u_resolution;
// uniform float u_time;

uniform vec3 uLightColor;
uniform vec3 uDarkColor;
uniform float uTime;


varying vec2 vUv;

// //	Classic Perlin 3D Noise 
// //	by Stefan Gustavson
// //
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

// //	Classic Perlin 2D Noise 
// //	by Stefan Gustavson
// //
// vec4 permute(vec4 x)
// {
//     return mod(((x*34.0)+1.0)*x, 289.0);
// }

// vec2 fade(vec2 t)
// {
//     return t*t*t*(t*(t*6.0-15.0)+10.0);
// }

// float cnoise(vec2 P)
// {
//     vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
//     vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
//     Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
//     vec4 ix = Pi.xzxz;
//     vec4 iy = Pi.yyww;
//     vec4 fx = Pf.xzxz;
//     vec4 fy = Pf.yyww;
//     vec4 i = permute(permute(ix) + iy);
//     vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
//     vec4 gy = abs(gx) - 0.5;
//     vec4 tx = floor(gx + 0.5);
//     gx = gx - tx;
//     vec2 g00 = vec2(gx.x,gy.x);
//     vec2 g10 = vec2(gx.y,gy.y);
//     vec2 g01 = vec2(gx.z,gy.z);
//     vec2 g11 = vec2(gx.w,gy.w);
//     vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
//     g00 *= norm.x;
//     g01 *= norm.y;
//     g10 *= norm.z;
//     g11 *= norm.w;
//     float n00 = dot(g00, vec2(fx.x, fy.x));
//     float n10 = dot(g10, vec2(fx.y, fy.y));
//     float n01 = dot(g01, vec2(fx.z, fy.z));
//     float n11 = dot(g11, vec2(fx.w, fy.w));
//     vec2 fade_xy = fade(Pf.xy);
//     vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
//     float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
//     return 2.3 * n_xy;
// }
// float rand(float n){return fract(sin(n) * 43758.5453123);}

// float noise(float p){
// 	float fl = floor(p);
//   float fc = fract(p);
// 	return mix(rand(fl), rand(fl + 1.0), fc);
// }
// // // **Noised background like window
// // void main()
// // {
// //     vec2 st = gl_FragCoord.xy/u_resolution.xy;
// //     float noiseX = noise((st.x/10.0)*200.0);
// //     float noiseY = noise((st.y/10.0)*300.0);
// //     float noised = noiseX*noiseY;
// //     gl_FragColor = vec4(vec3(noised), 1.0);

// // }

// attribute float aScale;
// attribute vec3 aRandomness;

// uniform float uSize;
// uniform float uTime;

// varying vec3 vColor;





// void main()
// {
//     vec2 st = gl_FragCoord.xy/u_resolution.xy;
//     //create a dot grind
//     float noiseX = noise((st.x/10.0)*200.0)*PI*8+100.0;
//     float noiseY = noise((st.y/10.0)*300.0)*PI*8+ 100.0;
//     vec2 noiseVector = vec2(Math.cos(noiseX), Math.sin(noiseY));
//     float noised = noiseX*noiseY;

//     // float angel= cnoise(vec2(doted.xy,u_time * 0.5))* 2 * PI;
//     //  float flowY = cnoise(vec2(doted.y,u_time * 0.5));
//     //  float flow = flowX * flowY;
//     // float final = flow * doted;
//     // float strength  = strengthX * strengthY;
//     //  float flowX = st.x + (cnoise(vec3(doted, u_time * 0.5)*10.0)*2.0);
//     //   float flowY = st.y + (cnoise(vec3(st, u_time * 0.5)*10.0)*2.0);
//     // vec2 newSt =normalize(flowX,flowY);
//     // st *= strength;
//     //   float flow =(cnoise(vec3(newSt, u_time * 0.5)*10.0)*2.0);
//     gl_FragColor = vec4(vec3(noised), 1.0);

// }

// // vec2 wave(vec2 st, float freq) {
// // 	st.y += cos(st.x*freq);
// // 	return st;
// // }


// // float line(vec2 st, float width) {
// //     return step(width,1.0 - smoothstep(.0,1.,abs(sin(st.y*PI))));
// // }

// // void main(){

    
// //     vec2 st = gl_FragCoord.xy/u_resolution.xy;
// //     //st.x *= u_resolution.x/u_resolution.y;

// //    	st *= 10.;
// //    	st = wave(st , 5.) * (sin(u_time)+1.0)/2.0;
// //     vec3 color = vec3(line(st,.5));
// //     vec3 color_r= mix(color, vec3(vUv.x*(sin(u_time)+1.0)/2.0,0.0,0.0), st.y);
// //     gl_FragColor = vec4(color_r, 1.0);
// // }

// float cnoise(vec2 P)
// {
//     vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
//     vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
//     Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
//     vec4 ix = Pi.xzxz;
//     vec4 iy = Pi.yyww;
//     vec4 fx = Pf.xzxz;
//     vec4 fy = Pf.yyww;
//     vec4 i = permute(permute(ix) + iy);
//     vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
//     vec4 gy = abs(gx) - 0.5;
//     vec4 tx = floor(gx + 0.5);
//     gx = gx - tx;
//     vec2 g00 = vec2(gx.x,gy.x);
//     vec2 g10 = vec2(gx.y,gy.y);
//     vec2 g01 = vec2(gx.z,gy.z);
//     vec2 g11 = vec2(gx.w,gy.w);
//     vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
//     g00 *= norm.x;
//     g01 *= norm.y;
//     g10 *= norm.z;
//     g11 *= norm.w;
//     float n00 = dot(g00, vec2(fx.x, fy.x));
//     float n10 = dot(g10, vec2(fx.y, fy.y));
//     float n01 = dot(g01, vec2(fx.z, fy.z));
//     float n11 = dot(g11, vec2(fx.w, fy.w));
//     vec2 fade_xy = fade(Pf.xy);
//     vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
//     float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
//     return 2.3 * n_xy;
// }

void main() {

//     // float strength = disc(gl_PointCoord, vec2(0.5));
    // float strength = diffusePoint(gl_PointCoord, vec2(0.5), 2.0);
// //     float strength = lightPoint(gl_PointCoord, vec2(0.5), 10.0);
// //        // Final color
float strength = cnoise(vec3(vUv, uTime));
strength = clamp(strength, 0.0, 1.0);

vec3 color = mix(uDarkColor, uLightColor, strength*strength*2.0);



    gl_FragColor = vec4 (color, 1.0);
}`;
