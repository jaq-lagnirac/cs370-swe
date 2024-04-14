import React from 'react';
// An image that can be clicked to download, with a download symbol on hover

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

function CopyText() {
  // Temporary fiat definition, replace with an argument
  let text = "https://ruff.computer";
  return (
  <div style={{display: 'flex', justifyContent: 'center'}}>
    <button className="copy-button me-2" onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => copy(text)}>
      <img src="/copyicon.svg" className="copy-image"/>
    </button>
    {/* <p style={{ margin: 0, verticalAlign: 'middle' }}> */}
    <input type="text" value={text} style={{ margin: 0, verticalAlign: 'middle', width: '80%' }}/>
  </div>
  );
};

export default CopyText;