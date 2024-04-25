import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login'
import Register from './components/Register';
import HealthInsurance from './components/HealthInsurance'
import AutoInsurance from './components/AutoInsurance';
import Footer from './components/Footer';
import SubHeader from './components/SubHeader';
import HealthDashboard from './components/HealthDashboard';
import React, { useEffect, useState } from 'react';
import UserHealthInsuranceRecords from './components/UserHealthInsuranceRecords';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import QuoteDisplay from './components/QuoteDisplay';
import PaymentComponent from './components/PaymentComponent';
import UserInsurance from './components/UserInsurance';
import AutoDashboard from './components/AutoDashboard';
const App = () => {
  const [user, setUser] = useState('')

    useEffect(()=>{
        let u = sessionStorage.getItem('user');
        setUser(JSON.parse(u));
        
    }, [])

  return (
    <div className="App">
      <Router>
        <Header />
        {user && user.username && <SubHeader />}
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/health-insurance" element={<HealthInsurance />} />
        <Route path="/automobile-insurance" element={<AutoInsurance />} />
        <Route path="/agent/healthDashboard" element={<HealthDashboard />} />
        <Route path="/user/requests" element={<UserHealthInsuranceRecords />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/user/quotes/:requestId" element={<QuoteDisplay />} />
        <Route path="/payment" element={<PaymentComponent />} />
        <Route path="/user/insurance" element={<UserInsurance />} />

        <Route path="/agent/autoDashboard" element={<AutoDashboard />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
