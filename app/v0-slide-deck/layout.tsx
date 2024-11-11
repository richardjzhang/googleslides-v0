import type { Metadata } from "next";
import { sydneySlidesTitle } from "@/app/constants/sydney-slides";

export const metadata: Metadata = {
  title: sydneySlidesTitle,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
