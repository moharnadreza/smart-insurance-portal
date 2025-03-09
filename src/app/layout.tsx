import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Insurance Portal",
  description: "Apply for Various Insurance Plans",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
};

export default RootLayout;
