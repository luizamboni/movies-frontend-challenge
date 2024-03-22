import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard/Dashboard';
import List from './pages/List/List';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="side-menu">
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/list">List</Link></li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />}>
            </Route>
            <Route path="/list" element={<List />}>
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
