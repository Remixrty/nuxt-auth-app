<template>
  <div class="modal" v-if="isOpen">
    <div class="modal__content">
      <p class="modal__title">{{ options?.title }}</p>
      <p>{{ options?.message }}</p>
      <div class="modal__buttons">
        <BaseButton @click="options?.callback"> {{ options?.button_text }} </BaseButton>
        <BaseButton @click="handleClose" class="transparent">cancel</BaseButton>
      </div>
    </div>
    <div class="modal__overlay"></div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/authStore';
import type { IAlertOptions } from '~/types';
import BaseButton from './base/BaseButton.vue';

interface IProps {
  options: IAlertOptions;
  isOpen: boolean;
}
const props = defineProps<IProps>();
const emit = defineEmits(['update:isOpen']);

const handleClose = () => {
  emit('update:isOpen', false);
};
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 10;

  &__overlay {
    background-color: rgba(black, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  }

  &__content {
    background-color: white;
    border-radius: 8px;
    width: min(400px, 100%);
    padding: 1.5rem 2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    z-index: 2;
  }

  &__buttons {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 10px;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;

    // :deep(.base-button) {
    //   width: fit-content;
    // }
  }

  &__title {
    font-size: 2rem;
    font-weight: 700;
  }
}
</style>
