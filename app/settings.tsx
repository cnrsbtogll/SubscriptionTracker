import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Share } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSubscriptions } from '../src/state/useSubscriptions';
import { t, getLanguage, setLanguage, getLanguages, Language } from '../src/i18n/strings';
import { generateCSV } from '../src/lib/csv';
import { colors, spacing, radius } from '../constants/theme';

const LANG_LABELS: Record<Language, string> = {
  en: '🇬🇧 English',
  tr: '🇹🇷 Türkçe',
  de: '🇩🇪 Deutsch',
  fr: '🇫🇷 Français',
  es: '🇪🇸 Español',
  ar: '🇸🇦 العربية',
};

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const subs = useSubscriptions((s) => s.subs);
  const [lang, setLang] = useState<Language>(getLanguage());

  const selectLang = (l: Language) => {
    setLang(l);
    setLanguage(l);
  };

  const exportCSV = async () => {
    const csv = generateCSV(subs);
    await Share.share({ message: csv, title: 'abonelikler.csv' });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: insets.bottom + spacing.xl }}
    >
      <Text style={styles.title}>{t('settings.title')}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionLabel}>{t('settings.language')}</Text>
        <View style={styles.langGrid}>
          {getLanguages().map((l) => (
            <TouchableOpacity
              key={l}
              style={[styles.langChip, lang === l && styles.langChipActive]}
              onPress={() => selectLang(l)}
            >
              <Text style={[styles.langChipText, lang === l && styles.langChipTextActive]}>
                {LANG_LABELS[l]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>{t('settings.export')}</Text>
          <TouchableOpacity style={styles.chip} onPress={exportCSV}>
            <Text style={styles.chipText}>CSV</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.rowLabel}>{t('settings.privacy')}</Text>
        <Text style={styles.privacyText}>{t('settings.privacyText')}</Text>
      </View>

      <Text style={styles.version}>{t('settings.version', { version: '1.0.0' })}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  title: { fontSize: 24, fontWeight: '700', color: colors.text, marginBottom: spacing.lg, marginTop: spacing.sm },
  section: { marginBottom: spacing.lg },
  sectionLabel: { fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: spacing.sm },
  langGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  langChip: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    backgroundColor: colors.surface, borderRadius: radius.full,
    borderWidth: 1, borderColor: colors.border,
  },
  langChipActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  langChipText: { fontSize: 14, color: colors.text },
  langChipTextActive: { color: colors.primary, fontWeight: '600' },
  row: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  rowLabel: { fontSize: 16, color: colors.text },
  chip: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    backgroundColor: colors.surface, borderRadius: radius.full,
  },
  chipText: { fontSize: 14, color: colors.primary, fontWeight: '600' },
  privacyText: { fontSize: 14, color: colors.textSecondary, marginTop: spacing.sm, lineHeight: 20 },
  version: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xl },
});