import { ToastContainer as Toasts } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './ToastContainer.scss';
import { useThemeContext } from '@shared/model';

export const ToastContainer = () => {
  const { theme } = useThemeContext();

  return (
    <Toasts
      autoClose={5000}
      closeOnClick
      className="toast-container"
      theme={theme}
    />
  );
};
