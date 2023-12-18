import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store from './src/redux/store';
import AppNavigation from './src/navigation';

export default function App() {
  const [role, setRole] = useState('Company');
  return (
    <Provider store={store} >
        <GestureHandlerRootView style ={{flex:1}} >
          <AppNavigation />
        </GestureHandlerRootView>
    </Provider>
  );
}
