import { ToastContainer as Toasts } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ToastContainer.scss';

export const ToastContainer = () => {
  return <Toasts autoClose={5000} closeOnClick className="toast-container" />;
};
