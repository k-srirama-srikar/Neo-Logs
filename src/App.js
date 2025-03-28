// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Header from './components/header';
import Register from './pages/register'; // Import the Register component
import Login from './pages/login';
import NotFound from './pages/notfound';
import DashboardPage from './pages/dashboard';
function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    // return (
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} /> {/* Register Page */}
          <Route path='/login' element={<Login/>}/>
          <Route path="*" element={<NotFound />} />
          <Route path="/users/:username" element={<DashboardPage />} />
        </Routes>
      </Router>
    // );
  );
}

export default App;
