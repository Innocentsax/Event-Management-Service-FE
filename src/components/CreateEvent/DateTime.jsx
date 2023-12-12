import React from 'react'

export default function ({title,purpose,caller,current_value,changeHandler}) {
    const handleChange=(trigger)=>{
        changeHandler(trigger)
    }
  return (
    <div className='date-time-btn' >
        <div className='mr-2'>
            <img src="calendar-alt.png" alt="data icon" />
        </div>
        <div>
            <div>
            <span className='timeTItle'>{title}</span>
            </div>
            {
                purpose=='date'?
                <div><span className='timeText'><b><input type='date' name={caller} value={current_value} onChange={handleChange}  pattern="\d{4}-\d{2}-\d{2}" /> </b></span></div>
                :
                <div><span className='timeText'><b><input type='time' name={caller} value={current_value}  onChange={handleChange}/> </b></span></div>
            }
        </div>
    </div>
  )
}
