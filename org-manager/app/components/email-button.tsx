//Buttons listed on the email page
//Made of email icon and select text
import Image from 'next/image';

interface TableProps {
    iconSrc: string;
    buttonText: string;
  }

const EmailButton: React.FC<TableProps> = ({iconSrc, buttonText})  => {
//   let icon = "../icons/light-email.png"; 
  let icon = "/light-email.svg"; // Adjust the path to match your directory structure
  let darkIcon = "/test-qr.png";
  return (
  <>
    <button>
        <div>
            <Image src={icon} alt="Send Email" width={50} height={50} />
        </div>
        <div>{buttonText}</div>
    </button>
  </>
  );
};

export default EmailButton;