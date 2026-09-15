import { Subscription } from '../db/schema';

const T = {
  en: {
    'app.name': 'Subwise',
    'onboarding.step1': 'Choose your subscriptions',
    'onboarding.step2': 'Adjust amounts',
    'onboarding.step3': 'Enable notifications',
    'onboarding.start': 'Get Started',
    'onboarding.done': 'Done',
    'onboarding.enableNotifications': 'Enable Notifications',
    'onboarding.skip': 'Skip',
    'dashboard.title': 'My Subscriptions',
    'dashboard.total': 'Total',
    'dashboard.monthly': '/mo',
    'dashboard.empty': 'No subscriptions yet. Tap + to add one.',
    'dashboard.daysLeft': '{{count}} day left',
    'dashboard.daysLeft_plural': '{{count}} days left',
    'dashboard.today': 'Today',
    'dashboard.overdue': 'Overdue',
    'form.title': 'Add Subscription',
    'form.editTitle': 'Edit Subscription',
    'form.name': 'Name',
    'form.price': 'Amount',
    'form.currency': 'Currency',
    'form.cycle': 'Billing cycle',
    'form.nextRenewal': 'Next renewal',
    'form.color': 'Color',
    'form.icon': 'Icon',
    'form.notes': 'Notes',
    'form.save': 'Save',
    'form.delete': 'Delete',
    'form.deleteConfirm': 'Delete this subscription?',
    'form.nextRenewalPreview': 'Next renewal: {{date}}',
    'form.paywallTitle': 'Free Limit Reached',
    'form.paywallMessage': 'You can track up to 10 subscriptions for free. Unlimited tracking coming soon!',
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.notifications': 'Notifications',
    'settings.notificationsOn': 'On',
    'settings.notificationsOff': 'Off',
    'settings.export': 'Export CSV',
    'settings.privacy': 'Privacy',
    'settings.privacyText': 'All data stays on your device. No account, no cloud, no tracking.',
    'settings.about': 'About',
    'settings.version': 'Version {{version}}',
    'cycle.weekly': 'Weekly',
    'cycle.monthly': 'Monthly',
    'cycle.quarterly': 'Quarterly',
    'cycle.semiannual': 'Semi-annual',
    'cycle.yearly': 'Yearly',
    'currency.TRY': 'TRY',
    'currency.USD': 'USD',
    'currency.EUR': 'EUR',
    'currency.GBP': 'GBP',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.loading': 'Loading...',
  },
  tr: {
    'app.name': 'Subwise',
    'onboarding.step1': 'Aboneliklerini seç',
    'onboarding.step2': 'Tutarları düzelt',
    'onboarding.step3': 'Bildirimleri aç',
    'onboarding.start': 'Başla',
    'onboarding.done': 'Bitti',
    'onboarding.enableNotifications': 'Bildirimleri Aç',
    'onboarding.skip': 'Atla',
    'dashboard.title': 'Aboneliklerim',
    'dashboard.total': 'Toplam',
    'dashboard.monthly': '/ay',
    'dashboard.empty': 'Henüz abonelik yok. + ile ekle.',
    'dashboard.daysLeft': '{{count}} gün kaldı',
    'dashboard.daysLeft_plural': '{{count}} gün kaldı',
    'dashboard.today': 'Bugün',
    'dashboard.overdue': 'Gecikti',
    'form.title': 'Abonelik Ekle',
    'form.editTitle': 'Aboneliği Düzenle',
    'form.name': 'Ad',
    'form.price': 'Tutar',
    'form.currency': 'Para birimi',
    'form.cycle': 'Fatura dönemi',
    'form.nextRenewal': 'Sonraki yenileme',
    'form.color': 'Renk',
    'form.icon': 'İkon',
    'form.notes': 'Notlar',
    'form.save': 'Kaydet',
    'form.delete': 'Sil',
    'form.deleteConfirm': 'Bu abonelik silinsin mi?',
    'form.nextRenewalPreview': 'Sonraki yenileme: {{date}}',
    'form.paywallTitle': 'Ücretsiz Limit Doldu',
    'form.paywallMessage': '10 aboneliğe kadar ücretsiz takip edebilirsin. Sınırsız takip yakında!',
    'settings.title': 'Ayarlar',
    'settings.language': 'Dil',
    'settings.notifications': 'Bildirimler',
    'settings.notificationsOn': 'Açık',
    'settings.notificationsOff': 'Kapalı',
    'settings.export': 'CSV Dışa Aktar',
    'settings.privacy': 'Gizlilik',
    'settings.privacyText': 'Tüm veriler cihazınızda kalır. Hesap yok, bulut yok, takip yok.',
    'settings.about': 'Hakkında',
    'settings.version': 'Sürüm {{version}}',
    'cycle.weekly': 'Haftalık',
    'cycle.monthly': 'Aylık',
    'cycle.quarterly': '3 Aylık',
    'cycle.semiannual': '6 Aylık',
    'cycle.yearly': 'Yıllık',
    'currency.TRY': 'TRY',
    'currency.USD': 'USD',
    'currency.EUR': 'EUR',
    'currency.GBP': 'GBP',
    'common.cancel': 'İptal',
    'common.confirm': 'Onayla',
    'common.loading': 'Yükleniyor...',
  },
} as const;

export type Language = keyof typeof T;
export type TranslationKey = keyof (typeof T)['en'];

let currentLang: Language = 'tr';

export function setLanguage(lang: Language) {
  currentLang = lang;
}

export function getLanguage(): Language {
  return currentLang;
}

export function t(key: string, params?: Record<string, string | number>): string {
  const val = (T[currentLang] as Record<string, string | undefined>)[key]
    ?? (T['en'] as Record<string, string | undefined>)[key]
    ?? key;
  if (!params) return val;
  return Object.entries(params).reduce(
    (s, [k, v]) => s.replace(new RegExp(`{{${k}}}`, 'g'), String(v)),
    val
  );
}
