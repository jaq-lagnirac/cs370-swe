import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">Roster</Link>
        </li>
        <li>
          <Link href="/calendar">Calendar</Link>
        </li>
        <li>
          <Link href="/email">Send Emails</Link>
        </li>
        <li>
          <Link href="/attendance">Attendance</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
