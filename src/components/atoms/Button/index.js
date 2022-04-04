import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';
import IconOnly from './IconOnly';
import BtnIconSend from './BtnIconSend';

const Button = ({type, title, onPress, icon, disable}) => {
  if (type === 'btn-icon-send') {
    return <BtnIconSend disable={disable} />;
  }
  if (type === 'icon-only') {
    return <IconOnly icon={icon} onPress={onPress} />;
  }
  return (
    <TouchableOpacity
      style={styles.container(type)}
      onPress={onPress}
      activeOpacity={disable ? 1 : 0.2}
      disabled={disable}>
      <Text style={styles.title(type)}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: type => ({
    backgroundColor:
      type === 'primary'
        ? colors.button.primary.background
        : type === 'secondary'
        ? colors.button.secondary.background
        : colors.button.disable.background,
    padding: 10,
    borderRadius: 10,
  }),
  title: type => ({
    color:
      type === 'primary'
        ? colors.button.primary.text
        : type === 'secondary'
        ? colors.button.secondary.text
        : colors.button.disable.text,
    fontSize: 18,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  }),
});
