import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';
import {Button, Gap} from '../../atoms';

const RoleChooserModal = ({
  actionType,
  doctorButtonAction,
  userButtonAction,
  onOffsetPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.wrapper}
      activeOpacity={1}
      onPress={onOffsetPress}>
      <View style={styles.container}>
        <Text style={styles.text}>
          <Text style={{textTransform: 'capitalize'}}>{actionType}</Text>{' '}
          sebagai?
        </Text>
        <Gap height={20} />
        <View style={styles.buttonWrapper}>
          <View style={{flex: 1}}>
            <Button
              type="primary"
              title="Dokter"
              onPress={doctorButtonAction}
            />
          </View>
          <Gap width={15} />
          <View style={{flex: 1}}>
            <Button type="primary" title="User" onPress={userButtonAction} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RoleChooserModal;

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
    width: 280,
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonWrapper: {
    width: '100%',
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
});
