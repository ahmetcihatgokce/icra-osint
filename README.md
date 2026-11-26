# İcraOSINT

Türkiye’de icra ve alacak takibi için kaynak atlası ve yerel belge masası. Türkçe Next.js / TypeScript uygulaması, D3 ile belgeli şirket ilişkileri. MIT lisansı.

## Çalıştırma

Node.js 24 ile `npm ci`, ardından `npm run dev`. Üretim için `npm run build` ve `npm start`. Vercel’de depoyu Next.js projesi olarak içe aktarın ve üretim dalı olarak main seçin. API anahtarı gerekmez.

## Kullanım

1. Kaynak atlasında kişi türünü ve erişim koşulunu seçin. Türkçe veya ASCII yazımla birden çok kelime arayabilirsiniz. Her kart erişim, kullanım amacı, hukuki sınır ve kurum bağlantısını içerir.
2. Belge masasında kendi cihazınızdan hukuka uygun edinilmiş bir sicil PDF’si seçin. PDF.js sayfa metnini yerel olarak çıkarır. SHA-256 değerini güvenilir kopyanın özetiyle karşılaştırın. Bu kontrol imzayı doğrulamaz. Taranmış belgeler için OCR ayrıca gerekir.
3. Şirket, olay, tarih ve gerekiyorsa ilişkili şirketi girin. Belgeyle karşılaştırılmış kayıtta, seçili sayfadan birebir alıntı gerekir. Kaynak seçiminde belgenin düzenleyicisini esas alın. Uygulama kullanıcının hukuki veya anlamsal yorumunu doğrulamaz.
4. Kronolojide tüm kayıtlar, ilişki haritasında yalnız dayanağı belirtilen ilişkiler yer alır. Bir düğüm seçerek dayanak sayfasını görüntüleyin. Yazdır ekranında PDF olarak kaydedebilir veya gerçek DOCX / XLSX indirebilirsiniz.
5. Sekme kapanınca belge ve araştırma kayıtları silinir. Çıktı aldığınız dosyaların saklama ve paylaşımını siz yönetirsiniz. Tema tercihi cihazda saklanır.

## Kaynak ve bakım

Kaynaklar [katalogda](app/catalog.json), işlem adımları ve mevzuat bağlantıları [rehberde](app/guide.tsx). İlan erişiminin açık olması kişisel verilerin farklı bir amaçla yayımlanmasına izin vermez. Rol ve kimlik isteyen sistemler yalnızca bağlantı olarak açılır. Dosya dışına aktarılacak bilgileri gereklilik ve sır saklama yükümlülüğü bakımından gözden geçirin.

[OSINT Framework](https://osintframework.com/) kaynak ağacı, arama ve erişim etiketleri için incelendi. [SpiderFoot](https://github.com/smicallef/spiderfoot) ilişkilerin görselleştirilmesi bakımından karşılaştırıldı. Bu projede dış hedef taraması yoktur. Her ilişki kullanıcı tarafından belge ve alıntıyla kurulur.

`npm run links` yalnızca katalogdaki sabit kurum URL’lerini denetler. 404/410 hata, ağ kesintisi elle kontrol sonucu üretir. HTTP yanıtı hukuki içerik veya üyelik koşullarının doğrulaması değildir. Portal koşulları ve ücretler işlem tarihinde tekrar kontrol edilmelidir.

## Gizlilik

Belge işleme ve dışa aktarma tarayıcıda yapılır. UYAP bağlantısı, dosya yükleme uç noktası, izleme kodu veya uzak OCR servisi yoktur. Dış kurum bağlantıları ayrı sekmede açılır. Tüzel kişi belgelerinde yer alan gerçek kişilerin verileri de korunmalıdır.
