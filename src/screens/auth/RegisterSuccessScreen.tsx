import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { AuthScreenProps } from '../../types/navigation';

type Props = AuthScreenProps<'RegisterSuccess'>;

export default function RegisterSuccessScreen(_props: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký thành công!</Text>
      <Text style={styles.sub}>Tài khoản đang chờ xác thực (trong vòng 24h)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 8 },
  sub: { fontSize: 15, color: '#666', textAlign: 'center' },
});
