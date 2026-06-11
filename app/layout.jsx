import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "True Designs | Elegant Interior Designer in Vadodara",
  description:
    "Elegant residential and commercial interior design with turnkey execution, premium materials, and thoughtful detailing in Vadodara.",
};

export const viewport = {
  themeColor: "#071321",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PC642X7G');`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18204542690"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18204542690');`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PC642X7G"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
