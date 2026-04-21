import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { AuthScreenProps } from '../../types/navigation';

type Props = AuthScreenProps<'Login'>;

export default function LoginScreen(_props: Props) {
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
