import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {colors} from '../../../utils';

const BasicLoading = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};

export default BasicLoading;

const styles = StyleSheet.create({
  wrapper: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 30,
    left: Dimensions.get('window').width / 2 - 20,
  },
});
