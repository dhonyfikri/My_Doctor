import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  ILDokterAnak,
  ILDokterObat,
  ILDokterUmum,
  ILPsikiater,
} from '../../../assets';
import {colors, fonts} from '../../../utils';

const DoctorCategory = ({category, onPress}) => {
  const Icon = () => {
    if (category.toLowerCase() === 'dokter umum') {
      return <ILDokterUmum style={styles.illustration} />;
    }
    if (category.toLowerCase() === 'psikiater') {
      return <ILPsikiater style={styles.illustration} />;
    }
    if (category.toLowerCase() === 'dokter obat') {
      return <ILDokterObat style={styles.illustration} />;
    }
    if (category.toLowerCase() === 'dokter anak') {
      return <ILDokterAnak style={styles.illustration} />;
    }
    return <ILDokterUmum style={styles.illustration} />;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Icon />
      <Text style={styles.label}>Saya butuh</Text>
      <Text style={styles.category}>{category}</Text>
    </TouchableOpacity>
  );
};

export default DoctorCategory;

const styles = StyleSheet.create({
  container: {
    width: 110,
    height: 130,
    padding: 12,
    backgroundColor: colors.cardLight,
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginRight: 10,
  },
  illustration: {
    marginBottom: 28,
  },
  label: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.primary,
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
  },
});
