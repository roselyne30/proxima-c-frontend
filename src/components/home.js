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
import Navbar from './Navbar/Navbar';

const Home = () => {
  const imgData= [img1,img2,banner,img3,img4]
  const[bannerIndex,setBannerIndex]=useState(1)
  const navigate = useNavigate();  // useNavigate hook for navigation
  function getBanner(){
   // Get a random index
   const randomIndex = Math.floor(Math.random() * imgData.length);
   setBannerIndex(randomIndex)
  }

  const handleGetStarted = () => {
    // Redirect to the Register page
    navigate('/register');
  };
    useEffect(() => {
      const interval = setInterval(() => {
        getBanner();
      }, 8000); // 2000ms = 2 seconds
  
      return () => clearInterval(interval); // cleanup when component unmounts
    }, []);
  return (
    <div className="home-container">
      <Navbar/>
      <Outlet/>
    </div>
  );
};

export default Home;
