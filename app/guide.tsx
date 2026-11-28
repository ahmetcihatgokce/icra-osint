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
    risk: "Tam ödemeden sonra haczin veya maaş kesintisinin sürmesi fazla tahsilat doğurabilir. Kapanışı dosya ekranı ve ilgili kurumun işlem sonucuyla teyit edin.",
    refs: [["Harçlar Kanunu m.23 ve (1) sayılı tarife", harc], ["HMK m.74 · özel yetkiler", "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6100.pdf"], ["Avukatlık Kanunu", "https://www.mevzuat.gov.tr/MevzuatMetin/1.5.1136.pdf"]]
  }
];

export default function Guide() {
  const [index, select] = useState(0);
  const stage = stages[index];
  return <article className="journey"><div className="hero"><div><small>YENİ AVUKATLAR İÇİN</small><h1>İcra takibi rehberi<span>.</span></h1><p>İlk takip talebinden tahsilata ve dosyanın kapanışına kadar uygulama adımları.</p></div></div>
    <div className="columns"><nav aria-label="Takip aşamaları" className="tree stages">{stages.map((s,i)=><button key={s.title} aria-current={i===index?"step":undefined} onClick={()=>select(i)}>{i+1}. {s.title}</button>)}</nav><section className="card" aria-live="polite"><small>AŞAMA {index+1} / {stages.length}</small><h2>{stage.title}</h2><h3>{stage.question}</h3><ol>{stage.steps.map(s=><li key={s}>{s}</li>)}</ol><h3>Sık karşılaşılan risk</h3><p>{stage.risk}</p><h3>Resmî dayanaklar</h3><ul>{stage.refs.map(([name,url])=><li key={url}><a href={url} target="_blank" rel="noreferrer">{name} ↗</a></li>)}</ul>{index+1<stages.length&&<button className="primary" onClick={()=>select(index+1)}>Sonraki aşama →</button>}</section></div></article>
}
