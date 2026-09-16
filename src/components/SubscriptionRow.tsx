import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../constants/theme';
import { t } from '../i18n/strings';
import { Subscription } from '../db/schema';
import { daysUntil, formatCycleLabel } from '../lib/renewals';

interface Props {
  sub: Subscription;
  onPress: () => void;
}

export function SubscriptionRow({ sub, onPress }: Props) {
  const days = daysUntil(sub.nextRenewal);
  let badgeText: string;
  let badgeColor: string;

  if (days < 0) {
    badgeText = t('dashboard.overdue');
    badgeColor = colors.danger;
  } else if (days === 0) {
    badgeText = t('dashboard.today');
    badgeColor = colors.warning;
  } else {
    badgeText = t('dashboard.daysLeft', { count: days });
    badgeColor = days <= 3 ? colors.warning : colors.success;
  }

  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconWrap, { backgroundColor: sub.color + '20' }]}>
        <Text style={styles.icon}>{sub.icon}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{sub.name}</Text>
        <Text style={styles.meta}>
          {sub.price} {sub.currency} · {formatCycleLabel(sub.cycle, (k) => t(k))}
        </Text>
      </View>
      <View style={[styles.badge, { backgroundColor: badgeColor }]}>
        <Text style={styles.badgeText}>{badgeText}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 22,
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  meta: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.full,
  },
  badgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});
