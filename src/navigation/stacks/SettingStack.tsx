import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { SettingStackParamList } from '../../types/navigation';

import SettingScreen from '../../screens/setting/SettingScreen';
import ChangeInfoScreen from '../../screens/setting/ChangeInfoScreen';

const Stack = createNativeStackNavigator<SettingStackParamList>();

export default function SettingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ title: 'Cài đặt' }}
      />
      <Stack.Screen
        name="ChangeInfo"
        component={ChangeInfoScreen}
        options={{ title: 'Cập nhật thông tin' }}
      />
    </Stack.Navigator>
  );
}
