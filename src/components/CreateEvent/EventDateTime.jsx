import React, { useEffect, useState } from 'react'
import DateTime from './DateTime'

export default function ({startDate,endDate,handleDateValueUpdate}) {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    const formattedToday = dd + '/' + mm + '/' + yyyy;

    const [dateTimeEntry,setDateTimeEntry]=useState({
      start_date:formattedToday,
      start_time:"08:00:00",
      end_date:formattedToday,
      end_time:"08:00:00",
      endDateTime:"",
      startDateTime:"",
    });
    // "startDateTime": "2023-09-08T14:00:00.000+00:00",
  
    const handleDatechange=(event)=>{
      setDateTimeEntry({
        ...dateTimeEntry, [event.target.name]:event.target.value
      },console.log(dateTimeEntry))
    }
    //startDate={startDateTime} endDate={endDateTime}  handleValueUpdate={handleStateValueUpdate}
    const updateEventDataAndTime = ()=>{
      let startDT = dateTimeEntry.start_date+"T"+dateTimeEntry.start_time;
      let endDT = dateTimeEntry.end_date+"T"+dateTimeEntry.end_time
      handleDateValueUpdate(startDT,endDT)    
    }

    // React.useEffect(() => {
    // }, [dateTimeEntry], console.log(dateTimeEntry));

    React.useEffect(()=>{
      updateEventDataAndTime()
    },[dateTimeEntry])

  return (
    <div className='mt-4'>
        <h2>Date & Time</h2>
        <p>Please select appropriate data and time for the event</p>
        <div className='mt-2 date-time-group'>
            <DateTime title='Event Starts' purpose='date' current_value={dateTimeEntry.start_date} changeHandler={handleDatechange} caller='start_date'/>  
            <DateTime title='Event Ends' purpose='date'  current_value={dateTimeEntry.end_date} changeHandler={handleDatechange} caller='end_date'/> 
        </div>
        <div className='mt-2 date-time-group'>
            <DateTime title='Start time' purpose='time'  current_value={dateTimeEntry.start_time} changeHandler={handleDatechange} caller='start_time' />  
            <DateTime title='End time' purpose='time'   current_value={dateTimeEntry.end_time}  changeHandler={handleDatechange} caller='end_time' /> 
        </div>
    </div>
  )
}
