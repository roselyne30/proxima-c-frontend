import React,{useEffect,useState} from 'react';
import './home.css'; // Updated CSS for the new design
import { useNavigate ,Outlet} from 'react-router-dom';
import loan from './images/loan.jpeg'; 
import logo from './images/logo.png'; 
import banner from './images/banner.jpeg'; 
import img1 from './images/img.jpg'; 
import img2 from './images/img2.jpg'; 
import img3 from './images/img3.jpg'; 
import img4 from './images/img4.jpg'; 
export default function HomePage() {
    const navigate = useNavigate();
    const imgData= [img1,img2,banner,img3,img4]
    const[bannerIndex,setBannerIndex]=useState(1)
    const handleGetStarted = () => {
        // Redirect to the Register page
        navigate('/register');
      };
      function getBanner(){
        // Get a random index
        const randomIndex = Math.floor(Math.random() * imgData.length);
        setBannerIndex(randomIndex)
       }
      useEffect(() => {
        const interval = setInterval(() => {
          getBanner();
        }, 8000); // 2000ms = 2 seconds
    
        return () => clearInterval(interval); // cleanup when component unmounts
      }, []);
  return (
    <>
        <div className='bannerWrapper'>
        <img src={imgData[bannerIndex]} alt="Proxima Centauri" className="hero-image" />
        <div className='bannerCoverWrapper'>
          <div className='bannerCoverContainer'>
            <div className="hero-content">
              <h1 className="hero-heading">Empower Your Financial Future</h1>
              <p className="hero-subheading">Join the Proxima Centauri community and take control of your finances today.</p>
              <button onClick={handleGetStarted}  className="cta-button">Get Started</button>
            </div>
          </div>
        </div>
        </div>
      {/* <div className="hero-section">
        <img src={banner} alt="Proxima Centauri" className="hero-image" />
        <div className="hero-content">
          <h1 className="hero-heading">Empower Your Financial Future</h1>
          <p className="hero-subheading">Join the Proxima Centauri community and take control of your finances today.</p>
          <button onClick={handleGetStarted}  className="cta-button">Get Started</button>
        </div>
      </div> */}

      {/* Section showcasing a person using the app for transactions */}
      <div className="transaction-section">
        <div className="transaction-content">
          <img src={loan} alt="Person using app" className="transaction-image" />
          <div className="transaction-text">
            <h2>Making Financial Transactions Has Never Been Easier</h2>
            <p>See how Proxima Centauri helps you manage and grow your money with seamless transactions, all from the palm of your hand.</p>
            <button onClick={handleGetStarted}  className="cta-button">Start Your Journey</button>
          </div>
          
        </div>
      </div>

      {/* Mission Section with Icons */}
      <div className="mission-section">
        <div className="mission-text">
          <h2>Your Financial Journey Begins Here</h2>
          <p>We believe in the power of community-based finance. Proxima Centauri is designed to make saving, borrowing, and investing easy for everyone.</p>
        </div>
        <div className="mission-icons">
          <div className="icon-card">
            <i className="fas fa-users"></i>
            <h3>Community Driven</h3>
            <p>Collaborate and grow together with your group.</p>
          </div>
          <div className="icon-card">
            <i className="fas fa-hand-holding-usd"></i>
            <h3>Easy Transactions</h3>
            <p>Manage your deposits and loans at the touch of a button.</p>
          </div>
          <div className="icon-card">
            <i className="fas fa-shield-alt"></i>
            <h3>Security First</h3>
            <p>Your financial data is secure with us, always.</p>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>Connect with us:</p>
        <div className="social-links">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="social-icon" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/60/Twitter_logo_2012.svg" alt="Twitter" className="social-icon" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg" alt="Instagram" className="social-icon" />
          </a>
        </div>
        <p>&copy; 2024 Proxima Centauri. All rights reserved.</p>
      </footer> 
    </>
  )
}
