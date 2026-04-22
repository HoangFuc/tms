import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {StyleSheet} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import AppAlert, {TAlertType} from '../components/toast/AppAlert';
import {setGlobalToast} from '../utils/toastDispatcher';

//---------------------------------------
interface IToastState {
  type: TAlertType;
  title?: string;
  message?: string;
}

interface IToastContext {
  showToast: (params: IToastState) => void;
}

export const ToastContext = createContext<IToastContext>({showToast: () => {}});

//---------------------------------------
export const ToastProvider = ({children}: {children: React.ReactNode}) => {
  const [toast, setToast] = useState<IToastState | null>(null);

  const anim = useRef({
    opacity:    useSharedValue(0),
    translateY: useSharedValue(-20),
  }).current;

  const insets = useSafeAreaInsets();

  //---------------------------------------
  const showToast = useCallback(({type, title, message}: IToastState) => {
    setToast({type, title, message});
  }, []);

  // Đăng ký cho toastDispatcher (gọi được từ ngoài React)
  useEffect(() => {
    setGlobalToast((type, title, message) => showToast({type, title, message}));
  }, [showToast]);

  // fade-in → hiện 3s → fade-out → clear
  useEffect(() => {
    if (!toast) return;

    anim.opacity.value    = withTiming(1,   {duration: 250});
    anim.translateY.value = withTiming(0,   {duration: 250});

    const timer = setTimeout(() => {
      anim.opacity.value    = withTiming(0,   {duration: 250});
      anim.translateY.value = withTiming(-20, {duration: 250});
      setTimeout(() => setToast(null), 250);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast, anim]);

  //---------------------------------------
  const animatedStyle = useAnimatedStyle(() => ({
    opacity:   anim.opacity.value,
    transform: [{translateY: anim.translateY.value}],
  }));

  return (
    <ToastContext.Provider value={{showToast}}>
      {children}

      {toast && (
        <Animated.View style={[styles.toastWrapper, animatedStyle, {top: insets.top + 8}]}>
          <AppAlert type={toast.type} title={toast.title} message={toast.message} />
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

//---------------------------------------
const styles = StyleSheet.create({
  toastWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 999,
  },
});
