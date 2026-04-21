import { useEffect, useState, useCallback } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  type PermissionStatus,
} from 'react-native-permissions';

type CameraPermissionState = 'undetermined' | 'granted' | 'denied' | 'blocked';

const CAMERA_PERMISSION =
  Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;

export function useCameraPermission() {
  const [status, setStatus] = useState<CameraPermissionState>('undetermined');

  const checkPermission = useCallback(async () => {
    const result: PermissionStatus = await check(CAMERA_PERMISSION);
    switch (result) {
      case RESULTS.GRANTED:
        setStatus('granted');
        break;
      case RESULTS.DENIED:
        setStatus('denied');
        break;
      case RESULTS.BLOCKED:
      case RESULTS.UNAVAILABLE:
        setStatus('blocked');
        break;
      default:
        setStatus('undetermined');
    }
    return result;
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    const current = await check(CAMERA_PERMISSION);

    if (current === RESULTS.GRANTED) {
      setStatus('granted');
      return true;
    }

    if (current === RESULTS.BLOCKED) {
      Alert.alert(
        'Cần quyền Camera',
        'Ứng dụng cần quyền truy cập camera để quét mã QR. Vui lòng bật trong Cài đặt.',
        [
          { text: 'Hủy', style: 'cancel' },
          { text: 'Mở Cài đặt', onPress: () => Linking.openSettings() },
        ],
      );
      setStatus('blocked');
      return false;
    }

    const result = await request(CAMERA_PERMISSION);
    const granted = result === RESULTS.GRANTED;
    setStatus(granted ? 'granted' : 'denied');
    return granted;
  }, []);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return {
    status,
    isGranted: status === 'granted',
    checkPermission,
    requestPermission,
  };
}
