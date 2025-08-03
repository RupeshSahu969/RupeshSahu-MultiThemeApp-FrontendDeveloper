// frontend/src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './Contexts/ThemeContext';

const container = document.getElementById('root');
const root = createRoot(container!); // "!" tells TS it's not null

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>

    </BrowserRouter>
  </React.StrictMode>
);
