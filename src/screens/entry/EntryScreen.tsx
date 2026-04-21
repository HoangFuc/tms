import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { EntryScreenProps } from '../../types/navigation';
import { useCameraPermission } from '../../hooks/useCameraPermission';

type Props = EntryScreenProps<'Entry'>;

export default function EntryScreen({ navigation }: Props) {
  const { isGranted, requestPermission } = useCameraPermission();

  const handleScanWarehouse = async () => {
    const granted = isGranted || (await requestPermission());
    if (!granted) return;
    navigation.navigate('EstablishRoutes', { warehouseQrCode: 'WAREHOUSE_001' });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleScanWarehouse}>
        <Text style={styles.buttonText}>Quét QR Kho hàng</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 10,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
