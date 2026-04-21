import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { EntryStackParamList } from '../../types/navigation';

import EntryScreen from '../../screens/entry/EntryScreen';
import EstablishRoutesScreen from '../../screens/entry/EstablishRoutesScreen';
import ListDeliveryScreen from '../../screens/entry/ListDeliveryScreen';

const Stack = createNativeStackNavigator<EntryStackParamList>();

export default function EntryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Entry"
        component={EntryScreen}
        options={{ title: 'Nhập kho' }}
      />
      <Stack.Screen
        name="EstablishRoutes"
        component={EstablishRoutesScreen}
        options={{ title: 'Thiết lập tuyến đường' }}
      />
      <Stack.Screen
        name="ListDelivery"
        component={ListDeliveryScreen}
        options={{ title: 'Danh sách giao hàng' }}
      />
    </Stack.Navigator>
  );
}
