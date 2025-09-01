#version 300 es
precision highp float;

in vec2 vTextureCoord;
in vec4 vColor;

uniform sampler2D uTexture;

/*

Jorge Capillo
https://tympanus.net/codrops/2024/07/02/progressive-blur-effect-using-webgl-with-ogl-and-glsl-shaders/
https://github.com/JorgeCapillo/webgl-progressive-blur, MIT license

*/
uniform vec2 uImageSize;
// uniform vec2 uPlaneSize;
uniform vec2 uViewportSize;
uniform float uTime;
uniform float uBlurStrength;
// uniform sampler2D tMap;

out vec4 fragColor;

/*
  by @arthurstammet
  https://shadertoy.com/view/tdXXRM
*/
float tvNoise (vec2 p, float ta, float tb) {
  return fract(sin(p.x * ta + p.y * tb) * 5678.);
}
vec4 draw(sampler2D image, vec2 uv) {
  return texture(image,vec2(uv.x, uv.y));   
}
float rand(vec2 co){
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

/*
  inspired by https://www.shadertoy.com/view/4tSyzy
  @anastadunbar
*/

vec4 blur(vec2 uv, sampler2D image, float blurAmount){
  vec4 blurredImage = vec4(0.);
  float totalAlpha = 0.;
  float gradient = smoothstep(0.8, 0.0, 3.4 - (gl_FragCoord.y / uViewportSize.y) / uViewportSize.y) * uBlurStrength + smoothstep(0.8, 0.0, (gl_FragCoord.y / uViewportSize.y) / uViewportSize.y) * uBlurStrength;
  #define repeats 40.
  for (float i = 0.; i < repeats; i++) { 
    vec2 q = vec2(cos(degrees((i / repeats) * 360.)), sin(degrees((i / repeats) * 360.))) * (rand(vec2(i, uv.x + uv.y)) + blurAmount); 
    vec2 uv2 = uv + (q * blurAmount * gradient);
    vec4 sample1 = draw(image, uv2);
    blurredImage.rgb += sample1.rgb * sample1.a / 2.;
    blurredImage.a += sample1.a / 2.;
    totalAlpha += sample1.a / 2.;
    
    q = vec2(cos(degrees((i / repeats) * 360.)), sin(degrees((i / repeats) * 360.))) * (rand(vec2(i + 2., uv.x + uv.y + 24.)) + blurAmount); 
    uv2 = uv + (q * blurAmount * gradient);
    vec4 sample2 = draw(image, uv2);
    blurredImage.rgb += sample2.rgb * sample2.a / 2.;
    blurredImage.a += sample2.a / 2.;
    totalAlpha += sample2.a / 2.;
  }
  
  // Normaliser par le nombre d'échantillons
  blurredImage /= repeats;
  
  // Éviter la division par zéro et normaliser les couleurs par l'alpha total
  if (totalAlpha > 0.001) {
    blurredImage.rgb = blurredImage.rgb / (totalAlpha / repeats);
  }
  
  return blurredImage;
}
void main(void)
{
  vec2 uvs = vTextureCoord.xy;
  vec4 fg = texture(uTexture, vTextureCoord);

  float t = uTime + 123.0;
  float ta = t * 0.654321;
  float tb = t * (ta * 0.123456);
  vec4 noise = vec4(1. - tvNoise(uvs, ta, tb));

  // Blur RGBA avec pondération par alpha
  vec4 blurred = blur(uvs, uTexture, 0.08);
  
  vec4 final = blurred;
  final = final - noise * 0.08;

  fragColor = final;
}