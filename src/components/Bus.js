import React from 'react'
import { useNavigate } from 'react-router-dom';

function Bus({bus}) {
    const navigate = useNavigate();
  return (
    <div className="card p-2">
      <h1 className="text-lg primary-text"><b>{bus.name}</b></h1>
      <hr style={{ border: '1px solid #555', margin: '10px 0' }} />
     <div className="d-flex justify-content-between">
     <div>
       <p className="text-sm">From</p>
       <p className="text-sm">{bus.from}</p>
     </div>   
     <div>
       <p className="text-sm">To</p>
       <p className="text-sm">{bus.to}</p>
     </div>
     <div>
       <p className="text-sm">Fare</p>
       <p className="text-sm">${bus.fare} /-</p>
     </div>
    </div>
    <div className="d-flex justify-content-between align-items-end">
    <div>
    <p className="text-sm text-start" >Journey Date</p>
    <p className="text-sm text-start" >{bus.journeyDate}</p>
    </div>
     <h1 className="text-lg underline secondary-text" onClick={() => {
    navigate(`/book-now/${bus._id}`)
    }}>Book Now</h1>
     </div>
    </div>
  )
}

export default Bus
