import React from 'react'

export const EventConfimation = () => {
  return (
    <div>
        <h2>Confirmation Details</h2>
        <p>Please confirm the details provide to complete the event registration process</p>
        <hr className='mt-2 mb-2'/>

        <div className='content-row'>
            <h3>Event Title</h3>
            <span></span>
        </div>

        <div className='content-row'>
            <h3>Organizer</h3>
            <span></span>
        </div>

        <div className='content-row'>
            <h3>Ticket Class</h3>
            <span></span>
        </div>

        <div className='content-row'>
            <h3>Category</h3>
            <span></span>
        </div>
        
        <h3>Banner</h3>

        <div className='content-row'>
            <h3>Location</h3>
            <span></span>
        </div>

        <div className='content-row'>
            <h3>Date & Time</h3>
            <span></span>
            <span></span>
        </div>

    </div>
  )
}
