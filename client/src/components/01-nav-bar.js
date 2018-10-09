import React from 'react';
import {Link} from 'react-router-dom'

const NavBar = ()=>{
    return(
        <nav>
            <ul className="">
                <Link to='/login' > <li className='d-inline-block'>Login</li></Link>
                <Link to='/home'><li className='d-inline-block'>Home</li></Link>
                <Link to='/about'><li className='d-inline-block'>About</li></Link>
                <Link to='/services'><li className='d-inline-block'>Services</li></Link>
            </ul>
        </nav>
    )
};

export default NavBar