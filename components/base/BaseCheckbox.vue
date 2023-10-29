<template>
  <label class="base-checkbox" :class="{ error: errors?.length }" :for="`${formName}_${uid}`">
    <span class="base-checkbox__styled" :class="{ active: modelValue }"></span>
    <p>Accept <nuxt-link to="#" class="default-link">terms and conditions</nuxt-link></p>
    <input type="checkbox" :value="modelValue" @input="handleInput" :id="`${formName}_${uid}`" />
  </label>
</template>

<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core';
import { computed } from 'vue';

interface IProps {
  modelValue: boolean | string;
  errors?: ErrorObject[];
  formName?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: false,
  errors: () => [],
  formName: '',
});
const emit = defineEmits(['update:modelValue']);

const uid = getCurrentInstance()?.uid;

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;

  emit('update:modelValue', target.checked);
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/app.scss';
.base-checkbox {
  display: flex;
  align-items: center;
  gap: 10px;

  &.error {
    .base-checkbox {
      &__styled {
        border-color: $error-color;
      }
    }
  }

  input {
    appearance: none;
    visibility: hidden;
  }

  &__styled {
    border: 2px solid $default--blue;
    width: 20px;
    height: 20px;
    border-radius: 2px;
    cursor: pointer;
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;

    &::after {
      content: '';
      width: 0;
      height: 0;
      border-radius: 1.5px;
      background-color: $default--blue;
      visibility: hidden;
      opacity: 0;
      transition: 0.15s all ease;
    }

    &.active {
      &::after {
        width: 100%;
        height: 100%;
        visibility: visible;
        opacity: 1;
      }
    }
  }
}
</style>
