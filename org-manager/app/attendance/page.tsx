import React from 'react';
import ImgDl from '../components/img-dl'
import RootLayout from '../layout';

export default function Attendance() {
  return (
    <div>
      <h1>Attendance</h1>
      <p>
        This is the Attendance page.
        Here is a test QR code download.
      </p>
      <ImgDl></ImgDl>
    </div>
  );
}