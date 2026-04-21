import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { MainTabParamList } from '../types/navigation';

import EntryStack from './stacks/EntryStack';
import RouteStack from './stacks/RouteStack';
import StatusStack from './stacks/StatusStack';
import SettingStack from './stacks/SettingStack';
import AssignmentListScreen from '../screens/AssignmentListScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}>
      <Tab.Screen
        name="EntryTab"
        component={EntryStack}
        options={{ title: 'Nhập kho', tabBarLabel: 'Nhập kho' }}
      />
      <Tab.Screen
        name="RouteTab"
        component={RouteStack}
        options={{ title: 'Tuyến đường', tabBarLabel: 'Tuyến đường' }}
      />
      <Tab.Screen
        name="AssignmentList"
        component={AssignmentListScreen}
        options={{ title: 'Phân công', tabBarLabel: 'Phân công', headerShown: true }}
      />
      <Tab.Screen
        name="StatusTab"
        component={StatusStack}
        options={{ title: 'Trạng thái', tabBarLabel: 'Trạng thái' }}
      />
      <Tab.Screen
        name="SettingTab"
        component={SettingStack}
        options={{ title: 'Cài đặt', tabBarLabel: 'Cài đặt' }}
      />
    </Tab.Navigator>
  );
}
