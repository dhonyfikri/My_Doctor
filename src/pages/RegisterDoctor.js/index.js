import {createUserWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Gap, Input} from '../../components/atoms';
import {Header} from '../../components/molecules';
import {MyFirebase} from '../../config';
import {colors, showError, storeDataObject, useForm} from '../../utils';

const RegisterDoctor = ({navigation}) => {
  const dispatch = useDispatch();
  const [form, setForm] = useForm({
    fullName: '',
    profession: '',
    email: '',
    password: '',
  });
  const [disableButton, setDisableButton] = useState(true);

  const writeUserData = (userId, fullName, profession, email) => {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
      fullName: fullName,
      profession: profession,
      email: email,
    });
  };

  const formCheck = () => {
    if (
      form.fullName !== '' &&
      form.profession !== '' &&
      form.email !== '' &&
      form.password !== ''
    ) {
      if (disableButton) {
        setDisableButton(false);
      }
    } else {
      if (!disableButton) {
        setDisableButton(true);
      }
    }
  };

  const onContinue = () => {
    dispatch({type: 'SET_LOADING', value: true});
    // console.log(fullName, profession, email, password);
    // console.log(form);
    createUserWithEmailAndPassword(
      MyFirebase.authentication,
      form.email,
      form.password,
    )
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        // console.log(userCredential);
        dispatch({type: 'SET_LOADING', value: false});
        setForm('reset');
        // behind scene __ https://firebase.com/users/k124hvk124l2bt3
        writeUserData(
          userCredential.user.uid,
          form.fullName,
          form.profession,
          form.email,
        );
        const data = {
          fullName: form.fullName,
          profession: form.profession,
          email: form.email,
          uid: userCredential.user.uid,
        };
        storeDataObject('user', data)
          .then(() => {
            navigation.navigate('UploadPhoto');
          })
          .catch(error => {
            console.log('Failed store data, error: ', error.message);
          });
      })
      .catch(error => {
        const errorCode = error.code;
        console.log('error register: ', error, ' | error code: ', errorCode);
        dispatch({type: 'SET_LOADING', value: false});
        showError(error.message);
      });
  };

  useEffect(() => {
    formCheck();
  }, [form]);

  return (
    <View style={styles.page}>
      <Header
        title="Daftar Akun (Dokter)"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            label="Full Name"
            value={form.fullName}
            onChangeText={value => {
              setForm('fullName', value);
            }}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={form.profession}
            onChangeText={value => {
              setForm('profession', value);
            }}
          />
          <Gap height={24} />
          <Input
            label="Email"
            value={form.email}
            onChangeText={value => {
              setForm('email', value);
            }}
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={value => {
              setForm('password', value);
            }}
            secureTextEntry
          />
          <Gap height={40} />
          <Button
            type={!disableButton && 'primary'}
            title="Continue"
            onPress={onContinue}
            disable={disableButton}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default RegisterDoctor;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    padding: 40,
    paddingTop: 0,
  },
});
