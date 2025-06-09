import React, { use, useEffect, useState } from 'react';
import axios from '../../axios';
import './GroupList.css'; // Import the CSS file
import { useNavigate,useLocation } from 'react-router-dom';
const GroupList = () => {
  const [groups, setGroups] = useState([]);
  const [token, setToken] = useState('');
  const navigate= useNavigate()
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
  const handletoGroups =(group)=>{
    console.log(group)
    navigate(`/groups/${group.id}`,{state:group})
  }
  useEffect(()=>{
  getToken()
  },[])
  console.log('token',token)
  useEffect(() => {
    const fetchGroups = async () => {
     if(token){
      try {
        const response = await axios.get('/api/groups/', {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
          },
        });
        setGroups(response.data.groups);
        console.log('res',response)
      } catch (err) {
        console.error('Failed to fetch groups');
      }
     }
    };

    fetchGroups();
  }, [token]);

  return (
    <div className='GroupDetailsWrapper'>
       <h1 >All Groups</h1>
    <div className='GroupDetailsContainer'>
    {groups.length > 0 ? (
      groups.map((group) => (
        <div  key={group.id} className="GroupDetails">
          <h2>{group.name}</h2>
          <p>Description: {group.description}</p>
          <button onClick={() => handletoGroups(group)}>View</button>
        </div>
      ))
    ) : (
      <p>No groups found</p>
    )}
    </div>
</div>
  //   <div className='groupWrapper'>
  //   <div className="group-list-container">
  //     <h2>All Groups</h2>
  //     {groups.length > 0 ? (
  //       <ul>
  //         {groups.map((group) => (
  //           <li onClick={()=>handletoGroups(group)} key={group.id}>
  //            {group.name}
  //           </li>
  //         ))}
  //       </ul>
  //     ) : (
  //       <p>No groups found</p>
  //     )}
  //   </div>
  // </div>
  );
};

export default GroupList;
