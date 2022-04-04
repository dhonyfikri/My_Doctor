import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DummyUser, ILNullPhoto} from '../../../assets';
import React, {useState, useEffect} from 'react';
import {colors, fonts, getDataObject} from '../../../utils';

const HomeProfile = ({onPress, reRender}) => {
  const [dataUser, setDataUser] = useState({
    fullName: 'User Name',
    profession: 'User Profession',
    photo: ILNullPhoto,
  });

  const getInitialData = () => {
    getDataObject('user').then(res => {
      if (res) {
        const data = res;
        data.photo = res.photo === undefined ? ILNullPhoto : {uri: res.photo};
        setDataUser(data);
      }
    });
  };

  useEffect(() => {
    console.log('get user storage');
    getInitialData();
  }, [reRender]);
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={dataUser.photo} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{dataUser.fullName}</Text>
        <Text style={styles.profession}>{dataUser.profession}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeProfile;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textTransform: 'capitalize',
  },
  profession: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    textTransform: 'capitalize',
  },
});
