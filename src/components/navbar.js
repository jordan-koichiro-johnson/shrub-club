import React from 'react'

import "nes.css/css/nes.min.css"
import './navbar.css'

function Navbar({ currentPage, handlePageChange }) {
    return (<nav >
        <a
            href='#Home'
            onClick={() => handlePageChange('Home')}
            className={currentPage === 'Home' ? 'nav-link active nes-btn is-success' : 'nav-link nes-btn'}
        >
            Homepage
        </a>
        <a
            href='#Games'
            onClick={() => handlePageChange('GameSelect')}
            className={currentPage === 'GameSelect' ? 'nav-link active nes-btn is-success' : 'nav-link nes-btn'}
        >
            GameSelect
        </a>
        <a
            href='#LogIn'
            onClick={() => handlePageChange('LogIn')}
            className={currentPage === 'LogIn' ? 'nav-link active nes-btn is-success' : 'nav-link nes-btn'}
        >
            Log In
        </a>
        <a
            href='#SignUp'
            onClick={() => handlePageChange('SignUp')}
            className={currentPage === 'SignUp' ? 'nav-link active nes-btn is-success' : 'nav-link nes-btn'}
        >
            Sign Up
        </a>

    </nav>)
}

export default Navbar