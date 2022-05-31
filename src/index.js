import React from 'react';
import './index.css';
import App from './App';
import * as ReactDOM from 'react-dom/client';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// React 18 modo concurrente (Forma 2)
ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <App />
)

// Forma 1
// const container = document.getElementById('root')
// const root = ReactDOM.createRoot(container);
// root.render(<App />);

