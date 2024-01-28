import React, { useState, useEffect } from 'react'


export default function Nav() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Apply dark or light theme based on the checkbox value
        const body = document.body;

        body.style.backgroundColor = isDarkMode ? '#121212' : '#ffffff';
        body.style.color = isDarkMode ? '#ffffff' : '#000000'; // Corrected color values

        // Example: Adjust navigation bar styles
        const navBar = document.getElementById('navbar');

        if (isDarkMode) {
            // Dark mode styles for navigation bar
            navBar.style.backgroundColor = '#1a1a1a';
            navBar.style.color = '#ffffff';
        } else {
            // Light mode styles for navigation bar
            navBar.style.backgroundColor = '#ffffff';
            navBar.style.color = '#000000';
        }
    }, [isDarkMode]);

    const handleDarkModeToggle = () => {
        setIsDarkMode(!isDarkMode);
    };



    return (
        <div>
            <div id="navbar" className="navbar fixed z-10 bg-base-100">
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                </div>
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">MyGroups</a>
                </div>
                <div className="flex-none">
                    <label className="flex cursor-pointer gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                        <input type="checkbox" value="synthwave" className="toggle theme-controller" onChange={handleDarkModeToggle} />
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    </label>
                    <button className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                    </button>

                </div>
            </div>

        </div>
    )
}
