# Pazar Araştırması — 2026 W38 (2026-09-15)

> Not: `AGENTS.md`'de skor rubriği yok (yalnızca Expo v57.0.0 dokümanına işaret ediyor).
> Bu yüzden aşağıdaki 5'li mini-rubrik kullanıldı — her kriter 1–5, toplam /25:
> **K**=Kapsam (1 haftalık RN MVP'ye sığar mı) · **B**=Boşluk (rakip eksiği) ·
> **P**=Para (abonelik/IAP mantığı) · **E**=Etik/gizlilik · **X**=Expo uyumu (offline-first,native modül gerektirmez).

## Yöntem ve veri uyarısı (kısa)

- **Sıralama ≠ indirme.** App Store/Google Play "top free" listeleri gözlenen grafik pozisyonudur; indirme/gelir sayısı vermez (appstorestatistics.com metodoloji notu: "not downloads or revenue").
- **Yorum/puan adedi ≠ doğrulanmış kurulum.** Puan sayıları (örn. Bobby iOS'ta ~8.000 yorum, 4.7) yalnızca mağazada görünen sayıdır; doğrulanmış indirme değildir.
- **Satıcı iddiaları doğrulanmadı.** "Rocket Money 10M+ üye" gibi rakamlar satıcının kendi sitesinden alıntıdır, bağımsız doğrulanmamıştır.
- Grafikler Eylül 2026 başı anlık görüntülerdir (AppBrain 2–6 Eyl 2026, 42matters 4 Eyl 2026, Apple App Store vitrini Eyl 2026).

## Pazar resmi (Eylül 2026)

- Üretkenlik/verimlilik tepesi tamamen dev AI asistanlarda: ChatGPT (#1), Muse (#2), Gemini (#3) (Apple App Store iPhone Top Free Productivity, Eyl 2026). Genel AI wrapper yapma — intihar.
- ABD genel Top Free'de ChatGPT, Gemini, WhatsApp, Instagram, Threads üstte (openaso/Apple App Store, Eyl 2026). İlk 25'in neredeyse tamamı yerleşik dev/oyuncu.
- Fırsat alt sıralarda ve nişlerde: PDF tarayıcılar, TaxMile (km takibi), Finalist (günlük planlayıcı), Habi (alışkanlık + odak), Pollen Count, Anchored Vines (şarap günlüğü), Habit Tracker Heatmap gibi tek-iş uygulamaları Apple vitrininde öne çıkıyor.
- Google Play "Top New Free" listesi IPTV oynatıcılar, QR tarayıcılar, Speaker Cleaner gibi tek-iş araçlarla dolu (AppBrain, 2–6 Eyl 2026) — basit araçlar hâlâ keşfediliyor.
- Mikro-SaaS/mobil örüntü 2026: "X için" daraltması kazanıyor; 3–6 ekran, tek çekirdek döngü, ilk günden paywall; varsayılan yığın Expo + Supabase + RevenueCat, offline-first MMKV (shipnative.dev 2026 vitrini). Günlük açılan izleyiciler (sağlık, para, çocuk, evcil hayvan) aboneliği en iyi taşıyor (superappp.com 2026 özeti).
- Ekran-süresi/odak kategorisi kalabalık ama mekanikler ayrışıyor: Opal/Brick (sert duvar), one sec (nefeslik duraklatma, PNAS 2023 çalışması iddiası), Forest (ağaç öldürme), Pauza/Unrot (gerçek alışkanlıkla ekran süresi kazanma) (pauza.ai; habitunlock 2026; routinery 27 Ağu 2026).

## 5 aday (sıralı, küçük + etik + RN MVP)

### 1) Gizlilik-öncelikli abonelik/yenileme takipçisi (manuel, cross-platform) — TOPLAM 23/25
- **Ne:** Bobby gibi manuel liste (ikon, renk, para birimi, özel dönem), yenileme uyarıları (yıllıkta erken haber), toplam aylık maliyet, CSV dışa aktarım. Banka bağlantısı YOK, offline-first.
- **Boşluk:** Bobby yalnızca iOS + freemium (sınırsız için $4.99 tek seferlik/veya yıllık) (lemsubs.com 2026; subgrove.com 2026); Rocket Money banka erişimi zorunlu (Plaid), ücretsiz katman kısıtlı, Premium $7–14/ay "pay what you think is fair" (rocketmoney.com 2026). Android'de temiz, gizli, manuel tracker boşluğu gerçek. Reddit'te "Rocket Money kalabalık, Bobby'da pazarlık yok" şikâyeti var (r/ProductivityApps 2026).
- **Para:** freemium (örn. 10 abonelik ücretsiz → sınırsız + erken uyarı + aile paylaşımı yıllık küçük ücret). Rocket Money/Copilot ($8–13/ay) pahalı bandında; altı oyulabilir.
- **Skor:** K5 · B5 · P4 · E5 · X4 = **23/25**
- **MVP (1 hafta):** liste + ekleme formu + local notification + toplam + CSV export. Banka/Fatura OCR YOK.

### 2) Tek-kimlik mikro alışkanlık izleyici ("X için", örn. harcamama günleri) — 21/25
- **Ne:** Streaks sadeliği (aç-tıkla-kapat <10 sn) ama cross-platform ve tek kimliğe markalı.
- **Boşluk:** Streaks yalnızca iOS + tek alım $4.99; Loop yalnızca Android + açık kaynak ücretsiz (dailygenius 2026). Cross-platform "tek kimlik" markalı izleyici boş. ShipNative 2026: niş alışkanlık izleyiciler AI-üretimine en uygun, 1 hafta sonunda TestFlight örneği.
- **Skor:** K5 · B4 · P4 · E4 · X4 = **21/25**

### 3) İlaç/takviye hatırlatıcı + bakıcı paylaşımı — 20/25
- **Ne:** çoklu doz, tekrar-dolum uyarısı, bakıcıyla paylaşım, offline zil.
- **Boşluk:** Genel sağlık uygulamaları devlerde; bakıcı-paylaşımlı sade hatırlatıcı nişi dar. Carelo (Carelo Pro $8.99/ay-$74.99/yıl), Caredex (yakında multi-caregiver iCloud), Kin, Kindred Circle, CircleCare ($6.99/ay-$59.99/yıl) gibi yeni iOS uygulamaları 2026'ya girdikçe piyasa yoğunlaşıyor ancak çoğu iOS-only (Apple App Store, Eyl 2026). Cross-platform + offline-first + native modülsüz boşluk var.
- **Skor:** K4 · B4 · P4 · E4 · X4 = **20/25**

### 4) Niş interval zamanlayıcı (boks/HIIT/sınav Pomodoro + haptics) — 19/25
- **Ne:** tek spora/derse ayarlı tur/süre, sesli + titreşimli geçiş, kilit-ekranda sayaç.
- **Boşluk:** Jenerik zamanlayıcı çok; adlandırılmış niş (boks rauntları, doğum kasılma sayacı vb.) App Store aramasında "sıkıcı anahtar kelime" ile bulunuyor (superappp.com). Boxing Interval Timer (Android 4.7/47k), Seconds Pro (iOS+Android), Box Timer (iOS ücretsiz/reklamsız) mevcut (AppBrain 2026; locu.app 2026; boxtimer.app 2026). Farklılaşma zordur.
- **Skor:** K5 · B3 · P3 · E4 · X4 = **19/25**

### 5) Ev bitkisi bakım planlayıcı (bitki başına sulama/ışık notu) — 18/25
- **Ne:** bitki başına program, fotoğraflı kart, sulama bildirimi; çok bitkide freemium kilidi.
- **Boşluk:** Planta (5M kullanıcı, 25M bitki iddiası, £32.99/yıl UK), Greg, PictureThis ($39.99/yıl), Floralens, Growli, Botanicaly, PlantIn rakip (floralens-app.com 2026; getgrowli.app 2026; aitoolgiant.com 2026; botanicaly.com 2026). Pazar olgun, mevsimsellik ve sadık kitle var ama girme maliyeti yüksek.
- **Skor:** K5 · B3 · P3 · E4 · X3 = **18/25**

## Öneri

**#1 — Gizlilik-öncelikli abonelik/yenileme takipçisi.** Gerekçe: kanıtlı boşluk (Bobby iOS-only + freemium kayması, Rocket Money banka-zorunlu + $7–14/ay), 1 haftalık gerçekçi MVP, etik (finansal veriyi toplamaz/bağlantı şart koşmaz), Expo ile native modülsüz yapılabilir (local notifications, AsyncStorage/MMCSV, CSV export), rakip fiyatların altı oyulabilir.
Risk: manuel giriş sürtünmesi → ilk açılışta 60 saniyelik kurulum sihirbazı ve hazır şablon listesiyle (Netflix, Spotify, GitHub Copilot, ChatGPT Plus, iCloud+, Adobe, Notion, Figma, VS Code, 1Password, domain/hosting) azalt.

## Kaynaklar (seçki)

- Apple App Store iPhone Top Free Productivity (Eyl 2026): ChatGPT, Muse, Gemini, Claude.
- AppBrain — Google Play Top New Free US (2 Eyl 2026), Top Grossing US (4 Eyl 2026), KR (6 Eyl 2026). IPTV, QR, Speaker Cleaner, PDF reader yoğunluğu.
- 42matters — Top Charts Explorer (4 Eyl 2026): ChatGPT #1 Free, Google One #1 Grossing.
- lemsubs.com — Bobby App Review 2026 (iOS-only, freemium kayması, 4.7★ ~8k yorum, $4.99 unlock).
- subgrove.com — Bobby App Review 2026 (iOS-only, limited sync/backup, development slowed).
- subnesio.one — Bobby Alternatives (web-first manual trackers: Subnesio, TrackMySubs, ReSubs cross-platform).
- resubs.app — ReSubs vs Bobby (ReSubs iOS+Android, AI import, CSV, Gmail sync, $3.99/ay-$17.99/yıl-$43.99 lifetime).
- rocketmoney.com — Pricing (Free: bank link required, subscription detection; Premium $7–14/ay pay-what-you-fair, cancellation assist, credit report).
- thepennyhoarder.com — Rocket Money Review 2026 (Free vs Premium table, Plaid, 10M+ members claim).
- northvilletech.com — Rocket Money Free vs Premium 2026 (detailed feature matrix, monthly only, no annual discount published).
- dailygenius.com — Minimalist apps 2026: Streaks iOS $4.99, Loop Android free, one sec PNAS 2023 claim.
- pauza.ai / habitunlock / routinery — Screen time intervention styles 2026.
- floralens-app.com — Best plant care apps 2026 (Planta 5M/25M, PictureThis billing complaints, Greg opaque pricing).
- getgrowli.app — 7 tested plant apps 2026 (Planta, Greg, PictureThis, Vera removed, Growli, PlantIn, From Seed to Spoon).
- aitoolgiant.com — AI plant care apps 2026 (5 weeks testing, 23 plants, PictureThis worst billing).
- botanicaly.com — 6 apps compared 2026 (Planta, Greg, PictureThis, Juniper, Botanicaly, RHS Grow).
- locu.app — 12 best free interval timer apps 2026 (Seconds, Tabata Stopwatch Pro iOS-only, Android HRM support).
- boxtimer.app — Best workout timers iPhone 2026 (Box Timer free/ad-free).
- App Store listings (Eyl 2026): Carelo, Caredex, Kin, Kindred Circle, CircleCare — caregiver coordination apps, mostly iOS-only, subscription $6.99–$8.99/ay.
- shipnative.dev 2026 vitrini — Expo+Supabase+RevenueCat, 3–6 ekran, 1 hafta TestFlight.
- superappp.com 2026 — Basit uygulama özeti, niş arama stratejisi, günlük izleyici abonelik tutarı.