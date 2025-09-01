<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" width="384" height="394" viewBox="0 0 384 394" fill="none">
      <defs>
        <!-- Dégradé vertical pour le masque -->
        <linearGradient id="blur-gradient" x1="0" y1="394" x2="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="white" stop-opacity="0" />
          <stop offset="100%" stop-color="white" stop-opacity="1" />
        </linearGradient>
        <mask id="blur-mask">
          <rect x="0" y="0" width="384" height="394" fill="url(#blur-gradient)" />
        </mask>
        <filter id="filter0_fn_3239_761" x="0.597267" y="0.754982" width="382.477" height="393.2"
          filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="17.05" result="effect1_foregroundBlur_3239_761" />
          <feTurbulence type="fractalNoise" baseFrequency="1.1111111640930176 1.1111111640930176" stitchTiles="stitch"
            numOctaves="3" result="noise" seed="2753" />
          <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
          <feComponentTransfer in="alphaNoise" result="coloredNoise1">
            <feFuncA type="discrete"
              tableValues="1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
          </feComponentTransfer>
          <feComposite operator="in" in2="effect1_foregroundBlur_3239_761" in="coloredNoise1" result="noise1Clipped" />
          <feFlood flood-color="rgba(0, 0, 0, 0.25)" result="color1Flood" />
          <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
          <feMerge result="effect2_noise_3239_761">
            <feMergeNode in="effect1_foregroundBlur_3239_761" />
            <feMergeNode in="color1" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#filter0_fn_3239_761)" mask="url(#blur-mask)">
        <path
          d="M290.974 151.247C280.761 130.473 263.938 113.679 243.147 103.5C222.357 93.3209 198.774 90.3334 176.102 95.0062C153.43 99.679 132.951 111.748 117.879 129.318C102.808 146.888 93.9968 168.966 92.8295 192.085C91.6621 215.205 98.2043 238.057 111.429 257.056C124.654 276.055 143.814 290.126 165.9 297.058C187.986 303.991 211.749 303.394 233.46 295.361C255.17 287.328 273.599 272.314 285.853 252.675L197.196 197.355L290.974 151.247Z"
          fill="#1859FF" />
      </g>
    </svg>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>