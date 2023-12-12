import React, { useEffect, useState } from 'react'
import Ticket from './Ticket'
import "./EventTicket.css";
import "./Ticket.css";

export default function EventTicket({ticketViewHandler,handleStateUpdate}) {
  const [ticketValue,setTicketValues]=useState(
    {
      vvip_quantity:0,
      vvip_cost:0,
      vip_cost:0,
      vip_quantity:0,
      regular_cost:0,
      regular_quantity:0
    }

  )
  
  const handleTicketsUpdate=(event)=>{
   setTicketValues({
    ...ticketValue,[event.target.name]:event.target.value
   })
  }
  const updateTicketEventInfo=()=>{
    const ticketInfo=[
        { 
            ticket:"VVIP TICKET",
            cost:ticketValue.vvip_cost,
            totalQuantity:ticketValue.vvip_quantity
        },
        { 
            ticket:"VIP TICKET",
            cost:ticketValue.vip_cost,
            totalQuantity:ticketValue.vip_quantity
        },
        { 
            ticket:"REGULAR TICKET",
            cost:ticketValue.regular_cost,
            totalQuantity:ticketValue.regular_quantity
        }
    ]
    handleStateUpdate("ticketsInfo",ticketInfo)
    ticketViewHandler()

  }

  React.useEffect(()=>{}
  ,[ticketValue], console.log(ticketValue))

  return (
    <div  className='event-ticket-modal'>
        <div className='tickets'>
            <div className='modal-nav'>
                <button onClick={ticketViewHandler} className='btn-secondary'>Close</button>
            </div>
            
            <div className='single-ticket'>
              <div className='single-ticket-sub sub-1'>
                  <div>
                      <span className='ticket-title'>VVIP TICKET</span>
                  </div>
                  <div>
                      <input type='number' placeholder='100' name='vvip_quantity' value={ticketValue.vvip_quantity} onChange={handleTicketsUpdate} /> <span className='label'>available</span> 
                  </div>
              </div>
              <div className='single-ticket-sub sub-2'>
                  <div>
                      <span>&#8358;</span> <input type="number" name='vvip_cost' value={ticketValue.vvip_cost} placeholder='500' onChange={handleTicketsUpdate}/>
                  </div>  
              </div>
          </div>
          <div className='single-ticket'>
              <div className='single-ticket-sub sub-1'>
                  <div>
                      <span className='ticket-title'>VIP TICKET</span>
                  </div>
                  <div>
                      <input type='number' placeholder='100' name='vip_quantity' value={ticketValue.vip_quantity} onChange={handleTicketsUpdate} /> <span className='label'>available</span> 
                  </div>
              </div>
              <div className='single-ticket-sub sub-2'>
                  <div>
                      <span>&#8358;</span> <input type="number" name='vip_cost' value={ticketValue.vip_cost} placeholder='500' onChange={handleTicketsUpdate}/>
                  </div>  
              </div>
          </div>

          <div className='single-ticket'>
              <div className='single-ticket-sub sub-1'>
                  <div>
                      <span className='ticket-title'>REGULAR TICKET</span>
                  </div>
                  <div>
                      <input type='number' placeholder='100' name='regular_quantity' value={ticketValue.regular_quantity} onChange={handleTicketsUpdate} /> <span className='label'>available</span> 
                  </div>
              </div>
              <div className='single-ticket-sub sub-2'>
                  <div>
                      <span>&#8358;</span> <input type="number" name='regular_cost' value={ticketValue.regular_cost} placeholder='500' onChange={handleTicketsUpdate}/>
                  </div>  
              </div>
          </div>
       
          <div className='save-ticket-container mt-2'>
            <button className='btn-save-ticket btn-primary' onClick={updateTicketEventInfo}> Save & Close </button>
          </div>

        </div>
    </div>
  )
}
