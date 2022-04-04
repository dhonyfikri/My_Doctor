import {getDatabase, ref, update} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {IconAddPhoto, IconRemovePhoto} from '../../assets';
import {ILNullPhoto} from '../../assets/illustration';
import {Button, Gap, Link} from '../../components/atoms';
import Header from '../../components/molecules/Header';
import {
  colors,
  fonts,
  getDataObject,
  showWarning,
  storeDataObject,
} from '../../utils';

const UploadPhoto = ({navigation}) => {
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [dataUser, setDataUser] = useState({
    fullName: 'User Name',
    profession: 'User Profession',
    email: '',
    uid: '',
  });
  const [photoForDB, setPhotoForDB] = useState('');

  const updateUserPhoto = (userId, photo) => {
    const db = getDatabase();
    return update(ref(db, 'users/' + userId + '/'), {
      photo: photo,
    });
  };

  const updateAndContinue = () => {
    dispatch({type: 'SET_LOADING', value: true});
    updateUserPhoto(dataUser.uid, photoForDB)
      .then(() => {
        storeDataObject('user', {...dataUser, photo: photoForDB}).then(() => {
          dispatch({type: 'SET_LOADING', value: false});
          navigation.reset({
            index: 0,
            routes: [{name: 'MainApp'}],
          });
        });
      })
      .catch(error => {
        console.log(error);
        dispatch({type: 'SET_LOADING', value: false});
      });
  };

  const getImageFromGallery = () => {
    launchImageLibrary(
      {includeBase64: true, quality: 0.5, maxHeight: 200, maxWidth: 200},
      response => {
        // console.log('Response: ', response.assets[0].uri);
        // console.log('Response: ', response);
        if (!response.didCancel) {
          setPhoto({uri: response.assets[0].uri});
          const data = response.assets[0];
          setPhotoForDB(`data:${data.type};base64, ${data.base64}`);
        } else {
          showWarning('Ooppss, sepertinya anda tidak jadi memilih foto.');
        }
      },
    );
  };
  const deletePhoto = () => {
    setPhoto(ILNullPhoto);
    setPhotoForDB('');
  };
  useEffect(() => {
    getDataObject('user').then(res => {
      setDataUser(res);
    });
  }, []);
  return (
    <View style={styles.page}>
      <Header title="Upload Photo" onPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity
            style={styles.avatarWrapper}
            onPress={photoForDB !== '' ? deletePhoto : getImageFromGallery}>
            <Image source={photo} style={styles.avatar} />
            {photoForDB !== '' ? (
              <IconRemovePhoto style={styles.addPhoto} />
            ) : (
              <IconAddPhoto style={styles.addPhoto} />
            )}
          </TouchableOpacity>
          <Text style={styles.name}>{dataUser.fullName}</Text>
          <Text style={styles.profession}>{dataUser.profession}</Text>
        </View>
        <View>
          <Button
            title="Upload and Continue"
            disable={photoForDB === ''}
            type={photoForDB !== '' && 'primary'}
            onPress={
              photoForDB !== ''
                ? () => {
                    updateAndContinue();
                  }
                : null
            }
          />
          <Gap height={30} />
          <Link
            title="Skip for this"
            align="center"
            size={16}
            onPress={() => {
              if (dataUser.uid !== '') {
                storeDataObject('user', dataUser).then(
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'MainApp'}],
                  }),
                );
              }
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    paddingHorizontal: 40,
    paddingBottom: 40,
    flex: 1,
    justifyContent: 'space-between',
  },
  profile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 110 / 2,
  },
  avatarWrapper: {
    width: 130,
    height: 130,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhoto: {
    position: 'absolute',
    bottom: 8,
    right: 6,
  },
  name: {
    fontSize: 24,
    color: colors.text.primary,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  profession: {
    fontSize: 18,
    color: colors.text.secondary,
    fontFamily: fonts.primary.normal,
    textAlign: 'center',
  },
});
