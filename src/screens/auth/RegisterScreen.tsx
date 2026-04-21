import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { AuthScreenProps } from '../../types/navigation';

// Required: phone, password, name, address, email, residentNumber,
//           vehicleNumber, vehicleType, tonnage, vehiclePicture, privacyPolicy
// Optional: avatar, phone2, birthday

type Props = AuthScreenProps<'Register'>;

export default function RegisterScreen(_props: Props) {
  return (
    <View style={styles.container}>
      <Text>Register Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
