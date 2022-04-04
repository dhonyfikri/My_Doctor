import {signInWithEmailAndPassword} from 'firebase/auth';
import {child, get, getDatabase, ref} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {ILLogo} from '../../assets/illustration';
import {Button, Gap, Input, Link} from '../../components/atoms';
import {MyFirebase} from '../../config';
import {
  colors,
  fonts,
  showError,
  showSuccess,
  showWarning,
  storeDataObject,
  useForm,
} from '../../utils';

const Login = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [disableButton, setDisableButton] = useState(true);
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });
  const formCheck = () => {
    if (form.email !== '' && form.password !== '') {
      if (disableButton) {
        setDisableButton(false);
      }
    } else {
      if (!disableButton) {
        setDisableButton(true);
      }
    }
  };
  const login = () => {
    dispatch({type: 'SET_LOADING', value: true});
    signInWithEmailAndPassword(
      MyFirebase.authentication,
      form.email,
      form.password,
    )
      .then(userCredential => {
        const user = userCredential.user;
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${user.uid}`))
          .then(snapshot => {
            if (snapshot.exists()) {
              showSuccess('Login Success');
              storeDataObject('user', {...snapshot.val(), uid: user.uid}).then(
                () => {
                  setForm('reset');
                  dispatch({type: 'SET_LOADING', value: false});
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'MainApp'}],
                  });
                },
              );
            } else {
              console.log('No data available');
              showWarning('User data not available');
              dispatch({type: 'SET_LOADING', value: false});
            }
          })
          .catch(error => {
            console.error(error);
            showWarning(error.message);
            dispatch({type: 'SET_LOADING', value: false});
          });
      })
      .catch(error => {
        console.log('error login: ', `${error}`);
        showError(error.message);
        dispatch({type: 'SET_LOADING', value: false});
      });
  };
  useEffect(() => {
    formCheck();
  }, [form]);
  return (
    <ScrollView style={styles.page}>
      <ILLogo />
      <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
      <Input
        label="Email Address"
        value={form.email}
        onChangeText={value => setForm('email', value)}
      />
      <Gap height={24} />
      <Input
        label="Password"
        secureTextEntry
        value={form.password}
        onChangeText={value => setForm('password', value)}
      />
      <Gap height={12} />
      <Link title="Forgot My Password" size={12} />
      <Gap height={40} />
      <Button
        title="Sign In"
        onPress={login}
        type={!disableButton && 'primary'}
        disable={disableButton}
      />
      <Gap height={30} />
      <Link
        title="Create New Account"
        size={16}
        align="center"
        onPress={() => {
          if (route.params.role === 'user') {
            navigation.navigate('Register');
          } else if (route.params.role === 'doctor') {
            navigation.navigate('RegisterDoctor');
          }
        }}
      />
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginVertical: 40,
    maxWidth: 153,
  },
});
