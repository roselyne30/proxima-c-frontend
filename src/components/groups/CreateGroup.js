import React, { useState,useEffect } from 'react';
import axios from '../../axios'; // Custom Axios instance
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import './CreateGroup.css';

const CreateGroup = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  // For showing success message
  const [groupId, setGroupId] = useState(null);  // For storing the created group ID
  const navigate = useNavigate();  // Initialize useNavigate hook for redirection
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
  const handleCreateGroup = async (e) => {
    e.preventDefault();

    // Client-side validation to check if fields are not empty
    if (!name || !description) {
      setError('Both group name and description are required.');
      return;
    }
    console.log('sks',name , description)
    console.log(typeof name, name);         // should log: string "Some Name"
    console.log(typeof description, description); 
    try {
      // Send the request to create a group
      const data={'name':name,'description':description}
      console.log('data',data)
       await axios.post('/api/groups/',data,
        {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,  // Attach the token to the request header
          },
        }
      )
      .then(res=>{
        console.timeLog('res',res)
         // Use response data
      console.log('res',res.data);  // Log res data for debugging
      setGroupId(res.data.group_id);  // Store the group ID from the backend res
      setSuccessMessage('Group created successfully! Redirecting...');
      if(res.data.msg==="Group created successfully"){
        // axios.get('/api/groups/',name,{
        //   headers: {
        //     'Content-Type': 'application/json',
        //     "Authorization": `Bearer ${token}`,  // Attach the token to the request header
        //   },
        // })
         setTimeout(() => {
          navigate('/') // Redirect to the newly created group page
      }, 2000);
      }
      // Wait for 2 seconds before redirecting
     

      setName('');  // Resetting the form after successful submission
      setDescription('');
      })
    } catch (err) {
      // Handle errors that occur during the request
      console.log('res error',err)
      if (err.response) {
        console.error('Create group error:', err.response.data);  // Log error for debugging
        setError(err.response.data.msg || 'Failed to create group');  // Display backend error message
      } else if (err.request) {
        // This case handles network-level errors (like CORS)
        console.error('Create group network error:', err.request);
        setError('Network error. Please check your connection and try again.');
      } else {
        // This will catch other errors
        console.error('Create group unexpected error:', err.message);
        setError('Failed to create group. Please try again later.');
      }
    }
  };

  return (
    <div className='create-groupWrapper'>
    <div className="create-group-container">
      <h2>Create Group</h2>

      {/* Display success message after successful registration */}
      {successMessage && <p className="success-message">{successMessage}</p>}

      {/* Display error message if registration fails */}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleCreateGroup}>
        <label htmlFor="group-name">Group Name</label>
        <input
          id="group-name"
          type="text"
          placeholder="Enter group name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="group-description">Group Description</label>
        <textarea
          id="group-description"
          placeholder="Enter group description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="submit">Create</button>
      </form>

      {/* If the group is created, show the group ID */}
      {groupId && <p>Group created with ID: {groupId}</p>}
    </div>
  </div>
  );
};

export default CreateGroup;
