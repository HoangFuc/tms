import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RouteStackParamList } from '../../types/navigation';

import RouteScreen from '../../screens/route/RouteScreen';
import RouteDetailScreen from '../../screens/route/RouteDetailScreen';

const Stack = createNativeStackNavigator<RouteStackParamList>();

export default function RouteStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Route"
        component={RouteScreen}
        options={{ title: 'Tuyến đường' }}
      />
      <Stack.Screen
        name="RouteDetail"
        component={RouteDetailScreen}
        options={{ title: 'Chi tiết tuyến' }}
      />
    </Stack.Navigator>
  );
}
