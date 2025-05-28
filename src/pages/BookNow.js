import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { axiosInstance } from '../helpers/axiosInstance';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import { useDispatch } from 'react-redux';
import { message, Row, Col } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import SeatSelection from '../components/SeatSelection';

function BookNow() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bus, setBus] = useState(null);
  
  const bookNow = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post
      ("http://localhost:5000/api/bookings/book-seat", {
        bus: bus._id,
        seats: selectedSeats,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.data);
        getBus();
        alert("booking is successful");
        navigate("/bookings");
      } else {
        message.error(response.data.message);
        alert("booking is failed");
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };
  
  const getBus = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post
      ("http://localhost:5000/api/buses/get-bus-by-id", {
        _id: params.id,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setBus(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBus();
  }, []);

  return (
    <div>
      {bus && (
        <Row className="mt-3" gutter={[30, 30]}>
          <Col lg={12} xs={24} sm={24}>
            <h1 className="text-2xl primary-text">{bus?.name}</h1>
            <h1 className="text-md">{bus?.from} - {bus?.to}</h1>
            <hr style={{ border: '1px solid #555', margin: '10px 0' }} />
            <div className="flex flex-col gap-2">
              <p className="text-md">Journey Date: {bus?.journeyDate}</p>
              <p className="text-md">Fare: ${bus?.fare} /-</p>
              <p className="text-md">Departure Time: {bus?.departure}</p>
              <p className="text-md">Arrival Time: {bus?.arrival}</p>
              <p className="text-md">Capacity: {bus?.capacity}</p>
              <p className="text-md">
               Seats left: 
               {typeof bus?.capacity === 'number' && Array.isArray(bus?.seatBooked)
                ? bus.capacity - bus.seatBooked.length: 'Data unavailable'}
                </p>
            </div>
            <hr style={{ border: '1px solid #555', margin: '10px 0' }} />
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl mt-2">Selected Seats:
                 {selectedSeats.join(",")}</h1>
              <h1 className="text-2xl mt-3">Total:
                 ${bus?.fare * selectedSeats?.length}</h1>
                <hr style={{ border: '1px solid #555', margin: '10px 0' }} />
              <button
                className={`primary-btn 
                  ${selectedSeats.length === 0 && "disabled-btn"}`}
                onClick={bookNow}
                disabled={selectedSeats.length === 0}
              >
                Book Now
              </button>
            </div>
          </Col>
          <Col lg={12} xs={24} sm={24}>
            <SeatSelection
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              bus={bus}
            />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default BookNow;
