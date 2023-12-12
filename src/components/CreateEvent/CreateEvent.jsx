import React, { useState } from 'react'
import BasicEventInfo from './BasicEventInfo'
import EventDateTime from './EventDateTime';
import "./CreateEvent.css";
import BankInfo from './BankInfo';
import axios from 'axios';
import { ConfirmationDetails } from './ConfirmationDetails';
import { useUserContext } from '../../UserContext';
import { useNavigate } from 'react-router-dom';



export default function () {
    const navigate = useNavigate();
    const {loginInfo}=useUserContext()
  

    if(loginInfo.loggedIn != true){
      navigate("/login");
    }
  

    const [eventInfo,updateEventInfo] = useState({
        eventTitle:"",
        eventDescription:"",
        location:"",
        category:"",
        organizer:"",
        availableTicket:"",
        startDateTime:"",
        endDateTime:"",
        accountDetailsDto:{
            bankName:"",
            accountName:"",
            accountNumber:0
        },
        bannerPath:"",
        tickekSold:0,
        revenueGenerated:0,
        ticketsInfo:[
            {
                ticket:"VVIP TICKET",
                cost:0,
                totalQuantity:0
            },
            {
                ticket:"VIP TICKET",
                cost:0,
                totalQuantity:0
            },
            {
                ticket:"REGULAR TICKET",
                cost:0,
                totalQuantity:0
            }
        ]
    });

    const[datesTime,upDateTime] = useState({
        startDate:"",
        startTime:"",
        endDate:"",
        endTime:""  
    })

    const [serverData,setServerData]=useState({
        eventCategories:[],
        bankName:[],
        ticketTypes:[]
    });

    const [activeViewEvent,setActiveViewEvent] =  useState({
        activeView:1
    });


    const handleEventInfoUpdate=event=>{
        updateEventInfo({
            ...eventInfo,[event.target.name]:event.target.value
        },[]
        )
    }
    
    const handleStateUpdate =(name,data)=>{
        updateEventInfo({
            ...eventInfo,[name]:data
        }, [], console.log(eventInfo))
    }
    const handlePageUpdate=(val)=>{
        setActiveViewEvent({...activeViewEvent,activeView:val})
    }
    const handeleEventDateUpdate=(startDT,endDT)=>{
        updateEventInfo({
            ...eventInfo, startDateTime:startDT,endDateTime:endDT
        })
    }

    const baseURL="http://localhost:8099/api/v1/event/all_tickets_category_banks";
    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
          setServerData(
            {...serverData,
                eventCategories:response.data.eventCategories,
                bankName:response.data.bankName.bankNames
            }
            ,console.log(serverData));
        });
      }, [], console.log(serverData));
    
      React.useEffect(() => {

      }, [eventInfo], console.log(eventInfo));
  return (
    <div className='event'>
        {
            activeViewEvent.activeView==1?
            <BasicEventInfo {...eventInfo}  updateState={handleEventInfoUpdate} handleStateValueUpdate={handleStateUpdate} pageChange={handlePageUpdate} eventCat={serverData.eventCategories}  handleDateUpdate={handeleEventDateUpdate} /> 
            :
            activeViewEvent.activeView==2?
            <BankInfo {...eventInfo} updateState={handleEventInfoUpdate}  pageChange={handlePageUpdate} bankList={serverData.bankName} handleStateValueUp={handleStateUpdate}/>
            :<ConfirmationDetails {...eventInfo}  changeView={handlePageUpdate} eventInformation={eventInfo} />

        }
    </div>
  )
}
