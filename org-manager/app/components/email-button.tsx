//Buttons listed on the email page
//Made of email icon and select text
import { useState, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';

interface TableProps {
    buttonText: string;
    onClick?: () => void;
    darkMode: boolean;
  }

const EmailButton: React.FC<TableProps> = ({buttonText, onClick, darkMode})  => {
  const [icon, setIcon] = useState(darkMode ? "/dark-email.svg" : "/light-email.svg");
  // useEffect(() => {
  //   const iconSrc = darkMode ? "/dark-email.svg" : "/light-email.svg";
  //   setIcon(iconSrc);
  // }, [darkMode]);
  return (
  <>
    <div onClick={onClick}>
        <button className="email-button email-text">
            <Image className="pe-3 mb-1" src={icon} alt="Send Email" width={80} height={60}/>
            {buttonText}
        </button>
    </div>
  </>
  );
};

export default EmailButton;