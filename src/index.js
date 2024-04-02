import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ColorModeProvider } from './contexts/color-mode.contexts'
import { TimeProvider } from './contexts/time.context';
import { ItemsProvider } from './contexts/items.context';
import { SoundProvider } from './contexts/sound.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <ColorModeProvider>
      <TimeProvider>
        <ItemsProvider>
          <SoundProvider>
            <App />
          </SoundProvider>
        </ItemsProvider>
      </TimeProvider>
    </ColorModeProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
