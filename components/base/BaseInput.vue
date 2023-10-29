<template>
  <div class="flex flex-col gap-[6px]">
    <label class="base-input inter" :class="{ error: errors?.length }">
      <base-svg v-if="icon" :icon="icon" :size="iconSize" />
      <input
        :type="passType ? passType : type"
        :disabled="isDisabled"
        :placeholder="placeholder"
        @input="handleInput"
        :value="modelValue"
      />
      <base-svg v-if="type === 'password'" icon="hide-password-icon" :size="30" @click="togglePassType" />
    </label>
    <p class="error-text" v-if="errors?.length">{{ errors[0]?.$message }}</p>
  </div>
</template>

<script setup lang="ts">
import BaseSvg from '~/components/base/BaseSvg.vue';
import type { ErrorObject } from '@vuelidate/core';

interface IProps {
  type?: string;
  isDisabled?: boolean;
  placeholder?: string;
  icon?: string;
  iconSize?: number;
  iconClasses?: string[];
  modelValue?: string | number;
  errors?: ErrorObject[];
}

const props = withDefaults(defineProps<IProps>(), {
  type: 'text',
  isDisabled: false,
  placeholder: '',
  icon: '',
});
const emit = defineEmits(['update:modelValue']);

const passType = ref<string>('');

const togglePassType = () => {
  passType.value = passType.value !== 'text' ? 'text' : 'password';
};

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement;

  emit('update:modelValue', target.value);
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/app.scss';

.base-input {
  border: 2px solid $violet--primary;
  padding: 10px 20px 10px 10px;
  border-radius: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: $violet--light;
  min-height: 64px;

  &.error {
    border-color: red;
  }

  input {
    outline: none;
    font-size: 1.125rem;
    line-height: 1.5rem;
    background: transparent;
    width: 100%;
    height: 100%;
  }

  :deep(svg) {
    opacity: 0.2;
  }
}
</style>
