import { email as emailRul, helpers, maxLength, minLength, required, sameAs } from '@vuelidate/validators';
import { shallowRef, ref } from 'vue';

const validatePassword = (password: string): boolean => {
  const hasUpperCase = /[A-ZА-Я]/.test(password);
  const hasLowerCase = /[a-zа-я]/.test(password);
  const hasNumber = /\d/.test(password);

  return hasUpperCase && hasLowerCase && hasNumber;
};

const sameFieldAs = (newPass: string, form: any): boolean => {  
  return !!newPass && !!form?.password && newPass === form.password
}

export const useRulesValidate = (form?: any) => {
  const authRules = shallowRef({
    form: {
      email: {
        required: helpers.withMessage('Field is required', required),
        maxLength: helpers.withMessage('Maximum length is 255', maxLength(255)),
        email: helpers.withMessage('Incorrect email', emailRul),
      },
      password: {
        required: helpers.withMessage('Field is required', required),
        checkPassword: helpers.withMessage(
          'Password should contain at least 1 digit, 1 lower- and 1 upper-case letters',
          validatePassword
        ),
        minLength: helpers.withMessage('Password should be longer than 8 characters', minLength(8)),
        maxLength: helpers.withMessage('Password should not be longer than 50 characters', maxLength(50)),
      },
    },
  });

  const signupRules = shallowRef({
    form: {
      username: {
        required: helpers.withMessage('Field is required', required),
        maxLength: helpers.withMessage('Maximum length is 255', maxLength(255)),
        minLength: helpers.withMessage('Minimum length is 3', minLength(3)),
      },
      email: {
        required: helpers.withMessage('Field is required', required),
        maxLength: helpers.withMessage('Maximum length is 255', maxLength(255)),
        email: helpers.withMessage('Incorrect email', emailRul),
      },
      password: {
        required: helpers.withMessage('Field is required', required),
        checkPassword: helpers.withMessage(
          'Password should contain at least 1 digit, 1 lower- and 1 upper-case letters',
          validatePassword
        ),
        minLength: helpers.withMessage('Password should be longer than 8 characters', minLength(8)),
        maxLength: helpers.withMessage('Password should not be longer than 50 characters', maxLength(50)),
      },
      password_repeat: {
        required: helpers.withMessage('Field is required', required),
        passwords_same: helpers.withMessage('Passwords are not same', sameFieldAs)
      },
      policy: {
        required: helpers.withMessage('Field is required', (value) => value),
      }
    },
  });

  const otpRules = shallowRef({
    form: {
      code: {
        required: helpers.withMessage('Field is required', required),
        maxLength: helpers.withMessage('Maximum length is 6', maxLength(6)),
        minLength: helpers.withMessage('Minimum length is 6', minLength(6)),
      }
    }
  })

  return {
    authRules,
    signupRules,
    otpRules,
  };
};
