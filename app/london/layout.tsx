import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Next.js Conf 24 : London",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
