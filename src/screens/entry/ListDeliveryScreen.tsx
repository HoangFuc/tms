import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { EntryScreenProps } from '../../types/navigation';

type Props = EntryScreenProps<'ListDelivery'>;

export default function ListDeliveryScreen({ route }: Props) {
  const { warehouseQrCode } = route.params;
  return (
    <View style={styles.container}>
      <Text>Kho: {warehouseQrCode}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
