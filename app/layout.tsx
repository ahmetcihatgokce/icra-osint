import "./style.css";
export const metadata = {
  title: "İcraOSINT | Yeni avukatlar için icra takibi rehberi",
  description:
    "Takip açılışı, tebligat, haciz, tahsil ve kapanış için uygulama adımları ve resmî kaynaklar.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "İcraOSINT",
              inLanguage: "tr",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              isAccessibleForFree: true,
              author: { "@type": "Organization", name: "acgokce" },
              areaServed: { "@type": "Country", name: "Türkiye" },
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
