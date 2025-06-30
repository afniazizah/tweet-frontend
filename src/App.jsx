import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Crawling from './pages/Crawling';
import HasilAnalisis from './pages/HasilAnalisis';
import Panduan from './pages/Panduan';
import { useSocket } from './hooks/useSocket';

function App() {
  const socket = useSocket();
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Crawling socket={socket}/>} />
          <Route path="/hasil-analisis" element={<HasilAnalisis socket={socket}/>} />
          <Route path="/panduan" element={<Panduan socket={socket}/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;