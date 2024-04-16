import React from 'react';
// An image that can be clicked to download, with a download symbol on hover

interface CopyTextProps {
    url: string;
}
async function copy(url: string) {
  try {
    await navigator.clipboard.writeText(url);
    console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

const CopyText: React.FC<CopyTextProps> = ({ url }) => {
  return (
  <div style={{display: 'flex', justifyContent: 'center'}}>
    <button className="copy-button me-2" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => copy(url)}>
      <img src="/copyicon.svg" className="copy-image"/>
    </button>
    {/* <p style={{ margin: 0, verticalAlign: 'middle' }}> */}
    <input type="text" value={url} style={{ margin: 0, verticalAlign: 'middle', width: '80%' }}/>
  </div>
  );
};

export default CopyText;