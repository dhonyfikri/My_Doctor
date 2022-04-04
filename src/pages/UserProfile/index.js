import {useBackHandler} from '@react-native-community/hooks';
import {getAuth, signOut} from 'firebase/auth';
import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {ILNullPhoto} from '../../assets';
import {Button, Gap, Header, List, Profile} from '../../components';
import {colors, getDataObject, removeDataStorage, showError} from '../../utils';

const UserProfile = ({navigation, route}) => {
  const [userData, setUserData] = useState({
    fullName: 'User Name',
    profession: 'User Profession',
    photo: ILNullPhoto,
  });

  const signOutFromApp = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        removeDataStorage('user').then(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'GetStarted'}],
          });
        });
      })
      .catch(error => {
        showError('Ooppss... Something went wrong!');
      });
  };

  const getInitialData = () => {
    getDataObject('user').then(res => {
      if (res) {
        const data = res;
        data.photo = res.photo === undefined ? ILNullPhoto : {uri: res.photo};
        setUserData(data);
      }
    });
  };

  const customBack = () => {
    if (route.params?.onResume.message === 'UpdateProfile') {
      navigation.navigate('MainApp', {
        screen: 'Doctor',
        params: {onResume: {message: 'UserProfile'}},
      });
    } else {
      navigation.goBack();
    }
    return true;
  };

  // useBackHandler(() => {
  //   if (shouldBeHandledHere) {
  //     // handle it
  //     return true;
  //   }
  //   // let the default thing happen
  //   return false;
  // });
  useBackHandler(() => {
    return customBack();
  });

  useEffect(() => {
    if (route.params?.onResume) {
      console.log(
        'on resume update in User Profile from ',
        route.params?.onResume.message,
      );
      getInitialData();
    }
  }, [route.params?.onResume]);

  useEffect(() => {
    getInitialData();
  }, []);
  return (
    <View style={styles.page}>
      <Header title="Profile" onPress={customBack} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={10} />
        <Profile
          name={userData.fullName}
          desc={userData.profession}
          photo={userData.photo}
        />
        <Gap height={14} />
        <List
          name="Edit Profile"
          desc="Last Update Yesterday"
          type="chooser"
          icon="profile"
          onPress={() => navigation.navigate('UpdateProfile')}
        />
        <List
          name="Language"
          desc="Last Update Yesterday"
          type="chooser"
          icon="language"
        />
        <List
          name="Give Us Rate"
          desc="Last Update Yesterday"
          type="chooser"
          icon="rate"
        />
        <List
          name="Help Center"
          desc="Last Update Yesterday"
          type="chooser"
          icon="help"
        />
        <Gap height={20} />
        <View style={styles.buttonWrapper}>
          <Button
            type="primary"
            title="Sign Out"
            onPress={() => {
              Alert.alert('Confirmation', 'Do you want to sign out?', [
                {text: 'Cancel', onPress: null, style: 'cancel'},
                {text: 'Yes', onPress: () => signOutFromApp()},
              ]);
            }}
          />
        </View>
        <Gap height={20} />
      </ScrollView>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  buttonWrapper: {
    paddingHorizontal: 16,
  },
});
