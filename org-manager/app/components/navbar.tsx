'use client';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  }

  // document.getElementById('focusmeplease').focus();

  return (
    <div className="row nav-container">
    <nav className="navbar navbar-expand-sm pb-2 col-10">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" href="/" id="focusmeplease">Roster Manager</Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" href="/calendar">Calendar</Link>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link" href="/email">Send Emails</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/attendance">Attendance</Link>
        </li>
      </ul>
    </nav>

    <label className="col-2 toggleThing">
      <input
          id="themeSwitch"
          type="checkbox"
          name="checkbox"
          className="toggle-checkbox"
          checked={darkMode}
          onChange={toggleTheme}
        />
      <div className="toggle-slot">
        <div className="sun-icon-wrapper">
          <div className="iconify sun-icon" data-icon="feather-sun" data-inline="false"> </div>
        </div>

        <div className="toggle-button"></div>
        <div className="moon-icon-wrapper">
          <div className="iconify moon-icon" data-icon="feather-moon" data-inline="false"> </div>
        </div>
      </div>
    </label>
  <script src="https://code.iconify.design/1/1.0.4/iconify.min.js"></script>
  </div>
  );
};

export default Navbar;
