import {signInWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, remove, update} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {ILNullPhoto} from '../../assets';
import {Button, Gap, Header, Input, Profile} from '../../components';
import {MyFirebase} from '../../config';
import {
  colors,
  getDataObject,
  showError,
  showSuccess,
  showWarning,
  storeDataObject,
} from '../../utils';

const UpdateProfile = ({navigation}) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    fullName: 'User Name',
    profession: 'User Profession',
    email: '',
    photo: ILNullPhoto,
    uid: '',
  });
  const [disableButton, setDisableButton] = useState(true);
  const [password, setPassword] = useState('');

  const updateUserProfile = () => {
    const data = {...userData};
    if (userData.photo === ILNullPhoto) {
      delete data.photo;
    } else {
      data.photo = userData.photo.uri;
    }

    const dataToUpload = {...data};
    delete dataToUpload.uid;
    const db = getDatabase();
    update(ref(db, 'users/' + userData.uid + '/'), dataToUpload).then(() => {
      if (dataToUpload.photo === undefined) {
        remove(ref(db, 'users/' + userData.uid + '/photo/')).then(
          dispatch({type: 'SET_LOADING', value: false}),
        );
      } else {
        dispatch({type: 'SET_LOADING', value: false});
      }
      storeDataObject('user', data).then(() => {
        showSuccess('Update profile success');
        // navigation.reset({
        //   index: 0,
        //   routes: [{name: 'MainApp'}],
        // });
        navigation.navigate('UserProfile', {
          onResume: {message: 'UpdateProfile'},
        });
      });
    });
  };

  const userAuthToUpdate = () => {
    dispatch({type: 'SET_LOADING', value: true});
    signInWithEmailAndPassword(
      MyFirebase.authentication,
      userData.email,
      password,
    )
      .then(userCredential => {
        const user = userCredential.user;
        updateUserProfile();
      })
      .catch(error => {
        console.log('error login: ', `${error}`);
        showError(error.message);
        dispatch({type: 'SET_LOADING', value: false});
      });
  };

  const selectOrDeletePhoto = () => {
    if (userData.photo === ILNullPhoto) {
      launchImageLibrary(
        {includeBase64: true, quality: 0.5, maxHeight: 200, maxWidth: 200},
        response => {
          if (!response.didCancel) {
            const data = response.assets[0];
            setUserData({
              ...userData,
              photo: {uri: `data:${data.type};base64, ${data.base64}`},
            });
          } else {
            showWarning('Ooppss, sepertinya anda tidak jadi memilih foto.');
          }
        },
      );
    } else {
      setUserData({...userData, photo: ILNullPhoto});
    }
  };

  const formCheck = () => {
    if (
      userData.fullName !== '' &&
      userData.profession !== '' &&
      userData.email !== '' &&
      password !== ''
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

  useEffect(() => {
    getDataObject('user').then(res => {
      const data = res;
      data.photo = res.photo !== undefined ? {uri: res.photo} : ILNullPhoto;
      setUserData(data);
    });
  }, []);

  useEffect(() => {
    formCheck();
  }, [userData, password]);

  return (
    <View style={styles.page}>
      <Header title="Update Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Profile
            photo={userData.photo}
            isRemove={userData.photo !== ILNullPhoto}
            editable
            onPress={selectOrDeletePhoto}
          />
          <Gap height={26} />
          <Input
            label="Full Name"
            value={userData.fullName}
            onChangeText={val => setUserData({...userData, fullName: val})}
          />
          <Gap height={24} />
          <Input
            label="Pekerjaan"
            value={userData.profession}
            onChangeText={val => setUserData({...userData, profession: val})}
          />
          <Gap height={24} />
          <Input label="Email Address" value={userData.email} disable />
          <Gap height={24} />
          <Input
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={val => setPassword(val)}
          />
          <Gap height={40} />
          <Button
            title="Save Profile"
            type={!disableButton && 'primary'}
            onPress={userAuthToUpdate}
            disable={disableButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

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
