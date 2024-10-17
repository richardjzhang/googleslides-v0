import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "London V0 Presentation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}