<template>
  <div class="otp-inputs" id="inputs" @click="focusFirstInput">
    <div class="otp-input" v-for="item in Array(6)">
      <input type="text" inputmode="numeric" maxlength="2" placeholder="-" ref="inputs" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  modelValue?: string | number;
}
const props = defineProps<IProps>();
const emit = defineEmits(['update:modelValue']);
const inputs = ref<HTMLInputElement[] | null>(null);
12;

const passOtp = () => {
  if (!inputs.value) return;

  otpCode.value = inputs.value.reduce((acc, item) => {
    acc += item.value;
    return acc;
  }, '');
};

const focusFirstInput = () => {
  if (!inputs.value) return;

  inputs.value.forEach((item) => {
    item.value = '';
  });

  inputs.value[0].focus();
};

const focusNextInput = (e: Event, v = 0) => {
  const target = e.target;
  if (!target?.value) return;

  const val = target.value;

  if (isNaN(val) || val[0] === ' ' || val[0] === '') {
    target.value = '';
    return;
  }

  if (val[0] !== '' && inputs.value) {
    target.value = val[0];
    passOtp();

    const next = inputs.value[v + 1];

    if (!next) {
      return;
    }

    next.focus();
  }
};

const focusNext = (e: Event, v = 0) => {
  if (e.target.value !== '') {
    const next = inputs.value[v + 1];

    if (!next) {
      return;
    }

    next.focus();
  }
};

const focusPrevInput = (e: Event, v = 0) => {
  if (!inputs.value) return;

  const key = e.key.toLowerCase();

  if (key === 'backspace' || key === 'delete') {
    e.target.value = '';
    passOtp();

    const prev = inputs.value[v - 1];

    if (!prev) return;
    prev.focus();
  }
};

const otpCode = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit('update:modelValue', newValue);
  },
});

onMounted(() => {
  if (!inputs.value?.length) return;

  inputs.value.forEach((item, index) => {
    item.addEventListener('input', (e) => focusNextInput(e, index));
    item.addEventListener('keyup', (e) => focusPrevInput(e, index));
  });
});

onUnmounted(() => {
  inputs.value?.forEach((item, index) => {
    item.removeEventListener('input', (e) => focusNextInput(e, index));
    item.removeEventListener('keyup', (e) => focusPrevInput(e, index));
  })
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/app.scss';

.otp-inputs {
  display: flex;
  flex-wrap: nowrap;
  gap: 20px;

  @include md {
    gap: 10px;
  }

  .otp-input {
    border: 2px solid $violet--primary;
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $violet--light;
    width: max(100%, 64px);
    height: 64px;
    pointer-events: none;

    input {
      outline: none;
      font-size: 2rem;
      line-height: 2.25rem;
      background: transparent;
      width: 100%;
      height: 100%;
      text-align: center;

      &:focus {
        &::placeholder {
          color: transparent;
        }
      }
    }
  }
}
</style>
