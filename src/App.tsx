import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Navbar from './components/NavBar';
import { AuthContext } from './api/auth';

function App() {  
  const [isAuthenticated, setAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuth }}>
      <Router>
        {isAuthenticated && <Navbar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/search" element={<Search />} />
          {/* Other routes as needed */}
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
