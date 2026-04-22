import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import {ToastProvider} from './src/providers/ToastProvider';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <RootNavigator />
      </ToastProvider>
    </SafeAreaProvider>
  );
}
