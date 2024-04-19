'use client';
import { Inter } from "next/font/google";
import Script from "next/script";
import { useState } from 'react';
import { useEffect } from 'react';
import Navbar from './components/navbar';
import "./styles/index.css";
import 'bootstrap/dist/css/bootstrap.css';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(()=>{
    require("bootstrap/dist/js/bootstrap");
  },[])
  const toggleTheme = () => {
    const root = document.documentElement;

    if (!darkMode) {
      setDarkMode(true);
      root.style.setProperty('--bg-color', '#2D283E');
      root.style.setProperty('--text-color', '#FFFDF3');
      root.style.setProperty('--secondary-text-color', 'white');
      root.style.setProperty('--nav-color', '#FFFDF3');
      root.style.setProperty('--active-nav-color', 'white');
      root.style.setProperty('--email-form-color', '#FFFDF3');
    } else {
      setDarkMode(false);
      root.style.setProperty('--bg-color', '#FFFDF3');
      root.style.setProperty('--text-color', '#6C43B1');
      root.style.setProperty('--secondary-text-color', 'black');
      root.style.setProperty('--nav-color', '#8D6BC7');
      root.style.setProperty('--active-nav-color', '#6C43B1');
      root.style.setProperty('--email-form-color', 'white');
    }
  }
  return (
    <html lang="en">
      <body className={`${inter.className} root-layout`}>
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme}/>
        <div className="main-container">
          {children}
        </div>
        <Script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"/>
        <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"/>
        <Script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"/>
      </body>
    </html>
  );
}
