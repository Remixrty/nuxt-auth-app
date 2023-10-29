<template>
  <div class="grid h-screen md:grid-cols-2 grid-cols-1">
    <div class="flex flex-col items-center justify-center p-10">
      <slot name="form"/>
    </div>

    <div class="banner flex flex-col items-center justify-center bg-[#6172F3] p-2 md:flex hidden">
      <img :src="`img/${image}.png`" v-if="image" />
      <div class="banner-description py-[50px]">
        <slot name="description" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  image?: string;
}
withDefaults(defineProps<IProps>(), {
  image: '',
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/app.scss';

.banner {
  img {
    object-fit: contain;
  }

  :deep(p) {
    color: $white;
  }
}
</style>
