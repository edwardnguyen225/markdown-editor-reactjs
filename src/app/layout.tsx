import { Roboto, Roboto_Mono, Roboto_Slab } from "next/font/google";
import { Metadata } from "next";

import "./globals.css";
import { cn } from "@/lib/cn";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const robotoSlab = Roboto_Slab({
  weight: ["300", "400", "500", "700"],
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontend Mentor | In-browser markdown editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          roboto.className,
          robotoMono.className,
          robotoSlab.className,
        )}
      >
        {children}
      </body>
    </html>
  );
}
