#version 300 es
precision highp float;

in vec2 vTextureCoord;

uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform float gaussianstrength;
uniform float gaussianlensin;
uniform float gaussianlensout;
uniform float centerX;
uniform float centerY;

out vec4 fragColor;

// See: https://developer.nvidia.com/gpugems/GPUGems3/gpugems3_ch40.html
void main() {
  vec4 originalColor = texture(uTexture, vTextureCoord);
  
  const float sigma   = 7.0;             // Gaussian sigma (réduit pour un effet plus subtil)
  const int   support = int(sigma * 3.0); // int(sigma * 3.0) truncation
  
  vec2 loc   = vTextureCoord;                    // center pixel cooordinate
  vec2 dir   = vec2( 1.0 / uResolution.x, 1.0 / uResolution.y ); // blur dans les deux directions
  vec4 acc   = vec4( 0.0 );                      // accumulator
  float norm = 0.0;
  
  // Application du blur gaussien
  for (int i = -support; i <= support; i++) {
    for (int j = -support; j <= support; j++) {
      float coeff = exp(-0.5 * (float(i*i + j*j)) / (sigma * sigma));
      acc += (texture(uTexture, loc + vec2(float(i), float(j)) / uResolution)) * coeff;
      norm += coeff;
    }
  }
  acc *= 1.0/norm;                               // normalize for unity gain
  
  // Contrôle du mélange entre l'original et le blur avec vignette
  float dist = distance(vTextureCoord.xy, vec2(centerX, centerY));
  float blurMask = smoothstep(gaussianlensout, gaussianlensin, dist);
  
  // Mélange entre la couleur originale et le blur
  fragColor = mix(acc, originalColor, blurMask);
}

