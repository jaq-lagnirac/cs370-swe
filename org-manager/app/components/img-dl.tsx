// An image that can be clicked to download, with a download symbol on hover

const ImgDl = () => {
  // Temporary fiat definition, replace with an argument
  let image_url = "/test-images/test-qr.png"; 
  return (
  <>
    <a href={image_url} download>
        <img src={image_url}>
        </img>
      </a>
  </>
  );
};

export default ImgDl;