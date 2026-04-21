import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RouteStackParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<RouteStackParamList, 'RouteDetail'>;

export default function RouteDetailScreen({ route }: Props) {
  return (
    <View style={styles.container}>
      <Text>Route: {route.params.routeId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
