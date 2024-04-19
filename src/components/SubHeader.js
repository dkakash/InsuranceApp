import React from "react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './SubHeader.css'; // Import SubHeader CSS file for styling

const SubHeader = () => {
    const [usertype, setUserType] = useState('')
    const [username, setUsername] = useState('')
    const [user, setUser] = useState('')

    useEffect(()=>{
        let u = sessionStorage.getItem('user');
        setUser(JSON.parse(u));
        
    }, [])

    return (
        <nav className="sub-header">
            <div className="container">
                <ul className="sub-nav-links">
                    {user && (
                        <li>
                            <span className="welcome-text">Welcome {user.username}</span>
                        </li>
                    )}
                    {user && user.usertype === 'agent' 
                    ? (<><li><Link to="/agent/healthDashboard">Health Dashboard</Link></li>
                    <li><Link to="/agent/autoDashboard">Auto Dashboard</Link></li>
                    </>
                    )
                    : (<>
                    <li><Link to="/user/requests">My Requests</Link></li>
                    <li><Link to="/user/quotes">My Quotes</Link></li>
                    </>)}
                    
                </ul>
            </div>
        </nav>
    )
}

export default SubHeader;
