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
  <>
    <a href={text}>
      {text}
    </a>
    <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => copy(text)}>
      Copy
    </button>
  </>
  );
};

export default CopyText;