import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { IUserInfo } from '../types';
import { authService } from '~/services/authService';

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<IUserInfo>({} as IUserInfo);

  const logIn = async (payload: { email: string; password: string }) => {
    try {
      await authService.logIn(payload)
    } catch (e) {      
      throw e
    }
  };

  const mock = async (payload, timeout = 1000) => {
    return new Promise<void>((resolve, reject): void => {
      setTimeout(() => {
        try {
          user.value = {
            username: payload.username,
            email: payload.email
          }
          resolve()
        } catch (e) {
          reject()
        }
      }, timeout);
    });
  };

  return {
    user,
    logIn,
    mock,
  };
});
