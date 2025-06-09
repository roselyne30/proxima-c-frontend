import React,{useState,useEffect} from 'react'
import { useLocation ,useNavigate} from 'react-router-dom'
export default function GroupDetails() {
    const location = useLocation()
    const navigate=useNavigate()
    const [data,setData]=useState([])
    const [joined,setJoined]=useState(false)
    const handleToDepist =(data)=>{
        navigate('/deposit/1',{state:data})
    }
    const handleJoin =()=>{
        setJoined(true)
        localStorage.setItem('status',joined)
    }
    useEffect(()=>{
    const status= localStorage.getItem('stutus')
    setJoined(status)
    },[])
    useEffect(()=>{
        const {state}= location
        if(state){
          console.log('state',state)
          setData([state])
        }
      },location)
  return (
    <div className='GroupDetailsWrapper'>
        <div className='GroupDetailsHolder'>
            {data.map(res=>{
                return(
                <div key={res.id} className='GroupCard'>
                    <h2>{res.name}</h2>
                    <p>Description:{res.description}</p>
                    <div className='groupsBtnWrapper'>
                    {joined===false?<button onClick={handleJoin}>Join</button>:<button>Joined</button>}
                    <button onClick={()=>handleToDepist(res)}>deposit</button>
                    </div>
                </div>
                )
            })}
        </div>
    </div>
  )
}
