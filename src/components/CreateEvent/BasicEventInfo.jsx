import React, { useState } from 'react'
import EventDateTime from './EventDateTime'
import EventTicket from './EventTicket'
import "./BasicInfo.css";
import Location from './Location';
import axios from 'axios';


export default function BasicEventInfo({startDateTime,endDateTime,eventTitle,eventDescription,category,organizer, updateState,pageChange,eventCat,handleStateValueUpdate,handleDateUpdate }) {
    const [pageNav,updatePageNav]=useState({
        ticketsView:false
    });

    const handleTicketView=()=>{
        updatePageNav({...pageNav,ticketsView:!pageNav.ticketsView})
    }
    const preset_key="dmv7hvelhmacpaul";
    const cloud_name="dmv7hvelh";

    const handleFile =(event)=>{
    const file = event.target.files[0];
    console.log(file)
    const formData = new FormData();
    formData.append('file',file);
    formData.append('upload_preset', preset_key);
        axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formData)
        .then(res=>handleStateValueUpdate("bannerPath",res.data.url))
        .catch(err=>console.log(err));
  }

    
  return (
    <>
        <div className='div-info'>
            <span>Note for every ticket sold, there would be a 9.99% deduction</span>
        </div>
        <div className='mt-4'>
        <h2>Basic Info</h2>
            <p>Please provide relevant details in the provided fields</p>
        <div className='input-group'>
            <fieldset>
                <legend>Event Title</legend>
                <input type='text' name="eventTitle"  value={eventTitle} onChange={updateState}/>
            </fieldset>
        </div>
        <div className='input-group'>
            <fieldset>
                <legend>Organizer</legend>
                <input type='text' name="organizer"  value={organizer} onChange={updateState}/>
            </fieldset>
        </div>
        <div input-group>
            <fieldset>
                <legend>Event Description</legend>
                <textarea  name="eventDescription" onChange={updateState}  rows="5" value={eventDescription}></textarea>
            </fieldset>
        </div>

        <div className='double-content'>
            <div className='sub-cont'>
                <div className='input-group'>
                    <fieldset>
                        <legend>Ticket Class</legend>
                        <button id='btn-setup-ticket' onClick={handleTicketView}>! Setup Ticket Info</button>
                    </fieldset>
                </div>
            </div>

            <div className='sub-cont left-group-sub'>
                <div className='input-group'>
                    <fieldset>
                        <legend>Category</legend>
                        <select name="category" id="event-category" value={category} onChange={updateState}>
                            {
                                eventCat.map((item,index)=><option key={index} value={item}>{item}</option>)
                            }
                        </select>  
                    </fieldset>
                </div>
            </div>
        </div>
        <div className='event-banner'>
            <h3>Upload Event Banner</h3>
            <div className='event-banner-content'>
                <img className='mt-4' src="Upload.png" alt="upload icon"  /> <br/>
                <span>Upload from file</span>
                <p className='mb-4'>PNG or JPG only</p>
            </div>
            <input type='file' name='image' onChange={handleFile}/>
        </div>
        <Location handleChange={handleStateValueUpdate}/>
        <EventDateTime startDate={startDateTime} endDate={endDateTime}  handleValueUpdate={handleStateValueUpdate} handleDateValueUpdate={handleDateUpdate} />
        <div className='save-continue'>
            <button className='btn-primary' onClick={()=>pageChange(2)} >Save & Continue</button>
        </div>
        {pageNav.ticketsView && <EventTicket  ticketViewHandler={handleTicketView}  handleStateUpdate={handleStateValueUpdate}/>}
    </div>
    </>
  )
}
