'use client'
import Image from 'next/image'
import Script from 'next/script'
import Link from 'next/link'
import { renderSVG } from 'scannable/qr';
import React from 'react';
// An image that can be clicked to download, with a download symbol on hover

function ImgDl() {
  // Temporary fiat definition, replace with an argument
  const testLink = "https://ruff.computer";
  const qrCode = renderSVG(testLink);
  const qrBlob = new Blob([qrCode]);
  const qrURL = window.URL.createObjectURL(qrBlob);
  return (
  <>
    <a href={qrURL} download="qrcode.svg">
      <img src={`data:image/svg+xml;utf8,${encodeURIComponent(qrCode)}`} />
    </a>
  </>
  );
};

export default ImgDl;