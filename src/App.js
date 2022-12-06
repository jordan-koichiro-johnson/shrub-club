import React, { useState } from 'react';

import Navbar from './components/navbar'
import Homepage from './components/homepage'
import GameSelect from './components/gameSelect'
import LogIn from './components/login'
import SignUp from './components/signup'
import Footer from './components/footer'


import './App.css';


function App() {

  const [currentPage, setCurrentPage] = useState('Home');

  function renderNavChoice() {
    console.log(currentPage)
    if (currentPage === 'Home') {

      return <Homepage />;
    }
    if (currentPage === 'GameSelect') {

      return <GameSelect />;
    }
    if (currentPage === 'LogIn') {

      return <LogIn />;
    }
    if (currentPage === 'SignUp') {

      return <SignUp />;
    }

  }

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="App">
      <Navbar currentPage={currentPage} handlePageChange={handlePageChange} />
      {renderNavChoice()}
      <Footer />
    </div>
  );
}

export default App;
