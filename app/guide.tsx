import { useState } from "react";

const iik = "https://www.mevzuat.gov.tr/MevzuatMetin/1.3.2004.pdf";
const tk = "https://www.mevzuat.gov.tr/MevzuatMetin/1.3.7201.pdf";
const kvkk = "https://www.kvkk.gov.tr/Icerik/7589/2022-1281";
const harc = "https://mevzuat.adalet.gov.tr/mevzuat/103011";
const stages = [
  {
    title: "Takip öncesi kontrol",
    question: "Alacak kime ait, kimden ve ne zaman istenebilir?",
    steps: [
      "Müvekkilin temsil yetkisini ve vekâlet kapsamını kontrol edin. Şirketin güncel unvanını ve sicilini doğrulayın. Şirket borcunda yönetici veya ortağı şahsen takip etmek için ayrıca sorumluluk dayanağı arayın.",
      "Alacağın sebebini, muacceliyet ve temerrüt tarihlerini, önceki ödemeleri ve varsa önceki takipleri karşılaştırın. Zamanaşımı ve hak düşürücü süreyi alacak türüne göre inceleyin.",
      "Asıl alacak, işlemiş faiz ve masrafları ayrı hesaplayın. Faizin türünü, oranını, başlangıcını ve dayanağını kaydedin. Ödeme veya mahsup sonrası kalan tutarı müvekkille teyit edin."
    ],
    notes: [
  {
    "title": "Yetki itirazını baştan değerlendirin",
    "body": "Genel haciz yolunda borçlu hem yetkiye hem borca itiraz ediyorsa bunları birlikte ileri sürer. Alacaklı vekili olarak önce takibin açıldığı yerin yetki dayanağını belirleyin. Sonraki başvuruda bu itirazın da incelenmesi gerekebilir.",
    "article": "50",
    "official": "https://mevzuat.adalet.gov.tr/ictihat/1186890900",
    "reading": "https://barandogan.av.tr/iik-50-icra-dairesinin-yetkisine-itiraz-yargitay-kararlari"
  }
],
    risk: "Aynı alacak için açık takip veya kısmi ödeme varken tam tutar üzerinden yeni takip açılması mükerrer ya da fazla talep itirazına yol açabilir.",
    refs: [["İİK m.50, 58", iik], ["TBK · temerrüt ve zamanaşımı", "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6098.pdf"]]
  },
  {
    title: "Takip yolunu seçme",
    question: "Talebin niteliği hangi usulü gerektiriyor?",
    steps: [
      "Genel haciz yoluyla ilamsız takipte para veya teminat alacağını, yetkiyi ve varsa özel takip zorunluluğunu inceleyin. Ödeme emrine süresinde itiraz takibi itiraz edilen kısım yönünden durdurur.",
      "İlamlı takipte hüküm fıkrasını esas alın. Tarafları, edimi ve faiz başlangıcını hükümle eşleştirin. Kararın icra edilebilirliğini, kesinleşme gerekip gerekmediğini ve icranın geri bırakılması kararını ayrıca inceleyin.",
      "Kambiyo takibinde senet vasfı, vade, ibraz, ciro zinciri, takip hakkı ve aslın sunulması koşullarını denetleyin. Rehinli alacakta önce rehne başvurma kuralını ve kanuni istisnalarını kontrol edin.",
      "Kira alacağıyla birlikte tahliye isteniyorsa ödeme emrinde tahliye ihtarını ve ilgili kira türünün ödeme süresini kontrol edin. Ödeme süresi ile itiraz süresini ayrı izleyin."
    ],
    notes: [
  {
    "title": "Noter belgesiyle ilamlı takip",
    "body": "Para borcunun ikrarını içeren ve noter tarafından düzenleme biçiminde hazırlanan senet m.38 kapsamında olabilir. Yalnız imza onayı taşıyan sözleşmeyi aynı kapsamda kabul etmeden önce senedin düzenleniş biçimini ve edimini kontrol edin.",
    "article": "38",
    "official": "https://mevzuat.adalet.gov.tr/mevzuat/102993",
    "reading": "https://barandogan.av.tr/iik-38-ilam-mahiyetinde-belgeler-yargitay-kararlari"
  }
],
    risk: "Genel haciz, kambiyo ve tahliye yollarının itiraz mercileri, süreleri ve itirazın etkileri farklıdır. Bir yolun takvimini diğerine taşımayın.",
    refs: [["İİK m.32, 45, 58–66, 167–170/a, 269 vd.", iik]]
  },
  {
    title: "Takibi açma",
    question: "İlk takip talebinde hangi alanlar karşılaştırılır?",
    steps: [
      "Yetkili icra dairesini ve yetki kuralının dayanağını belirleyin. UYAP Avukat Portal veya ilgili müdürlük üzerinden doğru takip türünü seçin.",
      "Alacaklı, borçlu, vekil ve varsa kanuni temsilci bilgilerini kontrol edin. Talep sonucuna asıl alacağı, işlemiş faizi ve bundan sonra istenen faizi doğru kalemlerle girin. Yabancı para alacağında talep ve kur tercihini ayrıca inceleyin.",
      "Takip yolunun gerektirdiği ekleri ve asıl sunma koşulunu kontrol edin. Başvurma harcı, uygulanacak peşin harç ve tebligat giderini güncel tarifeye göre yatırın. Dosya numarası ve makbuzları kaydedin.",
      "Müdürlüğün düzenlediği ödeme veya icra emrini takip talebiyle satır satır karşılaştırın. Tebliğe çıkmadan önce taraf, tutar, faiz, ödeme süresi ve ihtar hatalarının düzeltilmesini isteyin."
    ],
    notes: [
  {
    "title": "Talebin ve kararın dosyadaki izi",
    "body": "Müdürlükten belirli bir işlem istediğinizde talep tarihini ve verilen kararı dosyada bulun. Kararın gerekçesini ve öğrenme tarihini kaydedin. Şikâyet gerekirse hangi işlem veya ret kararının inceleneceği bu kayıtlardan anlaşılır.",
    "article": "8, 16",
    "official": "https://mevzuat.adalet.gov.tr/mevzuat/102993",
    "reading": "https://barandogan.av.tr/iik-8-madde-icra-iflas-kanunu-yargitay-kararlari"
  }
],
    risk: "Portalda talebin kaydedilmesi tebligatın gerçekleştiğini göstermez. Dosyadaki son işlem ile tebliğ sonucunu ayrı kontrol edin.",
    refs: [["İİK m.58–61", iik], ["Avukat Portal", "https://avukat.uyap.gov.tr/"], ["Harçlar Kanunu ve (1) sayılı tarife", harc]]
  },
  {
    title: "Tebligat, süre ve itiraz",
    question: "Haciz istemeden önce takip hangi aşamada?",
    steps: [
      "Muhatabın tebligat adresini ve elektronik tebligat zorunluluğunu kontrol edin. Fizikî tebligatta mazbatayı, elektronik tebligatta UETS delil kaydını okuyun. Elektronik tebligat, adrese ulaştığı tarihi izleyen beşinci günün sonunda yapılmış sayılır.",
      "Genel hacizde ödeme emrine itiraz kural olarak tebliğden itibaren yedi gün içinde icra dairesine yapılır. Kambiyo takibinde borca veya imzaya itiraz için kural olarak beş gün içinde icra mahkemesine başvurulur; ödeme süresi on gündür.",
      "Genel hacizde itirazın kapsamını ve alacaklıya tebliğini kaydedin. Şartları varsa itirazın kaldırılmasında altı aylık, itirazın iptali davasında bir yıllık süreyi itirazın alacaklıya tebliğinden itibaren ayrı değerlendirin. Dava yolunda görev, yetki ve uygulanıyorsa dava şartı arabuluculuğu inceleyin.",
      "Süre hesabında başlangıç olayını, son günü ve resmî tatili kontrol edin. Haciz talebinden önce itiraz, tedbir, durdurma, konkordato veya iflas kararı bulunup bulunmadığını dosyadan inceleyin."
    ],
    notes: [
  {
    "title": "Kısmi itiraz veya imza inkârı",
    "body": "Genel haciz dosyasında itiraz dilekçesini kalem kalem okuyun. Kısmi itirazda borçlu itiraz ettiği kısmı ve miktarını açıkça göstermelidir. Adi senetteki imzanın inkârı ayrıca ve açıkça belirtilmelidir. Takibe devam talebinden önce itirazın hangi tutarı kapsadığını belirleyin.",
    "article": "62, 66",
    "official": "https://mevzuat.adalet.gov.tr/ictihat/1218215200",
    "reading": "https://barandogan.av.tr/iik-62-madde-odeme-emrine-itiraz-yargitay-kararlari"
  },
  {
    "title": "İtirazdan sonra doğru başvuru",
    "body": "İmzası kabul edilmiş bir borç ikrarı veya m.68 kapsamındaki başka bir belge varsa kesin kaldırma yolunu inceleyin. Adi senette imza açıkça inkâr edilmişse m.68/a kapsamında geçici kaldırma gündeme gelebilir. Alacağın genel hükümlere göre ispatı gerekiyorsa m.67 uyarınca itirazın iptali yolunun koşullarını değerlendirin.",
    "article": "67, 68, 68/a",
    "official": "https://mevzuat.adalet.gov.tr/mevzuat/102993",
    "reading": "https://barandogan.av.tr/blog/borclar-hukuku/itirazin-kaldirilmasi-davasi"
  }
],
    risk: "İade edilmiş tebligattan veya UETS gönderim tarihinden hareketle takibi kesinleşmiş kabul etmek erken haciz talebine yol açabilir.",
    refs: [["İİK m.19, 62, 66–68, 168–170", iik], ["Tebligat Kanunu m.7/a, 21, 32", tk], ["PTT · elektronik tebligat", "https://www.ptt.gov.tr/e-tebligat-sss"]]
  },
  {
    title: "Tahsil yöntemleri ve haciz",
    question: "Hangi tahsil yolu dosyadaki bilgiyle destekleniyor?",
    steps: [
      "İradi ödeme veya taksit görüşmesinde güncel bakiye, ödeme günü, mahsup ve masrafları yazılı netleştirin. Müvekkilin talimatını alın. Adi ödeme planıyla icra dosyasında kanuni şartlara bağlı ödeme taahhüdünün sonuçlarını ayrı değerlendirin.",
      "Banka, araç veya taşınmaz yönünden dosya aşamasının izin verdiği resmî sorgu ve haciz kanallarını kullanın. Haczi istenecek hak veya malı ve dosya bakiyesini belirtin. Maaş haczinde ücretin niteliğini, kesinti sınırını ve önceki haciz sırasını kontrol edin.",
      "Üçüncü kişideki alacak için İİK m.89 kapsamında muhatabı ve olası alacak ilişkisini somutlaştırın. Sözleşme veya hakediş kaydının güncelliğini inceleyin. İhbarnameye cevap ve itirazı kaydedip sonraki işlemi buna göre değerlendirin.",
      "Fiilî hacizde adres, mülkiyet ve zilyetlik bilgilerini kontrol edin. Konutta haciz için m.79/a kapsamındaki karar ve onay sürecini, haczedilemeyen malları ve üçüncü kişinin istihkak iddiasını gözetin. Haciz miktarını asıl alacak, faiz ve masraflarla ölçülü tutun."
    ],
    notes: [
  {
    "title": "Haciz isteme süresini ayrı izleyin",
    "body": "Ödeme emrinin tebliğini haciz isteme takvimine yazın. Bir yıllık sürenin hesabında itiraz, dava veya dosyada yapılan taksit sözleşmesi nedeniyle hesaba katılmayacak dönemleri m.78 üzerinden belirleyin. Satış isteme süresi için ayrıca haciz tarihini kaydedin.",
    "article": "78, 106",
    "official": "https://mevzuat.adalet.gov.tr/mevzuat/102993",
    "reading": "https://barandogan.av.tr/iik-78-madde-haciz-talebi-yargitay-kararlari"
  },
  {
    "title": "89/1 cevabından sonra",
    "body": "Birinci ihbarnameye süresinde itiraz edilmişse itirazın içeriğini inceleyin. İkinci ihbarname, ilkine süresinde itiraz edilmemesinin sonucudur. İlk cevabın gerçeğe aykırı olduğunu ileri süren alacaklı için m.89/4 ayrı bir başvuru ve ispat yolu düzenler. Her muhatabın tebliğ ve cevap tarihini ayrı takip edin.",
    "article": "89",
    "official": "https://mevzuat.adalet.gov.tr/ictihat/737004000",
    "reading": "https://barandogan.av.tr/iik-89-madde-icra-iflas-kanunu-yargitay-kararlari"
  },
  {
    "title": "Haczedilen mal üçüncü kişinin elindeyse",
    "body": "Tutanağa malın nerede ve kimin fiilî hâkimiyetinde bulunduğunu, ileri sürülen hakkı ve beyanları yazdırın. M.99 uygulanıyorsa müdürlük, üçüncü kişiye karşı istihkak davası açması için alacaklıya yedi gün verir. Süresinde dava açılmazsa o kişinin iddiası kabul edilmiş sayılır. Borçlunun zilyetliğindeki malda m.96–97 yolunu ayrıca inceleyin.",
    "article": "96–99",
    "official": "https://mevzuat.adalet.gov.tr/mevzuat/102993",
    "reading": "https://barandogan.av.tr/iik-99-madde-icra-iflas-kanunu-yargitay-kararlari"
  },
  {
    "title": "Devir saptandığında tasarrufun iptali",
    "body": "Alacağın doğumunu, devir tarihini, takibin kesinleşmesini ve geçici veya kesin aciz belgesini birlikte kontrol edin. M.277 ve devamındaki dava bakımından iptal sebebini ve m.284’teki beş yıllık hak düşürücü süreyi ayrı değerlendirin. Talebin amacı, şartları oluştuğunda devredilen mal üzerinden alacağın cebren tahsilidir.",
    "article": "277–284",
    "official": "https://mevzuat.adalet.gov.tr/ictihat/801296000",
    "reading": "https://barandogan.av.tr/tasarrufun-iptali-davasi"
  }
],
    risk: "Borçlunun yakını olması, ortak adres veya eski bir ihale ilanı tek başına üçüncü kişiye borç açıklamak ya da onun malını borçlunun malı saymak için yeterli dayanak sağlamaz.",
    refs: [["İİK m.78–89, 96–99, 111, 355–356", iik], ["KVKK Kurulu · haciz ihbarnamesi ve borçlu yakını", "https://www.kvkk.gov.tr/Icerik/7262/2021-1069"]]
  },
  {
    title: "Satış ve paranın ödenmesi",
    question: "Haczedilen mal tahsilata nasıl dönüşür?",
    steps: [
      "Haciz tarihini ve satış isteme süresini mal bazında izleyin. İİK m.106 uyarınca kural olarak hacizden itibaren bir yıl içinde satış istenir. Kıymet takdiri ve satış giderlerini, motorlu kara araçlarındaki özel muhafaza koşullarını ve eksik avans bildirimlerini kontrol edin.",
      "Kıymet takdirinin tebliği, satış ilanı, elektronik artırma ve ihalenin kesinleşme aşamalarını dosyadan izleyin. Gider ve süre eksikliğinin satış talebine ve hacze etkisini m.106 ve 110 kapsamında inceleyin.",
      "Satış bedeli üzerinde rehin, öncelikli alacak, başka haciz veya sıra cetveli olup olmadığını kontrol edin. Müvekkile ödeme bildirirken fiilen tahsil edilen tutarı ve dağıtıma ayrılan tutarı ayırın."
    ],
    notes: [
  {
    "title": "İhalenin feshi ihtimali",
    "body": "İhale tutanağını, satış ilanının tebliğini ve ileri sürülen usulsüzlüğü birlikte inceleyin. Önce başvuracak kişinin m.134 kapsamında olup olmadığını belirleyin. Kural olarak yedi günlük sürenin başlangıcı ihale tarihidir. İlanın tebliğ edilmemesi, malın esaslı niteliğindeki hatanın veya ihaleye fesadın sonradan öğrenilmesi hâllerini ayrıca kontrol edin.",
    "article": "134",
    "official": "https://mevzuat.adalet.gov.tr/mevzuat/102993",
    "reading": "https://barandogan.av.tr/blog/medeni-hukuk/ihalenin-feshi-davasi-nedenleri"
  }
],
    risk: "Haciz konulması tahsilat anlamına gelmez. Satış avansı ve süreler izlenmezse haciz düşebilir.",
    refs: [["İİK m.106, 110, 111/b, 134, 138–142", iik], ["UYAP e-Satış", "https://esatis.uyap.gov.tr/"]]
  },
  {
    title: "Şikâyet riskleri ve mesleki sınırlar",
    question: "İşlemden veya iletişimden önce ne kontrol edilmeli?",
    steps: [
      "İcra müdürlüğü işlemine karşı İİK m.16 şikâyeti, borca itiraz, baroya disiplin başvurusu ve kişisel veri şikâyeti ayrı başvuru yollarıdır. Müdürlük işleminde öğrenme tarihini ve işlemi kaydedin. Genel şikâyet süresi yedi gündür; bir hakkın yerine getirilmemesi veya sebepsiz sürüncemede bırakılması hâlinde her zaman şikâyet mümkündür.",
      "Arama veya mesajdan önce muhatabın kimliğini ve iletişim bilgisinin kaynağını doğrulayın. Aileye, komşuya veya iş arkadaşına borç bilgisini açıklamayın. İşverene kanuni haciz yazısı iletilmesi ile işyerinde borcun duyurulmasını ayırın.",
      "Ödeme görüşmesinde dosya numarası, doğru bakiye ve yasal seçeneklerle sınırlı kalın. Tehdit, küçük düşürme, kesinleşmemiş işlemi gerçekleşmiş gibi sunma veya üçüncü kişiyi baskı aracı olarak kullanmaktan kaçının.",
      "Talebin dayanağını, müvekkil talimatını, tebligatı ve ödeme bildirimini tarihleriyle dosyada tutun. Hata fark edilirse ilgili talebin düzeltilmesini veya kaldırılmasını gecikmeden isteyin ve sonucu izleyin."
    ],
    notes: [
  {
    "title": "Şikâyet sırasında dosya işlemeye devam eder mi?",
    "body": "Genel kural olarak şikâyet başvurusu tek başına icrayı durdurmaz. Örneğin haciz işlemine karşı şikâyet verilmişken satış günü yaklaşıyorsa, mahkemenin durdurma kararı verip vermediğini, kararın hangi işlemi kapsadığını ve özel hüküm bulunup bulunmadığını kontrol edin.",
    "article": "22",
    "official": "https://mevzuat.adalet.gov.tr/ictihat/720101400",
    "reading": "https://barandogan.av.tr/iik-16-madde-icra-iflas-kanunu-sikayet-yargitay-kararlari"
  }
],
    risk: "Şikâyet riskini azaltan pratik, her talep için yetkiyi, muhatabı, tutarı, dayanağı ve tarihi işlemden önce doğrulamaktır.",
    refs: [["İİK m.16–22", iik], ["KVKK Kurulu · borcun üçüncü kişiye açıklanması", kvkk], ["Avukatlık Kanunu m.34, 36", "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.1136.pdf"]]
  },
  {
    title: "Tahsil sonrası dosya kapanışı",
    question: "Dosya kapanırken hangi işlemler açık kalabilir?",
    steps: [
      "Ödeme tarihine göre dosya hesabını alın. Ana para, faiz, gider, harç, vekâlet ücreti ve önceki tahsilatları karşılaştırın. Kısmi ödeme varsa mahsup sonrası kalan bakiyeyi dosyaya doğru bildirin.",
      "Haricen ödeme yapıldıysa tarihi ve miktarı müdürlüğe bildirin. Tam tahsil, kısmi tahsil ve takipten vazgeçmenin işlem ve harç sonuçlarını ayrı değerlendirin. Feragat, ibra veya sulh söz konusuysa vekâletnamedeki özel yetkiyi ve müvekkil talimatını kontrol edin.",
      "Tam ödeme sonrası dosyanın kapanış işlemini, hacizlerin kaldırılmasına ilişkin talepleri ve ilgili sicil veya kuruma bildirimin sonucunu izleyin. Maaş kesintisinin ve diğer tahsilatların sürmediğini kontrol edin.",
      "Müvekkile tahsilat, gider, kesinti ve gönderilen net tutarı gösteren hesap verin. Dekontları eşleştirin. Bakiye, açık haciz, bekleyen talep ve müvekkile aktarılacak para kalıp kalmadığını son kez kontrol edin."
    ],
    notes: [
  {
    "title": "Borç olmadığı ileri sürülerek geri ödeme istenirse",
    "body": "Borçlu, takibe itiraz etmediği veya itirazı kaldırıldığı için borçlu olmadığı parayı tamamen ödemek zorunda kaldığını ileri sürebilir. M.72/7 kapsamındaki istirdat davasında bir yıllık süre ödeme tarihinden işler. Kapanış hesabında ödemenin tarihi, tutarı ve hangi borca mahsup edildiği açıkça görülmelidir.",
    "article": "72/7",
    "official": "https://mevzuat.adalet.gov.tr/ictihat/1054290300",
    "reading": "https://barandogan.av.tr/blog/borclar-hukuku/menfi-tespit-davasi-ve-istirdat-davasi-nedir-iik-72"
  }
],
    risk: "Tam ödemeden sonra haczin veya maaş kesintisinin sürmesi fazla tahsilat doğurabilir. Kapanışı dosya ekranı ve ilgili kurumun işlem sonucuyla teyit edin.",
    refs: [["Harçlar Kanunu m.23 ve (1) sayılı tarife", harc], ["HMK m.74 · özel yetkiler", "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6100.pdf"], ["Avukatlık Kanunu", "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.1136.pdf"]]
  }
];

export default function Guide() {
  const [index, select] = useState(0);
  const stage = stages[index];
  return <article className="journey"><div className="hero"><div><small>YENİ AVUKATLAR İÇİN</small><h1>İcra takibi rehberi<span>.</span></h1><p>İlk takip talebinden tahsilata ve dosyanın kapanışına kadar uygulama adımları.</p></div></div>
    <div className="columns"><nav aria-label="Takip aşamaları" className="tree stages">{stages.map((s,i)=><button key={s.title} aria-current={i===index?"step":undefined} onClick={()=>select(i)}>{i+1}. {s.title}</button>)}</nav><section className="card" aria-live="polite"><small>AŞAMA {index+1} / {stages.length}</small><h2>{stage.title}</h2><h3>{stage.question}</h3><ol>{stage.steps.map(s=><li key={s}>{s}</li>)}</ol><h3>Sık karşılaşılan risk</h3><p>{stage.risk}</p><h3>Uygulamada karşılaşılan sorular</h3>{stage.notes.map(note=><details key={note.title}><summary>{note.title}</summary><p>{note.body}</p><p><a target="_blank" rel="noreferrer" href={note.official}>Resmî kaynak · İİK m.{note.article}</a> · <a target="_blank" rel="noreferrer" href={note.reading}>İlgili yazı · Av. Baran Doğan</a></p></details>)}<h3>Resmî dayanaklar</h3><ul>{stage.refs.map(([name,url])=><li key={url}><a href={url} target="_blank" rel="noreferrer">{name} ↗</a></li>)}</ul>{index+1<stages.length&&<button className="primary" onClick={()=>select(index+1)}>Sonraki aşama →</button>}</section></div></article>
}
