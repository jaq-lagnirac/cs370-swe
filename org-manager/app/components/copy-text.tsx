import React from 'react';
// An image that can be clicked to download, with a download symbol on hover

interface CopyTextProps {
    url: string;
}
async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
}

const CopyText: React.FC<CopyTextProps> = ({ url }) => {
  // Temporary fiat definition, replace with an argument
  return (
  <>
    <a href={url}>
      {url}
    </a>
    <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => copy(url)}>
      Copy
    </button>
  </>
  );
};

export default CopyText;