# Privacy Policy for Subwise

**Last Updated:** September 16, 2026  
**Effective Date:** September 16, 2026  

At **Subwise** (developed by cnrsbtogll), we believe privacy is a fundamental human right. Subwise is designed from the ground up to be a **privacy-first, local-only** subscription and renewal tracker. 

We do not collect, transmit, sell, or monetize your personal data. Your financial details and subscription information never leave your device.

---

## 1. Information We Do NOT Collect

Unlike traditional financial management tools:
- **No Bank Account Access:** We never ask for, access, or connect to your bank accounts, credit cards, or financial institutions.
- **No User Accounts:** You do not need to register, log in, or provide an email address, phone number, or name.
- **No Cloud Storage or Remote Servers:** We do not operate remote databases or backend servers to store your subscription entries.
- **No Third-Party Trackers or Analytics:** We do not include third-party tracking SDKs, advertising identifiers (IDFA/GAID), or analytics services (e.g., Google Analytics, Meta Pixel, Firebase Analytics).

---

## 2. Information Stored on Your Device

All data you enter into Subwise is stored **strictly locally** on your device using encrypted native storage (`AsyncStorage`):
- Subscription names and service labels
- Pricing, currencies, and billing cycles
- Next renewal dates and notes
- Custom notification preferences and selected icons/colors

Because this data resides solely on your physical device, we (the developer) cannot view, access, recover, or alter your data.

---

## 3. Device Permissions

Subwise requests only the minimum permissions necessary to provide its core features:

- **Notifications (`expo-notifications`):**  
  Used exclusively to schedule **local notifications** on your device to alert you before an upcoming renewal (e.g., 1 day or 7 days prior). These alerts are scheduled locally by the operating system; no push notification servers or tokens are used.
- **Sharing (`expo-sharing`):**  
  Used only when you explicitly trigger the **Export CSV** feature to save or share your subscription list.

You can grant or revoke these permissions at any time via your device's system settings.

---

## 4. Data Retention, Backups, and Deletion

- **Data Retention:** Your data remains stored on your device for as long as the application is installed.
- **Data Deletion:** You can delete individual subscriptions at any time within the app. Uninstalling the Subwise application immediately and permanently removes all stored data from your device.
- **Backups:** If you use device-level cloud backups (such as Apple iCloud Backup or Google Drive Device Backup), your local application data may be included in your personal encrypted device backups according to your operating system's settings.

---

## 5. Children's Privacy

Subwise is not directed to children under the age of 13. Since we do not collect any personal data whatsoever, we do not knowingly collect or maintain personal information from children.

---

## 6. App Store & Google Play Privacy Declarations

In accordance with Apple App Store Connect and Google Play Console policies:
- **Data Collection:** Data Not Collected.
- **Tracking:** No data is used to track you across apps or websites owned by other companies.

---

## 7. Changes to This Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. Any updates will be posted directly to this GitHub repository with an updated "Last Updated" date.

---

## 8. Contact Us

If you have any questions, feedback, or concerns regarding this Privacy Policy or Subwise, please reach out:

- **GitHub Issues:** [https://github.com/cnrsbtogll/Subwise/issues](https://github.com/cnrsbtogll/Subwise/issues)
- **Developer / Organization:** [https://github.com/cnrsbtogll](https://github.com/cnrsbtogll)

---

<details>
<summary><strong>🇹🇷 Türkçe Özet / Gizlilik Politikası Özeti</strong></summary>

### Subwise Gizlilik Politikası (Özet)

**Son Güncelleme:** 16 Eylül 2026

**Subwise**, gizlilik öncelikli (privacy-first) ve tamamen yerel (offline/local-first) çalışan bir abonelik ve yenileme takip uygulamasıdır.

1. **Veri Toplamama İlkesi:** Banka hesaplarınıza, kartlarınıza erişilmez. Hesap oluşturmanız, e-posta veya şifre vermeniz gerekmez. Verileriniz hiçbir harici sunucuya veya buluta aktarılmaz.
2. **Yerel Depolama:** Eklediğiniz tüm abonelikler, tutarlar, para birimleri ve tarihler yalnızca cihazınızın kendi güvenli yerel hafızasında saklanır. Geliştirici dahil hiç kimse bu verilere erişemez.
3. **İzinler:**
   - **Bildirimler:** Yalnızca cihaz üzerinde yerel olarak yaklaşan yenilemeleri hatırlatmak için kullanılır. Harici sunucu kullanılmaz.
   - **Paylaşım:** Yalnızca siz "CSV Dışa Aktar" dediğinizde dosyayı paylaşmanız için kullanılır.
4. **Üçüncü Parti Takipçiler / Reklamlar:** Uygulamada reklam ağı, Google Analytics, Firebase veya benzeri herhangi bir kullanıcı takip SDK'sı bulunmamaktadır.
5. **Veri Silme:** Uygulamayı cihazınızdan sildiğinizde veya abonelikleri sildiğinizde tüm veriler kalıcı olarak cihazınızdan silinir.
6. **İletişim:** Sorularınız ve geri bildirimleriniz için [GitHub Issues](https://github.com/cnrsbtogll/Subwise/issues) üzerinden iletişime geçebilirsiniz.

</details>
