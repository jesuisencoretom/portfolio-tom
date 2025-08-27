precision highp float;

in vec2 vTextureCoord;
in vec4 vColor;

uniform sampler2D uTexture;
uniform vec2 uImageSize;
uniform vec2 uPlaneSize;
uniform float uBlurStrength;

// Uniform supplémentaire pour la couleur de fond
uniform vec4 uBackgroundColor;

vec3 draw(sampler2D image, vec2 uv) {
  return texture2D(image, uv).rgb;   
}

vec3 blur(vec2 uv, sampler2D image, float blurAmount){
  vec3 blurredImage = vec3(0.);
  float totalWeight = 0.0;
  const int samples = 32;
  
  for (int i = 0; i < samples; i++) {
    float angle = float(i) * 6.28318 / float(samples); // 2*PI
    for (int j = 1; j <= 4; j++) {
      float radius = float(j) * 0.25;
      vec2 offset = vec2(cos(angle), sin(angle)) * radius * blurAmount * 0.01;
      float weight = 1.0 / (1.0 + radius * 2.0);
      
      blurredImage += draw(image, uv + offset) * weight;
      totalWeight += weight;
    }
  }
  
  return blurredImage / totalWeight;
}

void main() {
  vec2 ratio = vec2(
    min((uPlaneSize.x / uPlaneSize.y) / (uImageSize.x / uImageSize.y), 1.0),
    min((uPlaneSize.y / uPlaneSize.x) / (uImageSize.y / uImageSize.x), 1.0)
  );

  vec2 uv = vec2(
    vTextureCoord.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vTextureCoord.y * ratio.y + (1.0 - ratio.y) * 0.5
  );

  // Vérifie si on est dans la texture
  if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
    gl_FragColor = uBackgroundColor; // couleur de fond
  } else {
    vec4 final = vec4(blur(uv, uTexture, uBlurStrength), 1.0);
    gl_FragColor = final;
  }
}

