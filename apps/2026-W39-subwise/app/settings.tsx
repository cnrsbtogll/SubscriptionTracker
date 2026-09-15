import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Share } from 'react-native';
import { useSubscriptions } from '../src/state/useSubscriptions';
import { t, getLanguage, setLanguage } from '../src/i18n/strings';
import { generateCSV } from '../src/lib/csv';
import { colors, spacing, radius } from '../constants/theme';

export default function SettingsScreen() {
  const subs = useSubscriptions((s) => s.subs);
  const [lang, setLang] = useState(getLanguage());

  const toggleLang = () => {
    const next = lang === 'tr' ? 'en' : 'tr';
    setLang(next);
    setLanguage(next);
  };

  const exportCSV = async () => {
    const csv = generateCSV(subs);
    await Share.share({ message: csv, title: 'abonelikler.csv' });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{t('settings.title')}</Text>

      <View style={styles.row}>
        <Text style={styles.rowLabel}>{t('settings.language')}</Text>
        <TouchableOpacity style={styles.chip} onPress={toggleLang}>
          <Text style={styles.chipText}>{lang === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 English'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowLabel}>{t('settings.export')}</Text>
        <TouchableOpacity style={styles.chip} onPress={exportCSV}>
          <Text style={styles.chipText}>CSV</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowLabel}>{t('settings.privacy')}</Text>
      </View>
      <Text style={styles.privacyText}>{t('settings.privacyText')}</Text>

      <Text style={styles.version}>{t('settings.version', { version: '1.0.0' })}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.lg },
  title: { fontSize: 24, fontWeight: '700', color: colors.text, marginBottom: spacing.lg },
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
