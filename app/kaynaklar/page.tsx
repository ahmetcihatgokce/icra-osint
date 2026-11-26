import catalog from "../catalog.json";
export const metadata = { title: "Türkiye araştırma kaynakları | İcraOSINT" };
export default function Directory() {
  return (
    <main>
      <div className="wrap guide">
        <a href="/">← Kaynak atlası</a>
        <h1>Kaynak dizini</h1>
        <p>
          Türkiye’de icra ve alacak araştırması için kurumlar, kayıt türleri ve
          erişim şartları.
        </p>
        {catalog.map((r) => (
          <section key={r.id}>
            <small>
              {r.person} / {r.group}
            </small>
            <h2>{r.name}</h2>
            <b>{r.access.join(" · ")}</b>
            <p>{r.purpose}</p>
            <p>{r.limit}</p>
            <a href={r.url} rel="noreferrer">
              {r.name} ↗
            </a>
          </section>
        ))}
      </div>
    </main>
  );
}
