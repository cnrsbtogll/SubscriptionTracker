import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../constants/theme';
import { t } from '../i18n/strings';
import { Subscription } from '../db/schema';
import { monthlyEquivalent } from '../lib/renewals';

interface Props {
  subs: Subscription[];
}

export function TotalCard({ subs }: Props) {
  const grouped: Record<string, number> = {};
  for (const s of subs) {
    const eq = monthlyEquivalent(s.price, s.cycle);
    grouped[s.currency] = (grouped[s.currency] || 0) + eq;
  }
  const entries = Object.entries(grouped);

  return (
    <View style={styles.card}>
      <Text style={styles.label}>{t('dashboard.total')}</Text>
      {entries.length === 0 ? (
        <Text style={styles.amount}>₺0</Text>
      ) : (
        entries.map(([currency, total]) => (
          <Text key={currency} style={styles.amount}>
            {currency} {total.toFixed(2)}
            <Text style={styles.period}>{t('dashboard.monthly')}</Text>
          </Text>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
  },
  label: {
    color: colors.white,
    fontSize: 14,
    opacity: 0.8,
  },
  amount: {
    color: colors.white,
    fontSize: 32,
    fontWeight: '700',
  },
  period: {
    fontSize: 16,
    fontWeight: '400',
  },
});
