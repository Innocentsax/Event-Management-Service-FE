import React from 'react'
import "./Ticket.css"

export default function ({ticketCostName, ticketCostValue,ticketQuantityName,ticketQuantityValue, ticketText,ticketAction}) {
  return (
    <div className='single-ticket'>
        <div className='single-ticket-sub sub-1'>
            <div>
                <span className='ticket-title'>{ticketText}</span>
            </div>
            <div>
                <input type='number' name={ticketQuantityName} placeholder='100' value={[ticketQuantityValue]} onChange={ticketAction} /> available 
            </div>
        </div>
        <div className='single-ticket-sub sub-2'>
            <div>
                <span>&#8358;</span> <input type="number" name={ticketCostName} value={ticketCostValue} placeholder='500' onChange={ticketAction}/>
            </div>  
        </div>
    </div>
    
  )
}
