import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-term",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "AlexOS — Terminal Portfolio",
  description:
    "Alberth Alexander Godoy Avila — Backend developer & Minecraft plugin developer. Windows 95-themed terminal portfolio.",
  icons: {
    icon: "/own-profile.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
