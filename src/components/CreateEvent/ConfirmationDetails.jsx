import React, { useEffect, useState } from 'react'
import "./ConfirmationDetails.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useUserContext } from '../../UserContext'
import { FetchingData } from '../FetchingData'


export const ConfirmationDetails = ({eventTitle,organizer,category,bannerPath,location,startDateTime,endDateTime,changeView,eventInformation}) => {
    const {loginInfo}=useUserContext()
    const navigate = useNavigate()

    const [loading,setLoading] = useState(false)

    if(loginInfo.loggedIn != true){
      navigate("/login");
    }
  
    const startDT = startDateTime.split("T")
    const endDT= endDateTime.split("T")
    const handleSaveEvent=()=>{
        setLoading(true)
        let token=loginInfo.token
        const target = "http://localhost:8099/api/v1/event/save_event"
        const axiosConfig ={
            method:"post",
            url:target,
            headers:{
            'Authorization':`Bearer ${token}`
            },
            data:eventInformation
        }
        axios(axiosConfig)
        .then(response=>{
            setLoading(false)
        console.log(response)
        navigate("/user/dashboard")
       // setEvent(response.data)
        })
        .catch(error=>{
        console.error(error)
        });
        
    }
  return (
    <div className='confirmation-container'>
        <div className="confirmation-heading">
            <div className="confimation-section">
                <span className="confimation-heading-text block-tag">Confirmation Details</span>
                <span className="confirmation-hint block-tag mt-1 ">Please review to confirm event details</span>
            </div>
         
            <div className="confimation-section">
                <button className='btn-edit-event-details mr-1'><img src='Edit.png' onClick={()=>changeView(1)}  />  Edit</button>
                <a href="" className="veiw-all-event-link text-primary">View all Events created</a>
            </div>
        </div>
              <hr className='mt-2'/>
            <div className="confirmation-text-section">
                <span className="confirmation-item-title">Event Title</span>
                <span className="confirmation-item-text">{eventTitle}</span>
            </div>
            <div className="confirmation-text-section">
                <span className="confirmation-item-title">Organizer</span>
                <span className="confirmation-item-text">{organizer}</span>
            </div>

            <div className="confirmation-text-section">
                <span className="confirmation-item-title">Ticket Class</span>
                <span className="confirmation-item-text">VVIP, VIP, Regular</span>
            </div>

            <div className="confirmation-text-section">
                <span className="confirmation-item-title">Category</span>
                <span className="confirmation-item-text">{category}</span>
            </div>

            <div className="confirmation-image-section">
                <span className="comfirmation-img-title">Bearer</span>
                <div className="confirmation-img">
                    <img src={bannerPath} alt="" />
                </div>
            </div>

            <div className="confirmation-text-section">
                <span className="confirmation-item-title">Location</span>
                <span className="confirmation-item-text">{location}</span>
            </div>

            <div className="confirmation-text-section">
                <span className="confirmation-item-title">Date & Time</span>
                <span className="confirmation-item-text">{startDT[0]}  -  {endDT[0]}</span>
                <span className="confirmation-item-text"> {startDT[1]}  -  {endDT[1]} </span>

            </div>

            <div className="confirmation-btn-section">
                <button className='btn-primary' onClick={handleSaveEvent}>Send & Publish</button>
            </div>
            {loading&&<FetchingData text="Saving event. Please wait ..."/>}
        </div>

  )
}
