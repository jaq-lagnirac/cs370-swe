import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from './components/navbar';
import "./styles/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Roster Manager",
  description: "A Roster Management System for clubs at TSU!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${inter.className} root-layout`}>
        <Navbar/>
        <div className="main-container">
          {children}
        </div>
      </body>
    </html>
  );
}
