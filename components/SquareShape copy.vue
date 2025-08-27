<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Application, Container, Graphics, BlurFilter, Filter, GlProgram, Texture } from 'pixi.js'

import vertex from '@/assets/shaders/squareShape.vert?raw'
import fragment from '@/assets/shaders/squareShape.frag?raw'

const pixiContainer = ref(null)
let app = null

onMounted(async () => {
  app = new Application()
  await app.init({
    backgroundAlpha: 0,
    antialias: true,
    resizeTo: pixiContainer.value,
    resolution: window.devicePixelRatio,
    autoDensity: true
  })
  pixiContainer.value.appendChild(app.canvas)

  const container = new Container()
  // container.scale.set(0.5)
  app.stage.addChild(container)

  // Création de la forme équivalente au path SVG (coordonnées * 2)
  const shape = new Graphics()
  shape.moveTo(144.849 * 2, 71.9999 * 2)
  shape.bezierCurveTo(144.849 * 2, 56.0505 * 2, 139.553 * 2, 40.5525 * 2, 129.792 * 2, 27.9383 * 2)
  shape.bezierCurveTo(120.032 * 2, 15.3242 * 2, 106.359 * 2, 6.30793 * 2, 90.9203 * 2, 2.30472 * 2)
  shape.bezierCurveTo(75.4814 * 2, -1.69848 * 2, 59.1503 * 2, -0.462057 * 2, 44.4901 * 2, 5.81995 * 2)
  shape.bezierCurveTo(29.8299 * 2, 12.102 * 2, 17.6705 * 2, 23.0739 * 2, 9.92042 * 2, 37.0138 * 2)
  shape.bezierCurveTo(2.1703 * 2, 50.9537 * 2, -0.731857 * 2, 67.0724 * 2, 1.66944 * 2, 82.84 * 2)
  shape.bezierCurveTo(4.07074 * 2, 98.6076 * 2, 11.6396 * 2, 113.132 * 2, 23.188 * 2, 124.133 * 2)
  shape.bezierCurveTo(34.7364 * 2, 135.133 * 2, 49.6107 * 2, 141.988 * 2, 65.4763 * 2, 143.621 * 2)
  shape.bezierCurveTo(81.3419 * 2, 145.255 * 2, 97.3007 * 2, 141.574 * 2, 110.848 * 2, 133.156 * 2)
  shape.lineTo(72.8487 * 2, 71.9999 * 2)
  shape.lineTo(144.849 * 2, 71.9999 * 2)
  shape.fill({ color: 0x1859FF })
  shape.scale.set(0.5)
  shape.position.set(100, 100)
  container.addChild(shape)

  const customFilter = new Filter({
    glProgram: new GlProgram({
      fragment,
      vertex,
    }),
    resources: {
      timeUniforms: {
        uImageSize: { value: [144, 144], type: 'vec2<f32>' },
        uViewportSize: { value: [window.innerWidth, window.innerHeight], type: 'vec2<f32>' },
        uTime: { value: 100 * Math.random(), type: 'f32' },
        uBlurStrength: { value: 1.0, type: 'f32' },
      },
    },
    padding: 35,
    antialias: true,
    resolution: window.devicePixelRatio
  });
  shape.filters = [customFilter]

  const resizeObserver = new ResizeObserver(() => {
    if (app && app.renderer) {
      app.renderer.resize(
        pixiContainer.value.clientWidth,
        pixiContainer.value.clientHeight
      )
    }
  })
  resizeObserver.observe(pixiContainer.value)

  pixiContainer.value._resizeObserver = resizeObserver

  app.ticker.add((ticker) => {
    customFilter.resources.timeUniforms.uniforms.uTime += 0.04 * ticker.deltaTime;
  });
})

onUnmounted(() => {
  if (pixiContainer.value?._resizeObserver) {
    pixiContainer.value._resizeObserver.disconnect()
  }
  if (app) {
    app.destroy(true, { children: true, texture: true, baseTexture: true })
    app = null
  }
})

</script>

<template>
  <div class="overflow-container">
    <div id="pixi-container" ref="pixiContainer"></div>
  </div>
  <div class="square-shape" ref="squareShape">
    <!-- <svg viewBox="0 0 145 144" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M144.849 71.9999C144.849 56.0505 139.553 40.5525 129.792 27.9383C120.032 15.3242 106.359 6.30793 90.9203 2.30472C75.4814 -1.69848 59.1503 -0.462057 44.4901 5.81995C29.8299 12.102 17.6705 23.0739 9.92042 37.0138C2.1703 50.9537 -0.731857 67.0724 1.66944 82.84C4.07074 98.6076 11.6396 113.132 23.188 124.133C34.7364 135.133 49.6107 141.988 65.4763 143.621C81.3419 145.255 97.3007 141.574 110.848 133.156L72.8487 71.9999H144.849Z"
        fill="currentColor" />
    </svg> -->
  </div>
</template>

<style lang="scss">
.overflow-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  #pixi-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
}

.square-shape {
  width: 144px;
  height: 144px;
  color: #1859FF;
}
</style>
