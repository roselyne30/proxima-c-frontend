import React from 'react';
import './App.css';  // Add the CSS for styles
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Update import
import Login from './components/auths/login';
import Register from './components/auths/register';
import Home from './components/home';  // Import Home component
import GroupList from './components/groups/GroupList';
import CreateGroup from './components/groups/CreateGroup';
import Deposit from './components/Transactions/Deposit';
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage';
import GroupDetails from './components/groups/GroupDetails';
import TransactionHistory from './components/Transactions/TransactionHistory';

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<HomePage/>}/>
            <Route path="/groups" element={<GroupList />} />
            <Route path="/groups/:id" element={<GroupDetails />} />
            <Route path="/create-group" element={<CreateGroup />} />
            <Route path="/transactionHistory" element={<TransactionHistory />} />
            <Route path="/deposit/:groupId" element={<Deposit />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
