import React from 'react'

export const AllUserEvent = ({event}) => {
  let imgPath = event.banner;
  const splitDateTime=(data)=>{
    return data.split("T");
  }
  return (
    <div className='mt-4 mb-4'>
          <div className='single-user-event-entry'>
            <div className='event-entry-section'>
              <div className="event-entry-sub-section">
                <div className='event-record-img'>
                  <img src={`${event.bannerPath}`} alt="img" />
                </div>
              </div>
              <div className="event-entry-sub-section">
                <div>
                <p className="label">Event Title</p>
                <p className="event-detail">{event.eventTitle}</p>
                </div>
                <div>
                  <p className="label">Organiser</p>
                  <p className="event-detail">{event.organizer}</p>
                </div>
                <div>
                  <p className="label">Ticket Class</p>
                  <p className='event-detail'>VVIP, VIP, REGULAR</p>
                </div>
              </div>
            </div>
            <div className='event-entry-section'>
              <div className="event-entry-sub-section">
                <div>
                  <p className="label">Category</p>
                  <p className="event-detail">{event.category}</p>
                </div>
                <div>
                <p className="label">Location</p>
                <p className="event-detail">{event.location}</p>
                </div>
                <div>
                  <p className="label">Date & Time</p>
                  <p className="event-detail">{
                  `${splitDateTime(event.startDateTime)[0]}   ${splitDateTime(event.startDateTime)[1]}`
                  }</p>
                </div>
              </div>
              <div className="event-entry-sub-section event-links">
                <div className='event-status'>
                  <span >Active</span>
                </div>
                <div className='ticket-sold'><a href="http://" className='view-ticket-link text-primary'>View Tickets Sold</a></div>
                <div className='ticket-edit-img'><span>  <i class='fas fa-edit'></i></span></div>
              </div>
            </div>
          </div>
    </div>
  )
}
