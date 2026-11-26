"use client";
import { useEffect, useState } from "react";
import catalog from "./catalog.json";
import Guide from "./guide";
import Workspace from "./workspace";
const norm = (s: string) =>
  s
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
export default function Home() {
  const [tab, setTab] = useState("Kaynak atlası"),
    [q, setQ] = useState(""),
    [who, setWho] = useState("Tümü"),
    [access, setAccess] = useState("Tüm erişimler"),
    [dark, setDark] = useState(false),
    [selected, setSelected] = useState(1);
  useEffect(() => {
    setDark(localStorage.getItem("icra-theme") === "dark");
    if ("serviceWorker" in navigator)
      navigator.serviceWorker.register("/sw.js").catch(() => {});
  }, []);
  const words = norm(q.trim()).split(/\s+/);
  const rows = catalog.filter(
    (r) =>
      (who === "Tümü" || r.person === who) &&
      (access === "Tüm erişimler" || r.access.includes(access)) &&
      words.every((w) =>
        norm(
          [r.name, r.group, r.purpose, r.limit, ...r.access, r.person].join(
            " ",
          ),
        ).includes(w),
      ),
  );
  const current = rows.find((r) => r.id === selected) || rows[0];
  return (
    <main data-theme={dark ? "dark" : "light"}>
      <header>
        <div className="brand">
          <b>İ</b> İcra<span>OSINT</span>
        </div>
        <nav>
          {["Kaynak atlası", "Belge masası", "İşlem rehberi"].map((x) => (
            <button
              aria-current={tab === x ? "page" : undefined}
              key={x}
              onClick={() => setTab(x)}
            >
              {x}
            </button>
          ))}
        </nav>
        <button
          className="theme"
          aria-label="Temayı değiştir"
          onClick={() => {
            setDark(!dark);
            localStorage.setItem("icra-theme", dark ? "light" : "dark");
          }}
        >
          {dark ? "☀" : "◐"}
        </button>
      </header>
      <div className="wrap">
        <div hidden={tab !== "Kaynak atlası"}>
          <div className="hero">
            <div>
              <small>TÜRKİYE / ARAŞTIRMA DİZİNİ</small>
              <h1>
                Kaynak atlası<span>.</span>
              </h1>
              <p>
                İcra ve alacak araştırmalarında doğru sicile, ilana ve belgeye
                ulaşın.
              </p>
            </div>
            <div className="seal" aria-hidden="true">
              §
            </div>
          </div>
          <div className="bar">
            <label className="search">
              ⌕{" "}
              <input
                aria-label="Kaynak ara"
                placeholder="Kaynak, kurum veya konu ara…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </label>
            <select
              aria-label="Erişim filtresi"
              value={access}
              onChange={(e) => setAccess(e.target.value)}
            >
              {[
                "Tüm erişimler",
                "Ücretsiz",
                "Ücretli",
                "Üyelik",
                "Özel yetki",
              ].map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </div>
          <div className="filters">
            {["Tümü", "Tüzel kişi", "Gerçek kişi"].map((x) => (
              <button
                key={x}
                aria-pressed={who === x}
                onClick={() => setWho(x)}
              >
                {x}
              </button>
            ))}
            <span>{rows.length} kaynak</span>
          </div>
          <div className="columns">
            <section className="tree">
              <small>KAYNAK AĞACI</small>
              {["Tüzel kişi", "Gerçek kişi"].map((person) => {
                const list = rows.filter((r) => r.person === person);
                return (
                  list.length > 0 && (
                    <details key={person} open>
                      <summary>{person}</summary>
                      {Array.from(new Set(list.map((r) => r.group))).map(
                        (g, i) => (
                          <details
                            className="branch"
                            key={g + q + who + access}
                            open={i === 0 || !!q || access !== "Tüm erişimler"}
                          >
                            <summary>{g}</summary>
                            {list
                              .filter((r) => r.group === g)
                              .map((r) => (
                                <button
                                  className={current?.id === r.id ? "sel" : ""}
                                  key={r.id}
                                  onClick={() => setSelected(r.id)}
                                >
                                  {r.name}
                                </button>
                              ))}
                          </details>
                        ),
                      )}
                    </details>
                  )
                );
              })}
            </section>
            <article className="card" aria-live="polite">
              {current ? (
                <>
                  <small>
                    {current.person.toLocaleUpperCase("tr")}　/　
                    {current.group.toLocaleUpperCase("tr")}
                  </small>
                  <h2>{current.name}</h2>
                  <div className="tags">
                    {current.access.map((a) => (
                      <em key={a}>{a}</em>
                    ))}
                  </div>
                  <h3>Araştırma amacı</h3>
                  <p>{current.purpose}</p>
                  <h3>Erişim ve kullanım sınırı</h3>
                  <p>{current.limit}</p>
                  <a
                    className="primary"
                    href={current.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Kaynağı aç ↗
                  </a>
                  <footer>{new URL(current.url).hostname}</footer>
                </>
              ) : (
                <>
                  <h2>Kaynak bulunamadı</h2>
                  <button
                    onClick={() => {
                      setQ("");
                      setWho("Tümü");
                      setAccess("Tüm erişimler");
                    }}
                  >
                    Filtreleri temizle
                  </button>
                </>
              )}
            </article>
          </div>
        </div>
        <div hidden={tab !== "Belge masası"}>
          <Workspace />
        </div>
        <div hidden={tab !== "İşlem rehberi"}>
          <Guide />
        </div>
      </div>
      <aside>
        İcraOSINT　·　acgokce　 /　{" "}
        <a href="https://github.com/ahmetcihatgokce/icra-osint">
          Kaynak kodu ↗
        </a>
      </aside>
    </main>
  );
}
