import type {TAlertType} from '../components/toast/AppAlert';

type GlobalToastFn = (type: TAlertType, title?: string, message?: string) => void;

let globalToast: GlobalToastFn | null = null;

export const setGlobalToast = (fn: GlobalToastFn) => {
  globalToast = fn;
};

export const showGlobalToast = ({
  type,
  title,
  message,
}: {
  type: TAlertType;
  title?: string;
  message?: string;
}) => {
  if (globalToast) {
    globalToast(type, title, message);
  } else {
    console.warn('Toast chưa được khởi tạo — hãy wrap ToastProvider vào root App');
  }
};
