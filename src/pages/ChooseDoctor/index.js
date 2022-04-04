import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  DummyDoctor1,
  DummyDoctor2,
  DummyDoctor3,
  DummyDoctor4,
  DummyDoctor5,
} from '../../assets';
import {colors, fonts} from '../../utils';
import {Header, List} from '../../components';

const ChooseDoctor = ({navigation}) => {
  return (
    <View style={styles.page}>
      <Header
        title="Pilih Dokter Anak"
        type="dark"
        onPress={() => navigation.goBack()}
      />
      <List
        profile={DummyDoctor1}
        name="Alexander Jannie"
        desc="__"
        type="chooser"
        onPress={() => navigation.navigate('Chatting')}
      />
      <List
        profile={DummyDoctor3}
        name="John McParker Steve"
        desc="Pria"
        type="chooser"
        onPress={() => navigation.navigate('Chatting')}
      />
      <List
        profile={DummyDoctor4}
        name="Nairobi Putri Hayza"
        desc="Wanita"
        type="chooser"
        onPress={() => navigation.navigate('Chatting')}
      />
      <List
        profile={DummyDoctor5}
        name="James Rivillia"
        desc="Pria"
        type="chooser"
        onPress={() => navigation.navigate('Chatting')}
      />
      <List
        profile={DummyDoctor2}
        name="Liu Yue Tian Park"
        desc="Wanita"
        type="chooser"
        onPress={() => navigation.navigate('Chatting')}
      />
    </View>
  );
};

export default ChooseDoctor;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginHorizontal: 16,
  },
});
