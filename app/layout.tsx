import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "TWJHUB",
  description: "TWJHUB - Rate calculator",
  icons: {
    icon: '/svg/logo.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-primary">
        <main className="sm:p-3 lg:p-0">
          {children}
        </main>
      </body>
    </html>
  );
}
