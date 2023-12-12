import React, { useEffect, useState } from 'react'
import './BankInfo.css'
import axios from 'axios'
export default function BankInfo({bankList,handleStateValueUp,pageChange}) {

    const baseURL="http://localhost:8099/api/v1/transaction/transfer/recipient";

    const [accountInfo,setAccountInfo]= useState({
        bankName:"",
        accountNumber:"",
        accountName:""
    })

    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        fetchAccountInfo()
    },[accountInfo.accountNumber,accountInfo.bankName,accountInfo.accountName],console.log(accountInfo))

    const axiosConfig = {
        method: "post",
        url: baseURL,
        headers: {
          'Content-Type': 'application/json', // Assuming you're sending JSON data
        },
        data: {
          // Include the data you want to send in the POST request body here
          // For example:
          // key1: 'value1',
          // key2: 'value2',
          bankName:"",
          accountNumber:"",
        }
      }

    const handleBankInfoUpdate=(event)=>{
        setAccountInfo({
            ...accountInfo, [event.target.name]:event.target.value
        })
    }
    const fetchAccountInfo=()=>{
        console.log(accountInfo.accountNumber)
        if(accountInfo.accountNumber.length>9 && accountInfo.accountNumber.length<=10){
            setLoading(true)
            axiosConfig.data.accountNumber=accountInfo.accountNumber;
            axiosConfig.data.bankName=accountInfo.bankName;
            console.log(axiosConfig.data)
            axios(axiosConfig)
                .then(response => {
                    setLoading(false) 
                    setAccountInfo({
                        ...accountInfo,accountName:response.data.data.details.account_name
                    })
                  
                })
                .catch(error => {
                console.error(error);
                });
        }else{
            setAccountInfo({
                ...accountInfo,accountName:""
            })
        }
    }
    const saveBankInfo=()=>{
        handleStateValueUp("accountDetailsDto",accountInfo)
        pageChange(3)

    }

  return (
    <div className='bank-info-cont'>
        <h2>Payment Information</h2>
        <div className='input-group'>
            <fieldset>
                <legend>Bank</legend>
                <select name="bankName" value={accountInfo.bankName} className='custom-option' onChange={handleBankInfoUpdate}>
                    {
                        bankList.map((bank,index)=><option value={bank} key={index}>{bank}</option>)
                    }
                </select>
            </fieldset>
        </div>
        <div className='input-group'>
            <fieldset>
                <legend>Account Number</legend>
                <input type="number"  name='accountNumber' value={accountInfo.accountNumber} onChange={handleBankInfoUpdate}/>
            </fieldset>
        </div>
        <div className="input-group account-group">
        {loading&&<i class='fas fa-spinner fa-spin' >  </i> }
            <span className="account-holder">{accountInfo.accountName}</span>
        </div>

        <div className="save-bank-btn-cont">

            <button className='btn-primary' onClick={saveBankInfo}>Save</button>
        </div>
    </div>
  )
}