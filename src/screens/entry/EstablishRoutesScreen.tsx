import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import { useCameraPermission } from '../../hooks/useCameraPermission';
import type { EntryScreenProps } from '../../types/navigation';

type Props = EntryScreenProps<'EstablishRoutes'>;

export default function EstablishRoutesScreen({ navigation, route }: Props) {
  const { warehouseQrCode } = route.params;
  const device = useCameraDevice('back');
  const { isGranted, requestPermission } = useCameraPermission();
  const [isScanning, setIsScanning] = useState(true);
  const lastScannedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isGranted) {
      requestPermission();
    }
  }, [isGranted, requestPermission]);

  const handleCodeScanned = useCallback(
    (codes: { value?: string }[]) => {
      if (!isScanning) { return; }
      const value = codes[0]?.value;
      if (!value || value === lastScannedRef.current) { return; }

      lastScannedRef.current = value;
      setIsScanning(false);
      Vibration.vibrate(100);

      navigation.navigate('ListDelivery', { warehouseQrCode });
    },
    [isScanning, navigation, warehouseQrCode],
  );

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: handleCodeScanned,
  });

  if (!isGranted) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>Cần quyền camera để quét mã sản phẩm</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Cấp quyền</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>Không tìm thấy camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isScanning}
        codeScanner={codeScanner}
      />
      <View style={styles.overlay}>
        <View style={styles.scanFrame} />
        <Text style={styles.hint}>Quét mã sản phẩm</Text>
      </View>
      {!isScanning && (
        <TouchableOpacity
          style={styles.rescanButton}
          onPress={() => {
            lastScannedRef.current = null;
            setIsScanning(true);
          }}>
          <Text style={styles.buttonText}>Quét lại</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 240,
    height: 240,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  hint: { color: '#fff', marginTop: 16, fontSize: 16 },
  message: { fontSize: 16, textAlign: 'center', marginBottom: 16 },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  rescanButton: {
    position: 'absolute',
    bottom: 48,
    alignSelf: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
