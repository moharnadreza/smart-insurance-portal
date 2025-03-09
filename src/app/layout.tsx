import { Header } from "components";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Insurance Portal",
  description: "Apply for Various Insurance Plans",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="max-w-xl mx-auto mt-5 md:mt-24 px-4 sm:px-0 mb-24 flex flex-col gap-8">
          <Header />
          {children}

          <Toaster
            toastOptions={{
              duration: 5000, // 5 seconds
              style: { fontSize: "0.85rem" },
            }}
          />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
