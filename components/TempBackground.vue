<template>
  <div class="temp-background">
    <NuxtImg v-for="shape in shapes" :key="shape.name" :src="`/images/${shape.name}.webp`" alt="" class="shape"
      :class="shape.name" :style="getShapeStyle(shape)" />
  </div>
</template>

<script lang="ts" setup>
import { NuxtImg } from '#components';
import { onMounted, onUnmounted, ref, computed, watch } from 'vue';

const windowWidth = ref(0);
const windowHeight = ref(0);

const shapeScale = computed(() => {
  return windowWidth.value < 768 ? 0.5 : 1;
});

interface Shape {
  name: string;
  position: string;
  color: string;
  parallax?: string;
}

const props = defineProps<{
  shapes?: Shape[]
}>()

const getShapeStyle = (shape: Shape) => {
  const positionRules = shape.position.split(', ');
  const styleObj: Record<string, string> = {
    color: shape.color
  };

  positionRules.forEach(rule => {
    const [property, value] = rule.split(': ').map(part => part.trim());
    if (property && value) {
      styleObj[property] = value;
    }
  });

  return styleObj;
}

const handleResize = () => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
};

const updateShapesTransform = (mouseX?: number, mouseY?: number) => {
  const shapes = document.querySelectorAll('.shape');
  shapes.forEach((shape, index) => {
    if (props.shapes && props.shapes[index]) {
      const shapeData = props.shapes[index];
      let parallaxX = 0.05 + index * 0.05; // valeur par défaut
      let parallaxY = 0.05 + index * 0.05; // valeur par défaut

      // Parse les valeurs de parallaxe personnalisées si définies
      if (shapeData.parallax) {
        const [xStr, yStr] = shapeData.parallax.split(', ').map(val => val.trim());
        parallaxX = parseFloat(xStr || '0') || parallaxX;
        parallaxY = parseFloat(yStr || '0') || parallaxY;
      }

      const x = mouseX ?? windowWidth.value / 2;
      const y = mouseY ?? windowHeight.value / 2;

      const offsetX = (x - windowWidth.value / 2) * parallaxX * 0.02;
      const offsetY = (y - windowHeight.value / 2) * parallaxY * 0.02;

      const htmlElement = shape as HTMLElement;
      htmlElement.style.transform = `${getBaseTransform(shapeData)} translate(${offsetX}px, ${offsetY}px) scale(${shapeScale.value})`;
    }
  });
};

onMounted(() => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;

  const handleMouseMove = (event: MouseEvent) => {
    updateShapesTransform(event.clientX, event.clientY);
  };

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('resize', handleResize);

  // Initialisation des shapes
  updateShapesTransform();

  // Stockage des références pour le nettoyage
  (window as any).__tempBackgroundHandlers = { handleMouseMove, handleResize };
});

// Watcher pour mettre à jour le scale quand la fenêtre change
watch(shapeScale, () => {
  updateShapesTransform();
});

onUnmounted(() => {
  const handlers = (window as any).__tempBackgroundHandlers;
  if (handlers) {
    window.removeEventListener('resize', handlers.handleResize);
    window.removeEventListener('mousemove', handlers.handleMouseMove);
    delete (window as any).__tempBackgroundHandlers;
  }
});

// Fonction helper pour récupérer la transform de base définie dans le JSON
const getBaseTransform = (shape: Shape) => {
  const positionRules = shape.position.split(', ');
  const transformRule = positionRules.find(rule => rule.trim().startsWith('transform:'));
  return transformRule ? (transformRule.split(': ')[1]?.trim() + ' ') || '' : '';
};

</script>

<style lang="scss" scoped>
.temp-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  // background-color: rgba(210, 255, 28, 0.8);
  /* backdrop-filter: blur(5px); */
  z-index: -1;
  overflow: hidden;

  .shape {
    position: absolute;
    pointer-events: none;

    @media screen and (max-width: 768px) {}
  }

}
</style>