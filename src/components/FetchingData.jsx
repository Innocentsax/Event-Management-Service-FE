import React from 'react'
import "./FetchingData.css"

export const FetchingData = ({text}) => {
  return (
    <div className='loading-spinner-cont'>
        <div className='sub-loading'>
           <div className="spinner-cont text-primary">
                <i id='spinner' className='fas fa-circle-notch fa-spin'></i>
            </div>  
            <div className="spinner-text mt-1">
                <span className="spinner-text-info">
                    {text}
                </span>
            </div>
        </div>
    </div>
  )
}
