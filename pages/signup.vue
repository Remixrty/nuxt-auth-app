<template>
  <split-layout image="signup-image">
    <template #form>
      <div class="form flex flex-col gap-[25px] items-center justify-center">
        <h1 class="form__title text-4xl font-bold text-left w-full">Create your account</h1>
        <p class="text-left w-full mt-[-25px] text-xl/[1.5rem]">Unlock all Features!</p>

        <div class="flex flex-col gap-[10px] w-full">
          <base-input
            type="text"
            placeholder="Username"
            icon="person-icon"
            v-model="form.username"
            :errors="v$.form.username.$errors"
          />
          <base-input
            type="text"
            placeholder="Email"
            icon="email-icon"
            v-model="form.email"
            :errors="v$.form.email.$errors"
          />
          <base-input
            type="password"
            placeholder="Password"
            icon="password-icon"
            v-model="form.password"
            :errors="v$.form.password.$errors"
          />
          <base-input
            type="password"
            placeholder="Confirm password"
            icon="password-icon"
            v-model="form.password_repeat"
            :errors="v$.form.password_repeat.$errors"
          />
          <base-checkbox class="mt-[0.25rem]" v-model="form.policy" :errors="v$.form.policy.$errors" />
        </div>

        <base-button :is-disabled="computeIsSubmitDisabled" @click="submitForm" :is-loading="isLoading"
          >SIGN UP</base-button
        >
        <p class="text-center">You have account? <nuxt-link to="/" class="default-link">Login now</nuxt-link></p>
      </div>
    </template>
    <template #description>
      <p class="text-center text-xl/[1.5rem] font-bold">Join us!</p>
      <p class="text-center text-base/[1.5rem]">Just go through the boring process of creating an account.</p>
    </template>
  </split-layout>
  <alert-modal :is-open="isAlertShow" :options="alertOptions" @update:is-open="closeAlert" />
</template>

<script setup lang="ts">
import SplitLayout from '~/layouts/SplitLayout.vue';
import BaseInput from '~/components/base/BaseInput.vue';
import BaseButton from '~/components/base/BaseButton.vue';
import BaseCheckbox from '~/components/base/BaseCheckbox.vue';
import AlertModal from '~/components/AlertModal.vue';
import useVuelidate from '@vuelidate/core';
import { useRulesValidate } from '~/common/rulesValidate';
import type { IAlertOptions } from '~/types';
import { useAuthStore } from '~/store/authStore';
import { useRouter } from 'vue-router';

const router = useRouter()
const authStore = useAuthStore()
const { mock } = authStore
const isLoading = ref(false);
const initialState = {
  username: '',
  email: '',
  password: '',
  password_repeat: '',
  policy: false,
};
const form = reactive({ ...initialState });
const { signupRules } = useRulesValidate(form);
const v$ = useVuelidate(signupRules, { form });
const alertOptions = ref<IAlertOptions>({})
const isAlertShow = ref<boolean>(false)

onBeforeRouteLeave((to, from, next) => {  
  if (to.path === '/otp') {
    next()
    return 
  }

  alertOptions.value = {
    title: 'Confirm following the link',
    message: 'Are you sure? All unsaved data will be cleared',
    button_text: 'ok',
    callback: () => {
      alertOptions.value = {}
      isAlertShow.value = false
      return next()
    }
  }
  isAlertShow.value = true
})

const closeAlert = (val: boolean) => {
  isAlertShow.value = val
}

const submitForm = async () => {
  const result = await v$.value.$validate();

  if (!result) return;

  try {
    isLoading.value = true;
    await mock(form, 3000);
    await router.push('/otp')
  } catch (e) {
    throw new Error();
  } finally {
    isLoading.value = false;
  }
};

const computeIsSubmitDisabled = computed(() => {
  return !!Object.values(form).filter((item) => !item || item === '').length;
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/app.scss';
</style>
