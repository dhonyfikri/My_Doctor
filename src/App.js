import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {Provider, useSelector} from 'react-redux';
import {Loading} from './components';
import store from './redux/store';
import Router from './router';
import {colors} from './utils';

const MainApplication = () => {
  const stateGlobal = useSelector(state => state);
  return (
    <>
      <NavigationContainer>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.secondary}
        />
        <Router />
      </NavigationContainer>
      <FlashMessage position="top" />
      {stateGlobal.loading && <Loading />}
      {stateGlobal.basicLoading && <Loading type="basic" />}
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApplication />
    </Provider>
  );
};

export default App;
