import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import './TransactionList.css'; // Importing the CSS file

const TransactionList = ({ groupId }) => {
  const [transactions, setTransactions] = useState([]);
  const [token, setToken] = useState('');
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
  getToken()
  },[])
  
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
       if(token){
          const response = await axios.get(`/api/transactions/${groupId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data.transactions);  // Update state with fetched transactions
       }
      } catch (err) {
        console.error('Failed to fetch transactions', err);
      }
    };

    fetchTransactions();
  }, [groupId]);  // Refetch when groupId changes

  return (
    <div className='transactionWrapper'>
    <div className="transaction-list-container">
      <h2>Transaction History</h2>
      <ul>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <li key={transaction.id}>
              <strong>Type:</strong> {transaction.type} <br />
              <strong>Amount:</strong> ${transaction.amount} <br />
              <strong>Date:</strong> {new Date(transaction.timestamp).toLocaleString()} <br />
            </li>
          ))
        ) : (
          <p>No transactions found</p>
        )}
      </ul>
    </div>
    </div>
  );
};

export default TransactionList;
