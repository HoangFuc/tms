import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { AuthScreenProps } from '../../types/navigation';

// Fields: userName, phoneNumber, validateCode

type Props = AuthScreenProps<'ForgotPassword'>;

export default function ForgotPasswordScreen(_props: Props) {
  return (
    <View style={styles.container}>
      <Text>Forgot Password Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
