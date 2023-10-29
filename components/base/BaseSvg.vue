<template>
  <nuxt-svg-icon
    :name="icon"
    :stroke="stroke"
    :fill="fill"
    :class="classes"
    :font-size="size"
    :use-origin-size="useOriginSize"
  />
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

interface IProps {
  icon: string;
  fill?: string;
  stroke?: string;
  useOriginSize?: boolean;
  size?: number;
}

const props = withDefaults(defineProps<IProps>(), {
  name: '',
  useOriginSize: true
})

const classes = computed(() => {
  return {
    'use-origin-width': props.useOriginSize,
    'use-origin-height': props.useOriginSize,
  }
})
</script>

<style scoped lang="scss">
.nuxt-svg-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  :deep(svg) {
    max-width: 100%;
    max-height: 100%;
  }

  &.use-origin-width {
    :deep(svg) {
      width: var(--svg-origin-width--with-unit) !important;
      min-width: var(--svg-origin-width--with-unit) !important;
    }
  }

  &.use-origin-height {
    :deep(svg) {
      height: var(--svg-origin-height--with-unit) !important;
      min-height: var(--svg-origin-height--with-unit) !important;
    }
  }
}
</style>
