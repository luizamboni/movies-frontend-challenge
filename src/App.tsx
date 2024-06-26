import { FC as FunctionalComponent} from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import List from "./pages/List/List";

const App: FunctionalComponent<any> = () => {
  return (
    <Router>
      <div className="header">
        <p>Frontend React Test</p>
      </div>
      <div className="app">
        <nav className="side-menu">
          <ul>
            <li><NavLink className={({ isActive }): string => (isActive ? "active" : "inactive")} to="/">Dashboard</NavLink></li>
            <li><NavLink className={({ isActive }): string => (isActive ? "active" : "inactive")} to="/list">List</NavLink></li>
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
};

export default App;
