import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';
import BasicLoading from './BasicLoading';

const Loading = ({type}) => {
  if (type === 'basic') {
    return <BasicLoading />;
  }
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.loadingBackground,
  },
  container: {
    width: 200,
    height: 150,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    color: colors.primary,
  },
});
