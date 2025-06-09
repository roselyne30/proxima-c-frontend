import React from 'react'

export default function TransactionHistory() {
  return (
    <div className='TransactionHistoryWrapper'>
        <div className='TransactionHistoryHolder'>
            <div className='TransactionHistory'>
                <h2>Money Group</h2>
                <p>Amount:200</p>
            </div>
            <div className='TransactionHistory'>
                <h2>school Group</h2>
                <p>Amount:300</p>
            </div>
            <div className='TransactionHistory'>
                <h2>Game Group</h2>
                <p>Amount:500</p>
            </div>
            <div className='TransactionHistory'>
                <h2>Drinking Group</h2>
                <p>Amount:600</p>
            </div>
            <div className='TransactionHistory'>
                <h2>Road Trip Group</h2>
                <p>Amount:1000</p>
            </div>
        </div>
    </div>
  )
}
