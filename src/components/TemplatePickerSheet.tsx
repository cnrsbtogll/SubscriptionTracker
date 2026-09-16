import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TEMPLATES, Template } from '../lib/templates';
import { Subscription } from '../db/schema';
import { colors, spacing, radius } from '../../constants/theme';
import { t } from '../i18n/strings';

interface Props {
  visible: boolean;
  existingSubs: Subscription[];
  onSelect: (template: Template | null, existingId?: string) => void;
  onDismiss: () => void;
}

export function TemplatePickerSheet({ visible, existingSubs, onSelect, onDismiss }: Props) {
  const insets = useSafeAreaInsets();

  const handleTemplate = (tpl: Template) => {
    const alreadyAdded = existingSubs.find(
      (s) => s.name.toLowerCase() === tpl.name.toLowerCase()
    );
    onSelect(tpl, alreadyAdded?.id);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onDismiss}>
      <Pressable style={styles.backdrop} onPress={onDismiss} />
      <View style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]}>
        <View style={styles.handle} />
        <Text style={styles.title}>{t('picker.title')}</Text>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
          {TEMPLATES.map((tpl) => {
            const existing = existingSubs.find(
              (s) => s.name.toLowerCase() === tpl.name.toLowerCase()
            );
            return (
              <TouchableOpacity
                key={tpl.name}
                style={[styles.card, existing && styles.cardAdded]}
                onPress={() => handleTemplate(tpl)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconBadge, { backgroundColor: tpl.color + '22' }]}>
                  <Text style={styles.icon}>{tpl.icon}</Text>
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardName}>{tpl.name}</Text>
                  {existing ? (
                    <Text style={styles.cardSub}>
                      {existing.price} {existing.currency} · {t('picker.alreadyAdded')}
                    </Text>
                  ) : (
                    <Text style={styles.cardSub}>
                      {tpl.price} {tpl.currency}
                    </Text>
                  )}
                </View>
                {existing && <View style={styles.dot} />}
              </TouchableOpacity>
            );
          })}

          {/* Custom / Other */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => onSelect(null)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconBadge, { backgroundColor: colors.surface }]}>
              <Text style={styles.icon}>➕</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardName}>{t('picker.other')}</Text>
              <Text style={styles.cardSub}>{t('picker.otherSub')}</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    maxHeight: '80%',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  list: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    gap: spacing.md,
  },
  cardAdded: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 22 },
  cardBody: { flex: 1 },
  cardName: { fontSize: 15, fontWeight: '600', color: colors.text },
  cardSub: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
});
