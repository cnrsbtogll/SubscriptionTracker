import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet, Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSubscriptions } from '../../src/state/useSubscriptions';
import { t } from '../../src/i18n/strings';
import { colors, spacing, radius } from '../../constants/theme';
import { Currency, Cycle, Subscription } from '../../src/db/schema';
import { nextRenewalDate, daysUntil, formatCycleLabel, autoAdvanceOverdue } from '../../src/lib/renewals';
import { scheduleRenewalReminders } from '../../src/lib/notifications';
import { defaultPriceFor } from '../../src/lib/templates';

const CURRENCIES: Currency[] = ['TRY', 'USD', 'EUR', 'GBP'];
const CYCLES: Cycle[] = ['weekly', 'monthly', 'quarterly', 'semiannual', 'yearly', 'custom'];
const COLORS = ['#6366F1', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444', '#8B5CF6', '#06B6D4'];
const EMOJIS = ['📺', '🎵', '🎮', '☁️', '🔒', '📰', '🏋️', '📧', '🎥', '📱'];

export default function SubscriptionForm() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id, tplName, tplPrice, tplCurrency, tplCycle, tplColor, tplIcon } =
    useLocalSearchParams<{
      id: string;
      tplName?: string;
      tplPrice?: string;
      tplCurrency?: string;
      tplCycle?: string;
      tplColor?: string;
      tplIcon?: string;
    }>();
  const { subs, add, update, remove } = useSubscriptions();
  const isNew = id === 'new';

  const existing = !isNew ? subs.find((s) => s.id === id) : null;

  const [name, setName] = useState(existing?.name ?? tplName ?? '');
  const [price, setPrice] = useState(existing?.price?.toString() ?? tplPrice ?? '');
  const [currency, setCurrency] = useState<Currency>(
    existing?.currency ?? (tplCurrency as Currency) ?? 'TRY'
  );
  const [cycle, setCycle] = useState<Cycle>(
    existing?.cycle ?? (tplCycle as Cycle) ?? 'monthly'
  );
  const [nextDate, setNextDate] = useState(
    existing?.nextRenewal
      ? autoAdvanceOverdue(existing.nextRenewal, existing.cycle, existing.customDays)
      : nextRenewalDate(new Date(), (tplCycle as Cycle) ?? 'monthly').toISOString()
  );
  const [color, setColor] = useState(existing?.color ?? tplColor ?? COLORS[0]);
  const [icon, setIcon] = useState(existing?.icon ?? tplIcon ?? '📱');
  const [notes, setNotes] = useState(existing?.notes ?? '');
  const [customDays, setCustomDays] = useState<string>(
    existing?.customDays?.toString() ?? '30'
  );

  const previewDate = new Date(nextDate);
  const days = daysUntil(nextDate);

  // --- Tarih parçalarını ayarla (◀/▶ butonları) ---
  const adjustDate = (field: 'day' | 'month' | 'year', delta: number) => {
    const d = new Date(nextDate);
    if (field === 'day') {
      d.setDate(d.getDate() + delta);
    } else if (field === 'month') {
      const day = d.getDate();
      d.setMonth(d.getMonth() + delta);
      // Ay taşmasını önle (ör. 31 Mart + 1 ay → 30 Nisan)
      const maxDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
      d.setDate(Math.min(day, maxDay));
    } else {
      d.setFullYear(d.getFullYear() + delta);
    }
    setNextDate(d.toISOString());
  };

  // --- Default fiyat onayı: bilinen servis girildiğinde kullanıcıya göster ---
  const applyDefaultPrice = async () => {
    const tpl = defaultPriceFor(name);
    if (!tpl) return;
    const msg = t('form.priceConfirmMessage', {
      name: tpl.name,
      price: String(tpl.price),
      currency: tpl.currency,
      cycle: formatCycleLabel('monthly', (k: string) => t(k)),
    });
    Alert.alert(t('form.priceConfirmTitle'), msg, [
      {
        text: t('form.priceConfirmEdit'),
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: t('form.priceConfirmOk'),
        onPress: () => {
          setPrice(String(tpl.price));
          setCurrency(tpl.currency);
        },
      },
    ]);
  };

  const handleNameChange = (text: string) => {
    setName(text);
    // Sadece isim alanı kullanıcı tarafından değiştirildiyse ve fiyat boşsa öner
    if (!existing && !price) {
      const tpl = defaultPriceFor(text);
      if (tpl) {
        setPrice(String(tpl.price));
        setCurrency(tpl.currency);
      }
    }
  };

  // Template params değişince (farklı servis seçilince) state'i sıfırla
  useEffect(() => {
    if (!isNew) return;
    if (!tplName) {
      // "Diğer" seçildi → boş form
      setName('');
      setPrice('');
      setCurrency('TRY');
      setCycle('monthly');
      setNextDate(nextRenewalDate(new Date(), 'monthly').toISOString());
      setColor(COLORS[0]);
      setIcon('📱');
      setNotes('');
      return;
    }
    setName(tplName);
    if (tplPrice) setPrice(tplPrice);
    if (tplCurrency) setCurrency(tplCurrency as Currency);
    if (tplCycle) {
      setCycle(tplCycle as Cycle);
      setNextDate(nextRenewalDate(new Date(), tplCycle as Cycle).toISOString());
    }
    if (tplColor) setColor(tplColor);
    if (tplIcon) setIcon(tplIcon);
  }, [tplName]);

  useEffect(() => {
    // Edit modunda mevcut fiyatı koru; sadece yeni abonelikte default öner
    if (!existing && name.trim() && price === '' ) {
      const tpl = defaultPriceFor(name);
      if (tpl) {
        setPrice(String(tpl.price));
        setCurrency(tpl.currency);
      }
    }
  }, [name, existing, price]);

  const handleSave = async () => {
    if (!name.trim() || !price) return;
    const sub: Subscription = {
      id: existing?.id ?? Math.random().toString(36) + Date.now().toString(),
      name: name.trim(),
      price: parseFloat(price),
      currency,
      cycle,
      customDays: cycle === 'custom' ? parseInt(customDays, 10) || 30 : undefined,
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
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.md, paddingBottom: insets.bottom + spacing.xl }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{isNew ? t('form.title') : t('form.editTitle')}</Text>

        <Text style={styles.label}>{t('form.name')}</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={handleNameChange}
          placeholder="Netflix"
          autoFocus={isNew}
        />

        <Text style={styles.label}>{t('form.price')}</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="decimal-pad"
          placeholder="0.00"
        />
        {price !== '' && defaultPriceFor(name) && (
          <TouchableOpacity onPress={applyDefaultPrice}>
            <Text style={styles.defaultHint}>
              {t('form.priceConfirmTitle')}: {name.trim()} → {defaultPriceFor(name)?.price} {defaultPriceFor(name)?.currency}
            </Text>
          </TouchableOpacity>
        )}

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
                if (c !== 'custom') {
                  setNextDate(nextRenewalDate(new Date(), c).toISOString());
                }
              }}
            >
              <Text style={[styles.chipText, cycle === c && styles.chipTextActive]}>
                {formatCycleLabel(c, (k) => t(k))}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {cycle === 'custom' && (
          <>
            <Text style={styles.label}>{t('cycle.days')}</Text>
            <TextInput
              style={styles.input}
              value={customDays}
              onChangeText={(v) => {
                setCustomDays(v);
                const n = parseInt(v, 10);
                if (n > 0) setNextDate(nextRenewalDate(new Date(), 'custom', n).toISOString());
              }}
              keyboardType="number-pad"
              placeholder="30"
            />
          </>
        )}

        <Text style={styles.label}>{t('form.nextRenewal')}</Text>
        <View style={styles.datePicker}>
          {(['day', 'month', 'year'] as const).map((field) => {
            const d = new Date(nextDate);
            const val = field === 'day'
              ? d.toLocaleDateString('tr-TR', { day: '2-digit' })
              : field === 'month'
              ? d.toLocaleDateString('tr-TR', { month: 'long' })
              : d.getFullYear().toString();
            return (
              <View key={field} style={styles.dateField}>
                <TouchableOpacity onPress={() => adjustDate(field, 1)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Text style={styles.dateArrow}>▲</Text>
                </TouchableOpacity>
                <Text style={styles.dateValue}>{val}</Text>
                <TouchableOpacity onPress={() => adjustDate(field, -1)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <Text style={styles.dateArrow}>▼</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        <Text style={[
          styles.daysLeft,
          days <= 3 && { color: colors.danger },
          days >= 4 && days <= 7 && { color: colors.warning },
          days > 7 && { color: colors.success },
        ]}>
          {days <= 0
            ? t('dashboard.overdue')
            : days === 1
            ? t('dashboard.daysLeft', { count: 1 })
            : t('dashboard.daysLeft_plural', { count: days })}
        </Text>

        <Text style={styles.label}>{t('form.icon')}</Text>
        <View style={styles.chipRow}>
          {(EMOJIS.includes(icon) ? EMOJIS : [icon, ...EMOJIS]).map((e) => (
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

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>{t('form.save')}</Text>
        </TouchableOpacity>

        {!isNew && (
          <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
            <Text style={styles.deleteBtnText}>{t('form.delete')}</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
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
  notesInput: { minHeight: 80, textAlignVertical: 'top' },
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
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dateField: {
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  dateArrow: {
    fontSize: 18,
    color: colors.primary,
    paddingVertical: spacing.xs,
    fontWeight: '700',
  },
  dateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginVertical: 4,
    textTransform: 'capitalize',
  },
  daysLeft: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  saveBtn: {
    backgroundColor: colors.primary, padding: spacing.md,
    borderRadius: radius.md, alignItems: 'center', marginTop: spacing.lg,
  },
  saveBtnText: { color: colors.white, fontSize: 16, fontWeight: '600' },
  deleteBtn: { padding: spacing.md, alignItems: 'center', marginTop: spacing.sm },
  deleteBtnText: { color: colors.danger, fontSize: 16 },
  defaultHint: { fontSize: 13, color: colors.primary, marginTop: spacing.xs, textDecorationLine: 'underline' },
});