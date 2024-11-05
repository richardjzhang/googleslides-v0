import type { Metadata } from "next";
import { londonV0SummitSlidesTitle } from "@/app/constants/london-v0-summit";

export const metadata: Metadata = {
  title: londonV0SummitSlidesTitle,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
