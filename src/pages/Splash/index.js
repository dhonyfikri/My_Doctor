import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {ILLogo} from '../../assets/illustration';
import {colors, fonts} from '../../utils';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {StackActions} from '@react-navigation/native';

const Splash = ({navigation}) => {
  let authObserver = null;

  useEffect(() => {
    return () => {
      if (authObserver !== null) {
        authObserver();
      }
    };
  });

  useEffect(() => {
    setTimeout(() => {
      authObserver = onAuthStateChanged(getAuth(), user => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          navigation.reset({
            index: 0,
            routes: [{name: 'MainApp'}],
          });
          // ...
        } else {
          // User is signed out
          // ...
          navigation.replace('GetStarted');
        }
      });
    }, 3000);
  }, []);
  return (
    <View style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>My Doctor</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 20,
  },
});
