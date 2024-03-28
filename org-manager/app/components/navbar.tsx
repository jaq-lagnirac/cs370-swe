'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    const root = document.documentElement;

    if (!darkMode) {
      setDarkMode(true);
      root.style.setProperty('--bg-color', '#2D283E');
      root.style.setProperty('--text-color', '#FFFDF3');
      root.style.setProperty('--secondary-text-color', 'white');
      root.style.setProperty('--nav-color', '#FFFDF3');
      root.style.setProperty('--active-nav-color', 'white');
    } else {
      setDarkMode(false);
      root.style.setProperty('--bg-color', '#FFFDF3');
      root.style.setProperty('--text-color', '#6C43B1');
      root.style.setProperty('--secondary-text-color', 'black');
      root.style.setProperty('--nav-color', '#8D6BC7');
      root.style.setProperty('--active-nav-color', '#6C43B1');
    }
  }

  return (
    <div className="row nav-container">
    <nav className="navbar navbar-expand-sm pb-2 col-10">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" href="/">Roster Manager</Link>
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
