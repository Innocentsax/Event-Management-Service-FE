import React, { useState } from 'react'

export default function Location({handleChange}) {
    const [closeState,setCloseState]=useState(false);
    const [eventInformation,setEventInformation]=useState({
        eventType:1,
        eventAddress:"",
    });
    const handleClose =()=>{
        setCloseState(!closeState)
    }

    const handleEventLocation=(event)=>{
        setEventInformation({...eventInformation,eventType:event})
        setCloseState(!closeState)
    }

    const handleLocationUpdate=(event)=>{
        setEventInformation({...eventInformation,eventAddress:event.target.value},console.log(eventInformation))
    }


    const updateLocation=()=>{
        handleChange("location",eventInformation.eventAddress)
        setCloseState(!closeState)
    }
  return (
    <div className='mt-4'>
        <h2>Location</h2>
        <span>Select appriote location for the event</span>
        <div className='event-location-container mt-3 mb-3'>
            <button className='btn-secondary mr-3' onClick={()=>handleEventLocation(1)}>Online</button>
            <button className='btn-secondary ml-2' onClick={()=>handleEventLocation(2)} >Venue</button>
        </div>
        {closeState &&
        <div className='location-modal'>
            
                <div className='location-online'>
                    <button className='closeLocation' onClick={handleClose}>Close</button>
                    {
                        eventInformation.eventType==1?
                        <h3 className='text-secondary'>ONLINE EVENT</h3>
                        :
                        <h3 className='text-secondary'>PHYSICAL EVENT</h3>
                    }
                    <fieldset>
                    {
                        eventInformation.eventType==1?
                        <legend>Enter link</legend>
                        :
                        <legend>Enter Physical location</legend>
                    }
                        
                        <input name='location' type='text' value={eventInformation.eventAddress} onChange={handleLocationUpdate}/>
                    </fieldset>
                    <button className='btn-secondary mt-1' onClick={updateLocation}>
                    {
                        eventInformation.eventType==1?"Save Link":"Save Address"
                    }
                    </button>
                </div>

            
            
            {/* <div className='location-online'>
                <h3 className='text-secondary'>PHYSICAL EVENT</h3>
                <fieldset>
                    <legend>Enter Address</legend>
                    <input name='location' type='text'/>
                </fieldset>
                <button className='btn-secondary mt-1'>Save Location</button>
            </div> */}
        </div>
        }
    </div>
  )
}
