# W39 PRD Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** W38 araştırma raporundaki #1 adaya ait, mühendisliğe hazır PRD'yi `strategy/2026-W39-prd.md` olarak yazmak.

**Architecture:** Tek dosyalık PRD; rapor skorlarını doğrula → bölümleri doldur → 4 günlük planı expo-init-checklist sırasına koy (scaffold → state/db → UI → verification).

**Tech Stack:** Markdown only. No code.

**Spec:** `research/2026-W39-market-report.md` (aday #1: gizlilik-öncelikli abonelik/yenileme takipçisi, 23/25)

## Global Constraints

- Expo SDK v57.0.0 dokümanı baz alınır (`AGENTS.md` kuralı).
- Store submit/build kullanıcı onayı olmadan denenmez.
- PRD'de banka bağlantısı / fatura OCR yok (raporun MVP tanımı).
- 4 günlük plan expo-init-checklist sırasını izler.

---

### Task 1: Aday doğrulama + dosya iskeleti

**Files:**
- Create: `.hermes/plans/2026-09-14-subscription-tracker-prd.md` (bu dosya)
- Create: `strategy/2026-W39-prd.md` (başlık + bölüm iskeleti)

**Interfaces:**
- Consumes: `research/2026-W39-market-report.md` (5 aday, skorlar)
- Produces: PRD iskeleti (9 bölüm başlığı) → Task 2 doldurur.

- [ ] **Step 1: Rapor skorlarını doğrula**

Run: `grep -n "TOPLAM\|Skor" research/2026-W39-market-report.md`
Expected: #1 aday 23/25 ile en yüksek; 5 adayın sırası 23/21/20/19/18.

- [ ] **Step 2: PRD iskeletini yaz**

`strategy/2026-W39-prd.md` içine yalnızca başlık + 9 boş bölüm başlığını yaz
(Hedef kullanıcı, Problem, MVP kapsamı, Ekran akışı, Non-goals, Teknik plan,
Monetizasyon, Gizlilik/politika riskleri, Kabul kriterleri, Mağaza konumu, 4 günlük plan).

- [ ] **Step 3: Dosyaların oluştuğunu doğrula**

Run: `ls -la strategy/2026-W39-prd.md .hermes/plans/2026-09-14-subscription-tracker-prd.md`
Expected: iki dosya da var.

### Task 2: PRD gövdesini doldur

**Files:**
- Modify: `strategy/2026-W39-prd.md` (iskelet → tam metin)

**Interfaces:**
- Consumes: Task 1'deki iskelet + raporun MVP satırı ("liste + ekleme formu + local notification + toplam + CSV export").
- Produces: Tam PRD → mühendislik okur, başka bağımlılık yok.

- [ ] **Step 1: 8 içerik bölümünü yaz** (hedef kullanıcı → mağaza konumu; somut isimler: ekran adları, `com.subwise.app`, tablo alanları `id/name/price/currency/billingCycle/nextRenewalDate/notes`; genel ifade yok)
- [ ] **Step 2: 4 günlük planı yaz** (Gün 1 scaffold → Gün 2 state/db → Gün 3 UI → Gün 4 verification; her gün doğrulanabilir komutla: `npx expo-doctor`, `npx tsc --noEmit`, `npx jest --ci`)
- [ ] **Step 3: Self-review** — spec coverage: raporun "manuel giriş sürtünmesi → 60 sn wizard + şablon" riski PRD'de ekran akışında var mı? Placeholder tara: `grep -Ein "TBD|TODO|benzer|gerekli validasyon" strategy/2026-W39-prd.md` boş dönmeli.
- [ ] **Step 4: Türkçe özet + PRD yolu ile raporla;** Bizde reposuna dokunma (review'da), workspace'te push edilecek repo yok → push yok, gerekçeyi özetle yaz.

## Self-Review

1. **Spec coverage:** 5 aday özeti → final yanıtta; #1 seçim gerekçesi → PRD'de; 9 PRD bölümü → Task 2 Step 1+2. Kapalı.
2. **Placeholder scan:** Bu planda kod bloğu yok çünkü çıktı doküman; "doğrulama komutları" somut verildi. `grep` ile kontrol (Task 2 Step 3).
3. **Type consistency:** Dosya yolları iki task'ta aynı (`strategy/2026-W39-prd.md`). Tutarlı.

Varsayım: W39 slotu boş ve bu PRD W39'da inşa edilecek (W38 = Bizde, review'da).
