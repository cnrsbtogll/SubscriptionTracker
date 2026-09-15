import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../constants/theme';
import { t } from '../i18n/strings';

interface Props {
  onDismiss: () => void;
}

export function PaywallSheet({ onDismiss }: Props) {
  return (
    <View style={styles.overlay}>
      <View style={styles.sheet}>
        <Text style={styles.icon}>🔒</Text>
        <Text style={styles.title}>{t('form.paywallTitle')}</Text>
        <Text style={styles.message}>{t('form.paywallMessage')}</Text>
        <TouchableOpacity style={styles.btn} onPress={onDismiss}>
          <Text style={styles.btnText}>{t('common.cancel')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.xl,
    alignItems: 'center',
  },
  icon: { fontSize: 48, marginBottom: spacing.md },
  title: { fontSize: 20, fontWeight: '700', color: colors.text, marginBottom: spacing.sm },
  message: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginBottom: spacing.lg },
  btn: {
    backgroundColor: colors.primary, paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl, borderRadius: radius.md, width: '100%', alignItems: 'center',
  },
  btnText: { color: colors.white, fontSize: 16, fontWeight: '600' },
});
