import Image from 'next/image'
import Link from 'next/link'
// An image that can be clicked to download, with a download symbol on hover

function ImgDl() {
  // Temporary fiat definition, replace with an argument
  let image_url = "/test-qr.png"; 
  return (
  <>
    <a href={image_url} download>
        <Image src={image_url} alt="A QR code" width="256" height="256" />
      </a>
  </>
  );
};

export default ImgDl;