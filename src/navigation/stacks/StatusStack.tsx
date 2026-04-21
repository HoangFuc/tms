import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { StatusStackParamList } from '../../types/navigation';

import StatusScreen from '../../screens/status/StatusScreen';
import FilterStatusScreen from '../../screens/status/FilterStatusScreen';

const Stack = createNativeStackNavigator<StatusStackParamList>();

export default function StatusStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Status"
        component={StatusScreen}
        options={{ title: 'Trạng thái' }}
      />
      <Stack.Screen
        name="FilterStatus"
        component={FilterStatusScreen}
        options={{ title: 'Lọc theo ngày' }}
      />
    </Stack.Navigator>
  );
}
