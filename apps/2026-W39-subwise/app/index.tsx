import React, { useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSubscriptions } from '../src/state/useSubscriptions';
import { TotalCard } from '../src/components/TotalCard';
import { SubscriptionRow } from '../src/components/SubscriptionRow';
import { PaywallSheet } from '../src/components/PaywallSheet';
import { t } from '../src/i18n/strings';
import { colors, spacing, radius } from '../constants/theme';
import { daysUntil } from '../src/lib/renewals';

export default function Dashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { subs, loaded, atLimit } = useSubscriptions();
  const [showPaywall, setShowPaywall] = React.useState(false);
  const [hasOnboarded, setHasOnboarded] = React.useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem('hasOnboarded').then((v) => {
      if (!v) router.replace('/onboarding');
      else setHasOnboarded(true);
    });
  }, []);

  if (hasOnboarded === null) return null;

  const sorted = [...subs].sort(
    (a, b) => daysUntil(a.nextRenewal) - daysUntil(b.nextRenewal)
  );

  const handleAdd = () => {
    if (atLimit()) {
      setShowPaywall(true);
      return;
    }
    router.push('/subscription/new');
  };

  return (
    <View style={styles.container}>
      <TotalCard subs={subs} />
      {sorted.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>{t('dashboard.empty')}</Text>
        </View>
      ) : (
        <FlatList
          data={sorted}
          keyExtractor={(s) => s.id}
          renderItem={({ item }) => (
            <SubscriptionRow
              sub={item}
              onPress={() => router.push(`/subscription/${item.id}`)}
            />
          )}
        />
      )}
      <TouchableOpacity
        style={[styles.fab, { bottom: insets.bottom + spacing.lg }]}
        onPress={handleAdd}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
      {showPaywall && <PaywallSheet onDismiss={() => setShowPaywall(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 16, color: colors.textSecondary },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg, // insets.bottom ile override edilir
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  fabText: { color: colors.white, fontSize: 28, lineHeight: 30 },
});
