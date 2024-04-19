import React from 'react';
import { Link } from 'react-router-dom'; 
import './Header.css'; 
import { useEffect, useState } from 'react';


function Header() {
    const [usertype,setUserType] = useState('')
    const [username, setUsername] = useState('')
    const [user, setUser] = useState('')

    useEffect(()=>{
        let u = sessionStorage.getItem('user');
        setUser(JSON.parse(u));
        
    }, [])

    const logout = ()=>{
        window.sessionStorage.clear();
        window.location.reload();
        window.location.href = '/';
    }


  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to='/'>
          <div className="logo">
            <img src="logo512.png" alt="Logo" className="logo-img" />
            <span className="logo-text" style={{textDecoration:'none'}}>Insurance</span>
          </div>
          </Link>
          <nav className="navigation">
            <ul className="nav-links">
              <li><Link to="/health-insurance">Health Insurance</Link></li>
              <li><Link to="/automobile-insurance">Automobile Insurance</Link></li>
              <li><Link to="/aboutUs">About Us</Link></li>
              <li><Link to="/contactUs">Contact Us</Link></li>
              {(user ? user.usertype === 'customer' || user.usertype === 'agent':'') 
              ? ( <Link to='' onClick={logout}>Logout</Link>) 
              : (<Link to='/login'>Sign In</Link>)}
              
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;


<div>

  
</div>