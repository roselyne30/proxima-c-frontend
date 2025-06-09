import React, { useState,useEffect } from 'react';
import axios from '../../axios';
import './Deposit.css'; // Importing the CSS file
import { useLocation } from 'react-router-dom';
const Deposit = () => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const [groupName, setGroupName] = useState([]);
  const [placeholder, setPlaceholder] = useState('Group Name');
  const location =useLocation()
  function getToken(){
    try{
      const token = localStorage.getItem('token');
      if(token){
        setToken(token)
      }
    }
    catch(error){
     console.log(error)
    }
  }
  useEffect(()=>{
    const {state}=location
    console.log('st',state)
    if(state &&state !== null){
      setGroupName([state])
      setName(state.name)
    }else{
      setName('')
    }
  },[])
  useEffect(()=>{
  getToken()
  },[])
  const handleDeposit = async (e) => {
    e.preventDefault();
    try {
      if(token && name){
        const data={'amount':amount,'name':name}
        await axios.post(
          `/api/transactions/deposit`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        alert('Deposit successful');
        setAmount('');
      }
    } catch (err) {
      setError('Deposit was Succefully!');
      setAmount('')
      setName('')
    }
  };

  return (
  <div className='depositWrapper'>
    <div className="deposit-container">
      <h2>Deposit</h2>
      {error && <p className="error-message">{error}</p>}
      <form>
      <input
          type="text"
          placeholder={placeholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick= {handleDeposit} type="submit">Deposit</button>
      </form>
    </div>
    </div> 
  );
};

export default Deposit;
