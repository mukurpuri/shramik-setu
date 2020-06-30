import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import { PersistGate } from 'redux-persist/es/integration/react'
import { Provider } from 'react-redux';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text,Button, Icon, IconRegistry } from '@ui-kitten/components';
import { default as theme } from './src/styles/theme.json'; // <-- Import app theme
import { default as mapping } from './src/config/mapping.json'; // <-- Import app mapping
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AppNavigator from './AppNavigator';

import useCachedResources from './hooks/useCachedResources';
import { store, persistor } from './src/redux/store/store';

export default function App(props) {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }} customMapping={mapping}>
            <AppNavigator/>
          </ApplicationProvider>
        </PersistGate>
      </Provider>
    );
  }
}
