import React from 'react'
import { AllUserEvent } from './AllUserEvent'
import { useState } from 'react'
import axios from 'axios'
import "./UserEvent.css";
import { useUserContext } from '../../UserContext';
import { useNavigate} from "react-router-dom";

const UserEvent = () => {
  const target = "http://localhost:8099/api/v1/event/UserEvent"
 
  const navigate = useNavigate();
  const {loginInfo}=useUserContext()

  
  console.log(loginInfo);
  if(loginInfo.loggedIn != true){
    navigate("/login");
  }

  let token=loginInfo.token;
   const axiosConfig ={
     method:"get",
     url:target,
     headers:{
       'Authorization':`Bearer ${token}`
     }
   }
  
   const[events, setEvent] =useState([])
   React.useEffect(()=> {
     axios(axiosConfig)
     .then(response=>{
       console.log(response)
       setEvent(response.data)
     })
     .catch(error=>{
       console.error(error)
     });
   },[])
  return (
    <div className='user-event'>
          <h2>All Events Created</h2>
          <span>{events.length} events create so far</span>
          {
            events.map((item)=><AllUserEvent event={item} key={item.id}/>)
          }
    </div>
  )
}
export default UserEvent;
