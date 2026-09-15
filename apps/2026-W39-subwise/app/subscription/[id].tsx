import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet, Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSubscriptions } from '../../src/state/useSubscriptions';
import { t } from '../../src/i18n/strings';
import { colors, spacing, radius } from '../../constants/theme';
import { Currency, Cycle, Subscription } from '../../src/db/schema';
import { nextRenewalDate, daysUntil, formatCycleLabel } from '../../src/lib/renewals';
import { scheduleRenewalReminders } from '../../src/lib/notifications';

const CURRENCIES: Currency[] = ['TRY', 'USD', 'EUR', 'GBP'];
const CYCLES: Cycle[] = ['weekly', 'monthly', 'quarterly', 'semiannual', 'yearly'];
const COLORS = ['#6366F1', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444', '#8B5CF6', '#06B6D4'];
const EMOJIS = ['📺', '🎵', '🎮', '☁️', '🔒', '📰', '🏋️', '📧', '🎥', '📱'];

export default function SubscriptionForm() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { subs, add, update, remove } = useSubscriptions();
  const isNew = id === 'new';

  const existing = !isNew ? subs.find((s) => s.id === id) : null;

  const [name, setName] = useState(existing?.name ?? '');
  const [price, setPrice] = useState(existing?.price?.toString() ?? '');
  const [currency, setCurrency] = useState<Currency>(existing?.currency ?? 'TRY');
  const [cycle, setCycle] = useState<Cycle>(existing?.cycle ?? 'monthly');
  const [nextDate, setNextDate] = useState(existing?.nextRenewal ?? nextRenewalDate(new Date(), 'monthly').toISOString());
  const [color, setColor] = useState(existing?.color ?? COLORS[0]);
  const [icon, setIcon] = useState(existing?.icon ?? '📱');
  const [notes, setNotes] = useState(existing?.notes ?? '');

  const previewDate = new Date(nextDate);
  const days = daysUntil(nextDate);

  const handleSave = async () => {
    if (!name.trim() || !price) return;
    const sub: Subscription = {
      id: existing?.id ?? Math.random().toString(36) + Date.now().toString(),
      name: name.trim(),
      price: parseFloat(price),
      currency,
      cycle,
      nextRenewal: nextDate,
      color,
      icon,
      notes,
    };
    if (isNew) await add(sub);
    else await update(sub);
    await scheduleRenewalReminders(sub);
    router.back();
  };

  const handleDelete = () => {
    Alert.alert(t('form.delete'), t('form.deleteConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('form.delete'),
        style: 'destructive',
        onPress: async () => {
          if (existing) await remove(existing.id);
          router.back();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{isNew ? t('form.title') : t('form.editTitle')}</Text>

      <Text style={styles.label}>{t('form.name')}</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Netflix" />

      <Text style={styles.label}>{t('form.price')}</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        placeholder="0.00"
      />

      <Text style={styles.label}>{t('form.currency')}</Text>
      <View style={styles.chipRow}>
        {CURRENCIES.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.chip, currency === c && styles.chipActive]}
            onPress={() => setCurrency(c)}
          >
            <Text style={[styles.chipText, currency === c && styles.chipTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>{t('form.cycle')}</Text>
      <View style={styles.chipRow}>
        {CYCLES.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.chip, cycle === c && styles.chipActive]}
            onPress={() => {
              setCycle(c);
              setNextDate(nextRenewalDate(new Date(), c).toISOString());
            }}
          >
            <Text style={[styles.chipText, cycle === c && styles.chipTextActive]}>
              {formatCycleLabel(c, (k) => t(k))}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>{t('form.icon')}</Text>
      <View style={styles.chipRow}>
        {EMOJIS.map((e) => (
          <TouchableOpacity
            key={e}
            style={[styles.chip, icon === e && styles.chipActive]}
            onPress={() => setIcon(e)}
          >
            <Text style={styles.chipText}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>{t('form.color')}</Text>
      <View style={styles.chipRow}>
        {COLORS.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.colorDot, { backgroundColor: c }, color === c && styles.colorActive]}
            onPress={() => setColor(c)}
          />
        ))}
      </View>

      <Text style={styles.label}>{t('form.notes')}</Text>
      <TextInput
        style={[styles.input, styles.notesInput]}
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={3}
      />

      <View style={styles.preview}>
        <Text style={styles.previewText}>
          {t('form.nextRenewalPreview', {
            date: previewDate.toLocaleDateString('tr-TR'),
          })}
        </Text>
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>{t('form.save')}</Text>
      </TouchableOpacity>

      {!isNew && (
        <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
          <Text style={styles.deleteBtnText}>{t('form.delete')}</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  title: { fontSize: 24, fontWeight: '700', color: colors.text, marginBottom: spacing.lg },
  label: { fontSize: 14, fontWeight: '600', color: colors.text, marginTop: spacing.md, marginBottom: spacing.xs },
  input: {
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
    padding: spacing.md, fontSize: 16, color: colors.text,
  },
  notesInput: { height: 80, textAlignVertical: 'top' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.full,
  },
  chipActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  chipText: { fontSize: 14, color: colors.text },
  chipTextActive: { color: colors.primary, fontWeight: '600' },
  colorDot: {
    width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: 'transparent',
  },
  colorActive: { borderColor: colors.text },
  preview: {
    marginTop: spacing.lg, padding: spacing.md,
    backgroundColor: colors.surface, borderRadius: radius.md,
  },
  previewText: { fontSize: 14, color: colors.textSecondary, textAlign: 'center' },
  saveBtn: {
    backgroundColor: colors.primary, padding: spacing.md,
    borderRadius: radius.md, alignItems: 'center', marginTop: spacing.lg,
  },
  saveBtnText: { color: colors.white, fontSize: 16, fontWeight: '600' },
  deleteBtn: { padding: spacing.md, alignItems: 'center', marginTop: spacing.sm },
  deleteBtnText: { color: colors.danger, fontSize: 16 },
});
