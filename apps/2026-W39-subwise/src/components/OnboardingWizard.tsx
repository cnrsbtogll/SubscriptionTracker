import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../constants/theme';
import { t } from '../i18n/strings';

const TEMPLATES = [
  { name: 'Netflix', icon: '🎬', price: 9.99, currency: 'USD' as const },
  { name: 'Spotify', icon: '🎵', price: 5.99, currency: 'USD' as const },
  { name: 'YouTube Premium', icon: '▶️', price: 13.99, currency: 'USD' as const },
  { name: 'iCloud+', icon: '☁️', price: 0.99, currency: 'USD' as const },
  { name: 'PlayStation Plus', icon: '🎮', price: 9.99, currency: 'USD' as const },
  { name: 'Game Pass', icon: '🎯', price: 16.99, currency: 'USD' as const },
  { name: 'VPN', icon: '🔒', price: 3.99, currency: 'USD' as const },
];

interface Props {
  onComplete: (selected: typeof TEMPLATES) => void;
}

export function OnboardingWizard({ onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggle = (idx: number) => {
    const next = new Set(selected);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    setSelected(next);
  };

  if (step === 1) {
    return (
      <View style={styles.container}>
        <Text style={styles.stepLabel}>{t('onboarding.step1')}</Text>
        {TEMPLATES.map((tpl, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.templateRow, selected.has(i) && styles.selected]}
            onPress={() => toggle(i)}
          >
            <Text style={styles.tplIcon}>{tpl.icon}</Text>
            <Text style={styles.tplName}>{tpl.name}</Text>
            {selected.has(i) && <Text style={styles.check}>✓</Text>}
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          style={[styles.btn, selected.size === 0 && styles.btnDisabled]}
          onPress={() => setStep(2)}
          disabled={selected.size === 0}
        >
          <Text style={styles.btnText}>{t('onboarding.start')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (step === 2) {
    return (
      <View style={styles.container}>
        <Text style={styles.stepLabel}>{t('onboarding.step2')}</Text>
        <Text style={styles.hint}>Tutarlar varsayılan olarak bırakıldı. Bunu sonradan ayarlayabilirsin.</Text>
        <TouchableOpacity style={styles.btn} onPress={() => setStep(3)}>
          <Text style={styles.btnText}>{t('onboarding.start')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // step 3
  return (
    <View style={styles.container}>
      <Text style={styles.stepLabel}>{t('onboarding.step3')}</Text>
      <Text style={styles.hint}>Yenileme hatırlatıcıları için bildirim izni gerekir.</Text>
      <TouchableOpacity style={styles.btn} onPress={() => onComplete(TEMPLATES.filter((_, i) => selected.has(i)))}>
        <Text style={styles.btnText}>{t('onboarding.done')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onComplete(TEMPLATES.filter((_, i) => selected.has(i)))}>
        <Text style={styles.skip}>{t('onboarding.skip')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg, paddingTop: spacing.xl },
  stepLabel: { fontSize: 24, fontWeight: '700', color: colors.text, marginBottom: spacing.lg },
  hint: { fontSize: 14, color: colors.textSecondary, marginBottom: spacing.lg },
  templateRow: {
    flexDirection: 'row', alignItems: 'center', padding: spacing.md,
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, marginBottom: spacing.sm,
  },
  selected: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  tplIcon: { fontSize: 22, marginRight: spacing.md },
  tplName: { flex: 1, fontSize: 16, color: colors.text },
  check: { fontSize: 18, color: colors.primary, fontWeight: '700' },
  btn: {
    backgroundColor: colors.primary, padding: spacing.md, borderRadius: radius.md,
    alignItems: 'center', marginTop: spacing.lg,
  },
  btnDisabled: { opacity: 0.4 },
  btnText: { color: colors.white, fontSize: 16, fontWeight: '600' },
  skip: { textAlign: 'center', color: colors.textSecondary, marginTop: spacing.md, fontSize: 14 },
});
