import type { Options } from 'toastify-js';
import ToastifyNotification from 'toastify-js';
import 'toastify-js/src/toastify.css';

const defaultOptions: Options = {
  style: {
    background:
      'linear-gradient(45deg, var(--color--pink-100), var(--color--orange-90))',
  },
  close: true,
  duration: 5000,
};

export const toastify = (text: string) => {
  return ToastifyNotification({ ...defaultOptions, text }).showToast();
};
