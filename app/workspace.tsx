"use client";
import { useState } from "react";
import { hierarchy, tree } from "d3-hierarchy";
import catalog from "./catalog.json";
type Evidence = { name: string; hash: string; pages: string[] };
type Entry = {
  id: string;
  date: string;
  company: string;
  other: string;
  event: string;
  status: string;
  source: string;
  page: string;
  quote: string;
  hash: string;
  file: string;
};
const fields = [
  "Tarih",
  "Şirket",
  "İlişkili şirket",
  "Olay / ilişki",
  "Durum",
  "Kaynak",
  "Sayfa",
  "Dayanak metni",
  "SHA-256",
  "Dosya",
];
const values = (e: Entry) => [
  e.date,
  e.company,
  e.other,
  e.event,
  e.status,
  e.source,
  e.page,
  e.quote,
  e.hash,
  e.file,
];
function download(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
function RelationMap({ entries }: { entries: Entry[] }) {
  const companies = Array.from(new Set(entries.map((e) => e.company)));
  const [choice, setChoice] = useState(""),
    [focus, setFocus] = useState("");
  const company = companies.includes(choice) ? choice : companies[0];
  const edges = entries.filter(
    (e) =>
      e.company === company &&
      e.other &&
      e.status === "Belgeyle karşılaştırıldı",
  );
  if (!companies.length) return null;
  const root = hierarchy<{
    name: string;
    id?: string;
    children?: { name: string; id: string }[];
  }>({
    name: company,
    children: edges.map((e) => ({ name: e.other, id: e.id })),
  });
  const plot = tree<typeof root.data>().size([
    Math.max(110, edges.length * 64),
    270,
  ])(root);
  const chosen = edges.find((e) => e.id === focus);
  return (
    <section>
      <h3>Şirket ilişkileri</h3>
      <select
        aria-label="Harita şirketi"
        value={company}
        onChange={(e) => {
          setChoice(e.target.value);
          setFocus("");
        }}
      >
        {companies.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      {edges.length ? (
        <>
          <svg
            className="map"
            viewBox={"0 0 570 " + (Math.max(110, edges.length * 64) + 48)}
            role="group"
            aria-label="Belgeli şirket ilişkileri"
          >
            {plot.links().map((l) => (
              <path
                key={l.target.data.id}
                d={
                  "M 22 " +
                  (l.source.x + 20) +
                  " C 160 " +
                  (l.source.x + 20) +
                  " 170 " +
                  (l.target.x + 20) +
                  " 292 " +
                  (l.target.x + 20)
                }
                fill="none"
                stroke="#ac8d49"
              />
            ))}
            {plot.descendants().map((n) => (
              <g
                key={n.data.id || "root"}
                transform={"translate(" + (n.y + 22) + "," + (n.x + 20) + ")"}
                role={n.depth ? "button" : undefined}
                tabIndex={n.depth ? 0 : undefined}
                onClick={() => setFocus(n.data.id || "")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setFocus(n.data.id || "");
                  }
                }}
              >
                <title>{n.data.name}</title>
                <circle r="7" fill="#aa8942" />
                <text y="-12" fill="currentColor">
                  {n.data.name.slice(0, 28)}
                </text>
              </g>
            ))}
          </svg>
          {chosen && (
            <p>
              {chosen.event} · {chosen.date} · {chosen.file}, s. {chosen.page}
              <br />
              {chosen.quote}
            </p>
          )}
        </>
      ) : (
        <p>Bu şirket için belgeyle karşılaştırılmış bir ilişki kaydı yok.</p>
      )}
    </section>
  );
}
export default function Workspace() {
  const [docs, setDocs] = useState<Evidence[]>([]),
    [hash, setHash] = useState(""),
    [page, setPage] = useState(1),
    [message, msg] = useState(""),
    [busy, setBusy] = useState(false),
    [check, setCheck] = useState(""),
    [items, setItems] = useState<Entry[]>([]);
  const doc = docs.find((d) => d.hash === hash);
  const sorted = items.toSorted((a, b) => a.date.localeCompare(b.date));
  async function read(file: File) {
    setBusy(true);
    try {
      if (file.size > 25 * 1024 * 1024)
        throw Error("En fazla 25 MB boyutunda PDF seçin.");
      const data = await file.arrayBuffer();
      const digest = Array.from(
        new Uint8Array(await crypto.subtle.digest("SHA-256", data)),
        (b) => b.toString(16).padStart(2, "0"),
      ).join("");
      const pdf = await import("pdfjs-dist");
      pdf.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      const task = pdf.getDocument({
        data: new Uint8Array(data),
        useSystemFonts: true,
      });
      try {
        const pdfDoc = await task.promise;
        if (pdfDoc.numPages > 400)
          throw Error("Belge 400 sayfa sınırını aşıyor.");
        const pages: string[] = [];
        for (let i = 1; i <= pdfDoc.numPages; i++) {
          const p = await pdfDoc.getPage(i);
          const t = await p.getTextContent();
          pages.push(t.items.map((x) => ("str" in x ? x.str : "")).join(" "));
          p.cleanup();
        }
        setDocs((old) => [
          ...old.filter((d) => d.hash !== digest),
          { name: file.name, hash: digest, pages },
        ]);
        setHash(digest);
        setPage(1);
        setCheck("");
        msg(
          pages.some((p) => p.trim())
            ? "Belge cihazda açıldı."
            : "Metin katmanı bulunamadı. Taranmış belgelerde OCR gerekir.",
        );
      } finally {
        await task.destroy();
      }
    } catch (e) {
      msg(e instanceof Error ? e.message : "PDF okunamadı.");
    } finally {
      setBusy(false);
    }
  }
  async function report(format: string) {
    try {
      if (format === "PDF") {
        window.print();
        return;
      }
      if (format === "Word") {
        const { Document, Paragraph, Packer } = await import("docx");
        const result = new Document({
          sections: [
            {
              children: [
                new Paragraph("İcraOSINT araştırma raporu"),
                ...sorted.flatMap((e) =>
                  values(e).map((v, i) => new Paragraph(fields[i] + ": " + v)),
                ),
              ],
            },
          ],
        });
        download(await Packer.toBlob(result), "icra-arastirma.docx");
      } else {
        const { Workbook } = await import("exceljs");
        const wb = new Workbook();
        const sheet = wb.addWorksheet("Araştırma");
        sheet.addRow(fields);
        sorted.forEach((e) => sheet.addRow(values(e)));
        sheet.columns.forEach((c) => (c.width = 30));
        download(
          new Blob([(await wb.xlsx.writeBuffer()) as ArrayBuffer]),
          "icra-arastirma.xlsx",
        );
      }
    } catch {
      msg("Rapor oluşturulamadı. Tekrar deneyin.");
    }
  }
  return (
    <>
      <div className="desk">
        <small>YEREL ÇALIŞMA ALANI</small>
        <h1>
          Belge masası<span>.</span>
        </h1>
        <p>
          PDF ve bulgular bu sekmenin belleğinde tutulur. Sekmeyi kapatmadan
          önce raporu indirin.
        </p>
        <section>
          <h3>Sicil belgesini incele</h3>
          <input
            aria-label="PDF seç"
            type="file"
            accept="application/pdf,.pdf"
            disabled={busy}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void read(f);
              e.target.value = "";
            }}
          />
          {busy && <p>PDF okunuyor…</p>}
          {doc && (
            <>
              <label>
                Belge
                <select
                  value={hash}
                  onChange={(e) => {
                    setHash(e.target.value);
                    setPage(1);
                    setCheck("");
                  }}
                >
                  {docs.map((d) => (
                    <option value={d.hash} key={d.hash}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Sayfa
                <select
                  value={page}
                  onChange={(e) => setPage(Number(e.target.value))}
                >
                  {doc.pages.map((_, i) => (
                    <option key={i}>{i + 1}</option>
                  ))}
                </select>
              </label>
              <blockquote>
                {doc.pages[page - 1] || "Metin katmanı yok."}
              </blockquote>
              <p className="hash">SHA-256　{hash}</p>
              <label>
                Karşılaştırılacak SHA-256
                <input
                  value={check}
                  onChange={(e) => setCheck(e.target.value.trim())}
                />
              </label>
              {check && (
                <p>
                  {check.toLowerCase() === hash
                    ? "Özet değerleri eşleşiyor."
                    : "Özet değerleri eşleşmiyor."}
                </p>
              )}
              <p>
                Özet, dosya bütünlüğünü karşılaştırır. Belgenin kaynağını veya
                imzasını resmî doğrulama kanalında ayrıca kontrol edin.
              </p>
            </>
          )}
        </section>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const f = new FormData(form);
            const get = (k: string) => String(f.get(k) || "").trim();
            const status = get("status"),
              quote = get("quote");
            if (!get("company") || !get("event")) {
              msg("Şirket ve olay girin.");
              return;
            }
            if (
              status === "Belgeyle karşılaştırıldı" &&
              (!doc || !quote || !doc.pages[page - 1]?.includes(quote))
            ) {
              msg(
                "Belgeye dayalı kayıt için seçili PDF sayfasından birebir bir alıntı girin.",
              );
              return;
            }
            setItems((old) => [
              ...old,
              {
                id: crypto.randomUUID(),
                company: get("company"),
                other: get("other"),
                event: get("event"),
                date: get("date"),
                source: get("source"),
                status,
                quote,
                hash: doc?.hash || "",
                file: doc?.name || "",
                page: doc ? String(page) : "",
              },
            ]);
            form.reset();
            msg("Bulgu kronolojiye eklendi.");
          }}
        >
          <h3>Bulgu ekle</h3>
          <div className="formgrid">
            {[
              ["company", "Şirket unvanı"],
              ["other", "İlişkili şirket (varsa)"],
              ["event", "Olay veya ilişki"],
              ["date", "Olay tarihi"],
            ].map(([k, l]) => (
              <label key={k}>
                {l}
                <input
                  name={k}
                  type={k === "date" ? "date" : "text"}
                  required={k !== "other"}
                  maxLength={300}
                />
              </label>
            ))}
            <label>
              Dayanak kaynağı
              <select name="source">
                {catalog.map((r) => (
                  <option key={r.id} value={r.url}>
                    {r.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Kanıt durumu
              <select name="status">
                <option>Varsayım</option>
                <option>Belgeyle karşılaştırıldı</option>
              </select>
            </label>
          </div>
          <label>
            Seçili sayfadan dayanak metni
            <textarea name="quote" maxLength={5000} />
          </label>
          <button className="primary">Kronolojiye ekle</button>
        </form>
        <p role="status">{message}</p>
        <RelationMap entries={sorted} />
        <h2>Şirket geçmişi</h2>
        {!sorted.length && (
          <p>İlk bulguyu eklediğinizde olaylar tarihe göre sıralanır.</p>
        )}
        {sorted.map((e) => (
          <section key={e.id}>
            <small>
              {e.date}　/　{e.status}
            </small>
            <h3>
              {e.company} · {e.event}
            </h3>
            <p>
              {e.other}　{e.file} {e.page && "· s. " + e.page}
            </p>
            <button
              onClick={() => setItems((v) => v.filter((x) => x.id !== e.id))}
            >
              Kaydı kaldır
            </button>
          </section>
        ))}
        {sorted.length > 0 && (
          <div className="filters">
            {["PDF", "Word", "Excel"].map((f) => (
              <button key={f} onClick={() => void report(f)}>
                {f === "PDF" ? "PDF / Yazdır" : f + " indir"}
              </button>
            ))}
          </div>
        )}
      </div>
      <article className="print">
        <h1>İcraOSINT araştırma raporu</h1>
        {sorted.map((e) => (
          <section key={e.id}>
            {values(e).map((v, i) => (
              <p key={i}>
                <b>{fields[i]}</b>　{v}
              </p>
            ))}
          </section>
        ))}
      </article>
    </>
  );
}
