import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Subscription, Currency } from '../db/schema';
import { colors, spacing, radius } from '../../constants/theme';
import { t } from '../i18n/strings';
import { monthlyEquivalent } from '../lib/renewals';
import { formatPrice } from '../lib/currencies';
import { STORAGE_KEY } from '../lib/constants';

interface Props {
  subs: Subscription[];
}

export function TotalCard({ subs }: Props) {
  const router = useRouter();
  const [hasOnboarded, setHasOnboarded] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY + ':hasOnboarded').then((v) => {
      setHasOnboarded(v === 'true');
    });
  }, []);

  const grouped: Record<string, number> = {};
  for (const s of subs) {
    const eq = monthlyEquivalent(s.price, s.cycle, s.customDays);
    grouped[s.currency] = (grouped[s.currency] || 0) + eq;
  }
  const entries = Object.entries(grouped);

  return (
    <View style={styles.card}>
      <Text style={styles.label}>{t('dashboard.total')}</Text>
      {entries.length === 0 ? (
        hasOnboarded ? (
          <Text style={styles.amount}>₺0.00</Text>
        ) : (
          <Text style={styles.amount}>
            {t('onboarding.step1')}
          </Text>
        )
      ) : (
        entries.map(([currency, total]) => (
          <Text key={currency} style={styles.amount}>
            {formatPrice(total.toFixed(2), currency as Currency)}
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
