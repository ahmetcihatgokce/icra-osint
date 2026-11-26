export default function Guide() {
  return (
    <article className="guide">
      <small>UYGULAMA REHBERİ</small>
      <h2>Dosyadan kaynağa</h2>
      <p>Türkiye’de icra ve alacak takibi için araştırma sırası</p>
      {[
        [
          "Araştırma sorusunu yazın",
          "Dosya türünü, tarafı, yetkinizi ve araştırdığınız belirli olguyu belirleyin. Yalnız bu sorunun gerektirdiği bilgileri alın. KVKK m.4, 5 ve 12 kapsamında işleme şartı, doğruluk, ölçülülük ve güvenliği ayrı ayrı değerlendirin.",
          "https://www.mevzuat.gov.tr/mevzuatmetin/1.5.6698.pdf",
          "6698 sayılı Kanun",
        ],
        [
          "Tarafın kimliğini eşleştirin",
          "Şirket için unvanı, sicil müdürlüğünü ve sicil numarasını karşılaştırın. Şahıs işletmesi sahibini şirket tüzel kişisiyle karıştırmayın. Gerçek kişiler için taraf veya vekil sıfatıyla erişebildiğiniz dosya ve resmî başvuru kanallarını kullanın.",
          "https://dabm.ticaret.gov.tr/ic-ticaret/ticaret-sicili",
          "Ticaret Bakanlığı",
        ],
        [
          "İlan zincirini okuyun",
          "Kuruluş ilanından başlayıp unvan, ortaklık, temsil, birleşme ve tasfiye değişikliklerini tarihleriyle izleyin. Tescil, karar ve ilan tarihleri farklı olabilir. Her olay için belgenin sayfasını ve dayanak cümlesini kaydedin.",
          "https://ticaretsicil.gov.tr/",
          "Türkiye Ticaret Sicili Gazetesi",
        ],
        [
          "Haciz talebinden önce dosyayı kontrol edin",
          "Takip türünü, tebligatı, itirazı, kesinleşme ve durma durumunu dosyadan kontrol edin. İİK m.78 ve devamını somut takip açısından inceleyin. Haczedilmezlik ve üçüncü kişinin mülkiyet iddiası ayrıca değerlendirilir.",
          "https://www.mevzuat.gov.tr/MevzuatMetin/1.3.2004.pdf",
          "İcra ve İflas Kanunu",
        ],
        [
          "Üçüncü kişi alacağını değerlendirin",
          "İİK m.89 bakımından ihale veya sözleşme kaydını, güncel borç ilişkisini ve üçüncü kişinin kimliğini ayırın. Ortak adres, benzer unvan veya ihale sonucu tek başına üçüncü kişinin borçluya borcu olduğunu göstermez.",
          "https://ekap.kik.gov.tr/ekap/ortak/ihalearama/index.html",
          "EKAP",
        ],
        [
          "Konkordato veya iflas ilanını izleyin",
          "Mahkeme ve esas numarası üzerinden sonraki kararları bulun. Mühletin etkisi için İİK m.288, 294 ve 295’i karar tarihi ve alacak türüyle birlikte değerlendirin. İflasta tasfiye dosyasındaki ilanı ve başvuru usulünü kontrol edin.",
          "https://www.ilan.gov.tr/",
          "Resmî ilanlar",
        ],
        [
          "Kanıt ve raporu koruyun",
          "Dosyanın aslı ile çalışma kopyasını ayırın. Özet değerini güvenilir kopyayla karşılaştırın. İmza veya barkodun geçerliliğini düzenleyenin kanalında kontrol edin. Avukatlık Kanunu m.36 kapsamındaki sırları ve ilgisiz kişisel verileri rapordan çıkarın. Paylaşım ve saklama süresini dosya amacına göre belirleyin.",
          "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.1136.pdf",
          "Avukatlık Kanunu",
        ],
      ].map(([title, body, url, label], i) => (
        <section key={title}>
          <small>ADIM {i + 1}</small>
          <h3>{title}</h3>
          <p>{body}</p>
          <a href={url} rel="noreferrer" target="_blank">
            {label} ↗
          </a>
        </section>
      ))}
    </article>
  );
}
