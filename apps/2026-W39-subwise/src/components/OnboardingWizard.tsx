import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, radius } from '../../constants/theme';
import { t } from '../i18n/strings';
import { TEMPLATES, Template } from '../lib/templates';

interface Props {
  onComplete: (selected: Template[]) => void;
}

export function OnboardingWizard({ onComplete }: Props) {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const toggle = (idx: number) => {
    const next = new Set(selected);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    setSelected(next);
  };

  const selectedTemplates = TEMPLATES.filter((_, i) => selected.has(i));

  if (step === 1) {
    return (
      <ScrollView style={[styles.container, { paddingTop: insets.top + spacing.xl }]} contentContainerStyle={styles.safeBottom}>
        <Text style={styles.stepLabel}>{t('onboarding.step1')}</Text>
        {TEMPLATES.map((tpl, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.templateRow, selected.has(i) && styles.selected]}
            onPress={() => toggle(i)}
          >
            <Text style={styles.tplIcon}>{tpl.icon}</Text>
            <Text style={styles.tplName}>{tpl.name}</Text>
            <Text style={styles.tplPrice}>{tpl.price} {tpl.currency}</Text>
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
      </ScrollView>
    );
  }

  if (step === 2) {
    return (
      <ScrollView style={[styles.container, { paddingTop: insets.top + spacing.xl }]} contentContainerStyle={styles.safeBottom}>
        <Text style={styles.stepLabel}>{t('onboarding.step2')}</Text>
        <Text style={styles.hint}>{t('onboarding.summary', { count: selected.size })}</Text>
        {selectedTemplates.map((tpl) => (
          <View key={tpl.name} style={styles.summaryRow}>
            <Text style={styles.tplIcon}>{tpl.icon}</Text>
            <Text style={styles.tplName}>{tpl.name}</Text>
            <Text style={styles.tplPrice}>{tpl.price} {tpl.currency}/mo</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.btn} onPress={() => setStep(3)}>
          <Text style={styles.btnText}>{t('onboarding.start')}</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // step 3
  return (
    <View style={[styles.container, { paddingTop: insets.top + spacing.xl }]}>
      <Text style={styles.stepLabel}>{t('onboarding.step3')}</Text>
      <Text style={styles.hint}>{t('onboarding.permissionHint')}</Text>
      <TouchableOpacity style={styles.btn} onPress={() => onComplete(selectedTemplates)}>
        <Text style={styles.btnText}>{t('onboarding.enableNotifications')}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onComplete(selectedTemplates)}>
        <Text style={styles.skip}>{t('onboarding.skip')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  safeBottom: { paddingBottom: spacing.xl },
  stepLabel: { fontSize: 24, fontWeight: '700', color: colors.text, marginBottom: spacing.lg },
  hint: { fontSize: 14, color: colors.textSecondary, marginBottom: spacing.lg },
  templateRow: {
    flexDirection: 'row', alignItems: 'center', padding: spacing.md,
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, marginBottom: spacing.sm,
  },
  selected: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  tplIcon: { fontSize: 22, marginRight: spacing.md },
  tplName: { flex: 1, fontSize: 16, color: colors.text },
  tplPrice: { fontSize: 13, color: colors.textSecondary, marginRight: spacing.sm },
  check: { fontSize: 18, color: colors.primary, fontWeight: '700' },
  summaryRow: {
    flexDirection: 'row', alignItems: 'center', padding: spacing.md,
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, marginBottom: spacing.sm,
    backgroundColor: colors.surface,
  },
  btn: {
    backgroundColor: colors.primary, padding: spacing.md, borderRadius: radius.md,
    alignItems: 'center', marginTop: spacing.lg,
  },
  btnDisabled: { opacity: 0.4 },
  btnText: { color: colors.white, fontSize: 16, fontWeight: '600' },
  skip: { textAlign: 'center', color: colors.textSecondary, marginTop: spacing.md, fontSize: 14 },
});