# Pazar Araştırması — 2026 W39 (2026-09-14)

> Not: `AGENTS.md`'de skor rubriği yok (yalnızca Expo v57.0.0 dokümanına işaret ediyor).
> Bu yüzden aşağıdaki 5'li mini-rubrik kullanıldı — her kriter 1–5, toplam /25:
> **K**=Kapsam (1 haftalık RN MVP'ye sığar mı) · **B**=Boşluk (rakip eksiği) ·
> **P**=Para (abonelik/IAP mantığı) · **E**=Etik/gizlilik · **X**=Expo uyumu (offline-first,native modül gerektirmez).

## Yöntem ve veri uyarısı (kısa)

- **Sıralama ≠ indirme.** App Store/Google Play "top free" listeleri gözlenen grafik pozisyonudur;
  indirme/gelir sayısı vermez (appstorestatistics.com metodoloji notu: "not downloads or revenue").
- **Yorum/puan adedi ≠ doğrulanmış kurulum.** Puan sayıları (örn. Bobby iOS'ta ~8.000 yorum, 4.7)
  yalnızca mağazada görünen sayıdır; doğrulanmış indirme değildir.
- **Satıcı iddiaları doğrulanmadı.** "Rocket Money 10M+ üye" gibi rakamlar satıcının kendi sitesinden
  alıntıdır, bağımsız doğrulanmamıştır.
- Grafikler Eylül 2026 başı anlık görüntülerdir (openaso 1 Eyl 2026, appstorestatistics 3–7 Eyl 2026,
  AppBrain 2–3 Eyl 2026).

## Pazar resmi (Eylül 2026)

- Üretkenlik/verimlilik tepesi tamamen dev AI asistanlarda: ChatGPT (#1), Gemini (#2), Claude (#3)
  (appstorestatistics.com, ABD Top Free Productivity, 7 Eyl 2026). Genel AI wrapper yapma — intihar.
- ABD genel Top Free'de ChatGPT, Gemini, WhatsApp, Instagram, Threads üstte (Apple App Store iPhone
  sayfası; openaso 1 Eyl 2026). İlk 25'in neredeyse tamamı yerleşik dev/oyuncu.
- Fırsat alt sıralarda ve nişlerde: PDF tarayıcılar, TaxMile (km takibi), Finalist (günlük planlayıcı),
  Habi (alışkanlık + odak zamanlayıcı), Pollen Count, Anchored Vines (şarap günlüğü), Habit Tracker Heatmap
  gibi tek-iş uygulamaları Apple vitrininde öne çıkıyor.
- Google Play "Top New Free" listesi IPTV oynatıcılar, QR tarayıcılar, Speaker Cleaner gibi tek-iş
  araçlarla dolu (AppBrain, 2 Eyl 2026) — basit araçlar hâlâ keşfediliyor.
- Mikro-SaaS/mobil örüntü 2026: "X için" daraltması kazanıyor; 3–6 ekran, tek çekirdek döngü, ilk günden
  paywall; varsayılan yığın Expo + Supabase + RevenueCat, offline-first MMKV (shipnative.dev 2026 vitrini).
  Günlük açılan izleyiciler (sağlık, para, çocuk, evcil hayvan) aboneliği en iyi taşıyor
  (superappp.com 2026 özeti).
- Ekran-süresi/odak kategorisi kalabalık ama mekanikler ayrışıyor: Opal/Brick (sert duvar),
  one sec (nefeslik duraklatma, PNAS 2023 çalışması iddiası), Forest (ağaç öldürme), Pauza/Unrot
  (gerçek alışkanlıkla ekran süresi kazanma) (pauza.ai; habitunlock 2026; routinery 27 Ağu 2026).

## 5 aday (sıralı, küçük + etik + RN MVP)

### 1) Gizlilik-öncelikli abonelik/yenileme takipçisi (manuel, cross-platform) — TOPLAM 23/25
- **Ne:** Bobby gibi manuel liste (ikon, renk, para birimi, özel dönem), yenileme uyarıları (yıllıkta
  erken haber), toplam aylık maliyet, CSV dışa aktarım. Banka bağlantısı YOK, offline-first.
- **Boşluk:** Bobby yalnızca iOS + tek alımlık ($2.99 sınırsız izleme) (CNBC Select 2026; getfinny 2026);
  Rocket Money banka erişimi zorunlu, ücretsiz katman kısıtlı ($6–12/ay), ABD dışı kapsamı yamuk
  (subtracker.io 2026). Android'de temiz, gizli, manuel tracker boşluğu gerçek. Reddit'te
  "Rocket Money kalabalık, Bobby'da pazarlık yok" şikâyeti var (r/ProductivityApps 2026).
- **Para:** freemium (örn. 10 abonelik ücretsiz → sınırsız + erken uyarı + aile paylaşımı yıllık küçük ücret).
  Rocket Money/Copilot ($8–13/ay) pahalı bandında; altı oyulabilir.
- **Skor:** K5 · B5 · P4 · E5 · X4 = **23/25**
- **MVP (1 hafta):** liste + ekleme formu + local notification + toplam + CSV export. Banka/Fatura OCR YOK.

### 2) Tek-kimlik mikro alışkanlık izleyici ("X için", örn. harcamama günleri) — 21/25
- **Ne:** Streaks sadeliği (aç-tıkla-kapat <10 sn) ama cross-platform ve tek kimliğe markalı.
- **Boşluk:** Streaks yalnızca iOS + tek alım $4.99; Loop yalnızca Android + açık kaynak ücretsiz
  (dailygenius 2026). Cross-platform "tek kimlik" markalı izleyici boş. ShipNative 2026: niş alışkanlık
  izleyiciler AI-üretimine en uygun, 1 hafta sonunda TestFlight örüntüsü.
- **Skor:** K5 · B4 · P4 · E4 · X4 = **21/25**

### 3) İlaç/takviye hatırlatıcı + bakıcı paylaşımı — 20/25
- **Ne:** çoklu doz, tekrar-dolum uyarısı, bakıcıyla paylaşım, offline zil.
- **Boşluk:** genel sağlık uygulamaları devlerde; bakıcı-paylaşımlı sade hatırlatıcı nişi dar.
  Günlük kullanım + duygusal bağ = abonelik tutar (superappp.com).
- **Skor:** K4 · B4 · P4 · E4 · X4 = **20/25**

### 4) Niş interval zamanlayıcı (boks/HIIT/sınav Pomodoro + haptics) — 19/25
- **Ne:** tek spora/derse ayarlı tur/süre, sesli + titreşimli geçiş, kilit-ekranda sayaç.
- **Boşluk:** jenerik zamanlayıcı çok; adlandırılmış niş (boks rauntları, doğum kasılma sayacı vb.)
  App Store aramasında "sıkıcı anahtar kelime" ile bulunuyor (superappp.com).
- **Skor:** K5 · B3 · P3 · E4 · X4 = **19/25**

### 5) Ev bitkisi bakım planlayıcı (bitki başına sulama/ışık notu) — 18/25
- **Ne:** bitki başına program, fotoğraflı kart, sulama bildirimi; çok bitkide freemium kilidi.
- **Boşluk:** sevimli niş, sadık kitle; ancak rakip çok ve mevsimsellik var.
- **Skor:** K5 · B3 · P3 · E4 · X3 = **18/25**

## Öneri

**#1 — Gizlilik-öncelikli abonelik/yenileme takipçisi.** Gerekçe: kanıtlı boşluk (Bobby iOS-only,
Rocket Money banka-zorunlu), 1 haftalık gerçekçi MVP, etik (finansal veriyi toplamaz),
Expo ile native modülsüz yapılabilir, rakip fiyatların altı oyulabilir.
Risk: manuel giriş sürtünmesi → ilk açılışta 60 saniyelik kurulum sihirbazı ve hazır şablon listesiyle azalt.

## Kaynaklar (seçki)

- appstorestatistics.com — ABD Top Free Productivity (7 Eyl 2026); UK Top Grossing (3 Eyl 2026);
  metodoloji: "not downloads or revenue". 42matters — App Store istatistikleri (7 Eyl 2026: 2,59M uygulama).
- openaso.ai — ABD Top 100 Free (1 Eyl 2026). AppBrain — Google Play Top New Free US (2 Eyl 2026).
- Apple App Store iPhone sayfası (Eyl 2026 vitrini: TaxMile, Finalist, Habi, Pollen Count, Anchored Vines).
- CNBC Select — Best Subscription Trackers 2026 (Rocket Money, Bobby). getfinny.app (2026 karşılaştırma:
  Bobby 4.7/~8.000 iOS yorumu; Rocket Money $6–12/ay). subtracker.io (2026: banka-zorunluluk, ABD-dışı kapsam).
  Reddit r/ProductivityApps (2026 başlığı).
- shipnative.dev 2026 vitrini (Expo+Supabase+RevenueCat, 3–6 ekran). superappp.com (2026 basit-uygulama özeti).
- pauza.ai (2026 ekran-süresi karşılaştırması); habitunlock/blog (2026 müdahale stilleri, one sec PNAS 2023
  iddiası); routinery.app (27 Ağu 2026, Freedom/Freedom-deneyi notu); dailygenius.com (2026 minimalist
  uygulamalar: Streaks, one sec, Opal, Goodbudget, Loop fiyatları).
