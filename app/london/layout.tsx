import type { Metadata } from "next";
import { londonSlidesTitle } from "@/app/constants/london-slides";

export const metadata: Metadata = {
  title: londonSlidesTitle,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
