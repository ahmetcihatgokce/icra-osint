import "./style.css";
export const metadata = {
  title: "İcraOSINT | Türkiye icra ve alacak araştırma kaynakları",
  description:
    "Türkiye ticaret sicili, konkordato ve ihale kaynakları. Belgeleri cihazınızda inceleyin, şirket geçmişini ve kaynaklı araştırma raporlarını oluşturun.",
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
