import { ofetch } from 'ofetch';

export const authService = {
  logIn: async (payload) => {
    return await ofetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      body: payload
    });
  },
};
