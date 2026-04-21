import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AssignmentListScreen() {
  return (
    <View style={styles.container}>
      <Text>Assignment List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
