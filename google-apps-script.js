/**
 * GOOGLE APPS SCRIPT BACKEND FOR KLINIK TERAPI ANAK SURVEY FORM
 * 
 * Instructions:
 * 1. Open Google Sheets (https://sheets.google.com) and create a new Spreadsheet.
 * 2. Click Extensions -> Apps Script.
 * 3. Replace all code in Code.gs with this script.
 * 4. Click "Deploy" -> "New deployment".
 * 5. Select type: "Web app".
 * 6. Description: "Klinik Survey API".
 * 7. Execute as: "Me" (your email).
 * 8. Who has access: "Anyone" (Required for web form submissions).
 * 9. Click "Deploy" and authorize access.
 * 10. Copy the Web App URL and paste it into the form settings or app.js!
 */

// Target email specified by user
const NOTIFICATION_EMAIL = "kaishapuspito@gmail.com";

function doPost(e) {
  try {
    const contents = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("Respon Survey Klinik");
    
    // Create sheet tab if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet("Respon Survey Klinik");
    }

    const timestamp = contents.timestamp || new Date().toLocaleString("id-ID");
    const namaPengisi = contents.nama_pengisi || "-";
    const namaKlinik = contents.nama_klinik || "-";
    const peran = contents.peran_responden || "-";
    const wa = contents.nomor_wa || "-";
    const answers = contents.answers || {};

    // Build Headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      const headers = [
        "Timestamp",
        "Nama Pengisi",
        "Nama Klinik",
        "Jabatan / Peran",
        "WhatsApp / Email",
        "Q1. Data Pendaftaran Pasien",
        "Q2. Multi Orang Tua/Wali",
        "Q3. Dokumen Pasien Simpan",
        "Q4. ID Pasien Otomatis",
        "Q5. Wajib Assessment Awal",
        "Q6. Pelaksana Assessment",
        "Q7. Isi Catatan Assessment",
        "Q8. Laporan Assessment Ortuk",
        "Q9. Jenis Terapi Tersedia",
        "Q10. Multi Jenis Terapi",
        "Q11. Target Per Anak (IEP)",
        "Q12. Pantau Target Per Sesi",
        "Q13. Pengguna Sistem (Role)",
        "Q14. Hak Akses Menu Berbeda",
        "Q15. Proses Jadwal saat Ini",
        "Q16. Pola Jadwal Terapi",
        "Q17. Cegah Double Booking",
        "Q18. Penjadwalan Ruangan",
        "Q19. Shift Terapis",
        "Q20. Wajib Laporan Sesi",
        "Q21. Format SOAP",
        "Q22. Detail Laporan Sesi",
        "Q23. Laporan untuk Orang Tua",
        "Q24. Ada Paket Terapi",
        "Q25. Potong Kuota Otomatis",
        "Q26. Masa Berlaku Paket",
        "Q27. Variasi Paket",
        "Q28. Multi Paket Aktif",
        "Q29. Fitur Kasir POS",
        "Q30. Jenis Transaksi Catat",
        "Q31. Metode Pembayaran",
        "Q32. Invoice / Kwitansi Otomatis",
        "Q33. Pencatatan Piutang / DP",
        "Q34. Fitur Diskon Promo",
        "Q35. Jenis Laporan Owner",
        "Q36. Filter Tanggal Laporan",
        "Q37. Export Format Excel PDF",
        "Q38. Pengingat Otomatis Ortuk",
        "Q39. Kanal Notifikasi",
        "Q40. Widget Dashboard Utama",
        "Q41. Identitas Visual Branding",
        "Q42. Perangkat Pengguna",
        "Q43. Proses Manual Lain",
        "Q44. Migrasi Data Lama",
        "Q45. Custom Fitur Referensi",
        "Q46. Alur Pasien Lengkap"
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#FF5A5F").setFontColor("#FFFFFF");
    }

    // Convert array values to clean strings
    function parseVal(key, otherKey) {
      let val = answers[key] || "";
      if (Array.isArray(val)) val = val.join(", ");
      if (otherKey && answers[otherKey]) {
        val += (val ? " | Lainnya: " : "") + answers[otherKey];
      }
      return val || "-";
    }

    // Row Data Mapping
    const row = [
      timestamp,
      namaPengisi,
      namaKlinik,
      peran,
      wa,
      parseVal('q1_data_pendaftaran', 'q1_data_pendaftaran_other'),
      parseVal('q2_multi_orangtua'),
      parseVal('q3_dokumen_pasien', 'q3_dokumen_pasien_other'),
      parseVal('q4_id_otomatis'),
      parseVal('q5_wajib_assessment'),
      parseVal('q6_pelaksana_assessment', 'q6_pelaksana_assessment_other'),
      parseVal('q7_isi_assessment'),
      parseVal('q8_laporan_assessment'),
      parseVal('q9_jenis_terapi', 'q9_jenis_terapi_other'),
      parseVal('q10_multi_terapi'),
      parseVal('q11_target_per_anak'),
      parseVal('q12_pantau_tiap_sesi'),
      parseVal('q13_pengguna_sistem'),
      parseVal('q14_akses_berbeda'),
      parseVal('q15_proses_jadwal_saat_ini'),
      parseVal('q16_pola_jadwal'),
      parseVal('q17_prevent_double_booking'),
      parseVal('q18_jadwal_ruangan'),
      parseVal('q19_shift_terapis'),
      parseVal('q20_laporan_sesi'),
      parseVal('q21_format_soap'),
      parseVal('q22_detail_laporan_sesi', 'q22_detail_laporan_sesi_other'),
      parseVal('q23_laporan_orangtua'),
      parseVal('q24_ada_paket'),
      parseVal('q25_potong_kuota_otomatis'),
      parseVal('q26_paket_expired'),
      parseVal('q27_variasi_paket'),
      parseVal('q28_multi_paket_anak'),
      parseVal('q29_fitur_kasir'),
      parseVal('q30_jenis_transaksi'),
      parseVal('q31_metode_bayar', 'q31_metode_bayar_other'),
      parseVal('q32_kwitansi_otomatis'),
      parseVal('q33_catat_piutang'),
      parseVal('q34_fitur_diskon'),
      parseVal('q35_jenis_laporan'),
      parseVal('q36_filter_tanggal'),
      parseVal('q37_download_format'),
      parseVal('q38_pengingat_ortu'),
      parseVal('q39_kanal_notifikasi'),
      parseVal('q40_info_dashboard'),
      parseVal('q41_identitas_visual'),
      parseVal('q42_perangkat_akses'),
      parseVal('q43_proses_manual_lain'),
      parseVal('q44_migrasi_data_lama'),
      parseVal('q45_custom_fitur'),
      parseVal('q46_alur_pasien_lengkap')
    ];

    // Append to sheet
    sheet.appendRow(row);

    // Send HTML Email Notification to kaishapuspito@gmail.com
    sendNotificationEmail(timestamp, namaPengisi, namaKlinik, peran, wa, row);

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Data saved & email sent" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendNotificationEmail(timestamp, namaPengisi, namaKlinik, peran, wa, row) {
  const subject = `📋 [RESPON BARU] Survey Sistem Klinik - ${namaKlinik} (${namaPengisi})`;
  
  let htmlBody = `
    <div style="font-family: Arial, sans-serif; background-color: #0A0C10; color: #E2E8F0; padding: 20px; border-radius: 12px;">
      <div style="border-bottom: 2px solid #FF2A85; padding-bottom: 12px; margin-bottom: 16px;">
        <h2 style="color: #FF5A5F; margin: 0;">📋 Respon Pendataan Sistem Klinik Terapi Anak</h2>
        <p style="color: #94A3B8; font-size: 13px; margin-top: 4px;">Waktu Kirim: ${timestamp}</p>
      </div>

      <div style="background: rgba(255,255,255,0.05); padding: 14px; border-radius: 8px; margin-bottom: 20px; border: 1px solid rgba(255,255,255,0.1);">
        <h4 style="color: #FF2A85; margin-top: 0;">Identitas Responden:</h4>
        <p style="margin: 4px 0;"><strong>Nama Pengisi:</strong> ${namaPengisi}</p>
        <p style="margin: 4px 0;"><strong>Nama Klinik:</strong> ${namaKlinik}</p>
        <p style="margin: 4px 0;"><strong>Jabatan / Peran:</strong> ${peran}</p>
        <p style="margin: 4px 0;"><strong>Kontak WA / Email:</strong> ${wa}</p>
      </div>

      <h4 style="color: #FF5A5F; border-bottom: 1px solid #333; padding-bottom: 6px;">Ringkasan Jawaban 46 Pertanyaan:</h4>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #E2E8F0;">
  `;

  const questionTitles = [
    "Data Pendaftaran Pasien", "Multi Orang Tua/Wali", "Dokumen Pasien Simpan", "ID Pasien Otomatis",
    "Wajib Assessment Awal", "Pelaksana Assessment", "Isi Catatan Assessment", "Laporan Assessment Ortuk",
    "Jenis Terapi Tersedia", "Multi Jenis Terapi", "Target Per Anak (IEP)", "Pantau Target Per Sesi",
    "Pengguna Sistem (Role)", "Hak Akses Menu Berbeda", "Proses Jadwal saat Ini", "Pola Jadwal Terapi",
    "Cegah Double Booking", "Penjadwalan Ruangan", "Shift Terapis", "Wajib Laporan Sesi", "Format SOAP",
    "Detail Laporan Sesi", "Laporan untuk Orang Tua", "Ada Paket Terapi", "Potong Kuota Otomatis",
    "Masa Berlaku Paket", "Variasi Paket", "Multi Paket Aktif", "Fitur Kasir POS", "Jenis Transaksi Catat",
    "Metode Pembayaran", "Invoice / Kwitansi Otomatis", "Pencatatan Piutang / DP", "Fitur Diskon Promo",
    "Jenis Laporan Owner", "Filter Tanggal Laporan", "Export Format Excel PDF", "Pengingat Otomatis Ortuk",
    "Kanal Notifikasi", "Widget Dashboard Utama", "Identitas Visual Branding", "Perangkat Pengguna",
    "Proses Manual Lain", "Migrasi Data Lama", "Custom Fitur Referensi", "Alur Pasien Lengkap"
  ];

  for (let i = 0; i < questionTitles.length; i++) {
    const val = row[i + 5] || "-";
    const bg = i % 2 === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)";
    htmlBody += `
      <tr style="background-color: ${bg}; border-bottom: 1px solid rgba(255,255,255,0.05);">
        <td style="padding: 8px 10px; font-weight: bold; width: 40%; color: #94A3B8;">${i + 1}. ${questionTitles[i]}</td>
        <td style="padding: 8px 10px; color: #FFFFFF;">${val}</td>
      </tr>
    `;
  }

  htmlBody += `
      </table>
      <div style="margin-top: 20px; font-size: 12px; color: #94A3B8; text-align: center;">
        Sistem Pendataan Otomatis Klinik Terapi Anak
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  });
}
