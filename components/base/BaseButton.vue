<template>
  <button class="base-button inter" :class="{ 'base-button_loading': isLoading }" :disabled="isDisabled || isLoading">
    <slot v-if="!isLoading"></slot>
  </button>
</template>

<script setup lang="ts">
interface IProps {
  isDisabled?: boolean;
  isLoading?: boolean;
}

defineProps<IProps>();
</script>

<style lang="scss" scoped>
@import '@/assets/scss/app.scss';

.base-button {
  width: 100%;
  background-color: $violet;
  border-radius: 10px;
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5rem;
  color: white;
  transition: 0.3s background-color ease;
  padding: 0 16px;

  &_loading {
    &:after {
      content: '';
      width: 30px;
      height: 30px;
      border: 5px solid #FFF;
      border-bottom-color: transparent;
      border-radius: 50%;
      display: inline-block;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
    }

      @keyframes rotation {
      0% {
          transform: rotate(0deg);
      }
      100% {
          transform: rotate(360deg);
      }
    } 
  }

  &:disabled {
    background-color: $violet--primary;
    cursor: not-allowed;
  }

  &:not(:disabled) {
    &:hover,
    &:active,
    &:focus-within {
      background-color: rgba($violet--primary, 0.8);
    }
  }

  &.transparent {
    border: 2px solid $violet;
    background-color: transparent;
    color: $violet;

    &:hover,
    &:active,
    &:focus-within {
      background-color: rgba($violet--primary, 0.2);
    }
  }
}
</style>
