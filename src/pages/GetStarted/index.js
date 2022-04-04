import React, {useState, useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ILGetStarted, ILLogo} from '../../assets/illustration';
import {RoleChooserModal} from '../../components';
import {Button, Gap} from '../../components/atoms';
import {colors, fonts} from '../../utils';

const GetStarted = ({navigation}) => {
  const [toDo, setToDo] = useState({
    role: {type: ''},
    nextPage: '',
  });
  const [openDialog, setOpenDialog] = useState(false);

  const onContinue = () => {
    setOpenDialog(false);
    if (toDo.nextPage === 'Register') {
      if (toDo.role.type === 'user') {
        navigation.navigate('Register');
      } else if (toDo.role.type === 'doctor') {
        navigation.navigate('RegisterDoctor'); // khusus dokter
      }
    } else {
      navigation.navigate(toDo.nextPage, {role: toDo.role.type});
    }
  };

  useEffect(() => {
    if (toDo.role.type.length > 0 && toDo.nextPage.length > 0) {
      onContinue();
    }
  }, [toDo.role]);

  return (
    <>
      <ImageBackground source={ILGetStarted} style={styles.page}>
        <View>
          <ILLogo />
          <Text style={styles.title}>
            Konsultasi dengan dokter jadi lebih mudah & fleksibel
          </Text>
        </View>
        <View>
          <Button
            title="Get Started"
            type="primary"
            onPress={() => {
              setToDo({...toDo, nextPage: 'Register'});
              setOpenDialog(true);
            }}
          />
          <Gap height={16} />
          <Button
            title="Sign In"
            type="secondary"
            onPress={() => {
              setToDo({...toDo, nextPage: 'Login'});
              setOpenDialog(true);
              // navigation.replace('Login'); // ini akan menimpa screen sekarang
              // navigation.dispatch(StackActions.replace('Login')); // ini juga sama hanya akan menimpa screen sekarang

              // cara ini bisa menghapus semua stack navigation sebelumnya.
              // navigation.reset({
              //   index: 0,
              //   routes: [{name: 'Login'}],
              // });

              // cara ini bisa menghapus semua stack navigation sebelumnya dan dengan parameter.
              // navigation.reset({
              //   index: 0,
              //   routes: [{name: 'Login', params: {nama: 'dhony'}}],
              // });
            }}
          />
        </View>
      </ImageBackground>
      {openDialog && (
        <RoleChooserModal
          actionType={toDo.nextPage}
          userButtonAction={() => {
            setToDo({...toDo, role: {type: 'user'}});
          }}
          doctorButtonAction={() => {
            setToDo({...toDo, role: {type: 'doctor'}});
          }}
          onOffsetPress={() => {
            setOpenDialog(false);
          }}
        />
      )}
    </>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    fontSize: 28,
    color: colors.white,
    marginTop: 91,
    fontFamily: fonts.primary[600],
  },
});
