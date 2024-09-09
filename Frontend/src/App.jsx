import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import ContactForm from './ContactForm'; // Import the ContactForm component

function App() {
  return (
    <>
      <div className="App">
        <header>
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <img src={reactLogo} className="logo react" alt="React logo" />
        </header>

        <main>
          <h1>Contact Us</h1>
      <ContactForm/> {/* Add ContactForm component here */}
        </main>
      </div>
    </>
  );
}

export default App;
