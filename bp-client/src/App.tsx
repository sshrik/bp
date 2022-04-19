import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from 'pages/MainPage';

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
