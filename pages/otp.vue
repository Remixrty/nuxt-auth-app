<template>
  <split-layout image="otp-image">
    <template #form>
      <div class="form flex flex-col gap-[25px] items-center justify-center">
        <h1 class="form__title text-4xl font-bold text-left w-full">Enter OTP</h1>
        <p class="paragraph-with-span text-left w-full mt-[-25px] text-xl/[1.5rem]" v-if="user?.email">Send OTP on <span class="default-link font-semibold">{{ user.email }}</span></p>
        <nuxt-link to="/signup" class="default-link text-left self-start mt-[-25px]">Change email</nuxt-link>
        <otp-input v-model="form.code" />
        <base-button @click="submitOtp" :is-loading="isLoading" :is-disabled="computeIsSubmitDisabled"
          >SUBMIT</base-button
        >
      </div>
    </template>
    
    <template #description>
      <p class="text-center text-xl/[1.5rem] font-bold">It's just OTP verification</p>
      <p class="text-center text-base/[1.5rem]">You are one step away from recovering your password.</p>
    </template>
  </split-layout>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/store/authStore';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import SplitLayout from '~/layouts/SplitLayout.vue';
import OtpInput from '~/components/base/OtpInput.vue';
import useVuelidate from '@vuelidate/core';
import { useRulesValidate } from '~/common/rulesValidate';
import { watch, ref, computed } from 'vue'

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { mock } = authStore
const router = useRouter();
const initialState = {
  code: '',
};
const form = reactive({ ...initialState });
const { otpRules } = useRulesValidate(form);
const v$ = useVuelidate(otpRules, { form });
const isLoading = ref(false);

const submitOtp = async () => {
  const result = await v$.value.$validate();

  if (!result) return;

  try {
    isLoading.value = true;
    await mock(form, 3000);
    user.value = {}
  } catch (e) {
    throw new Error();
  } finally {
    isLoading.value = false;
  }
};

const computeIsSubmitDisabled = computed(() => {
  return form.code?.length < 6;
});

watch(() => user.value, (newValue) => {
  if (!newValue?.email || !newValue?.username) router.push('/')
}, {
  immediate: true,
  deep: true,
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/app.scss';
</style>
