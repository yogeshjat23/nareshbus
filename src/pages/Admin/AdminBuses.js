import { message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import BusForm from '../../components/BusForm';
import PageTitle from '../../components/PageTitle';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { axiosInstance } from '../../helpers/axiosInstance';

function AdminBuses() {
  const [showBusForm, setShowBusForm] = useState(false); // Use boolean for form visibility
  const [buses, setBuses] = useState([]);
  const dispatch = useDispatch();
  const [selectedBus, setSelectedBus] = useState(null);
  const getBuses = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("http://localhost:5000/api/buses/get-all-buses", {});
      dispatch(hideLoading());
      if (response.data.success) {
        setBuses(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  const deleteBus = async (id) => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post("http://localhost:5000/api/buses/delete-bus", {
        _id: id,
      });
      dispatch(hideLoading());
      if (response.data.success) {
        message.success(response.data.data);
        getBuses();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  const columns = [
     {
       title: "Name", 
       dataIndex: "name" 
      },
    { 
      title: "Number",
       dataIndex: "number" 
      },
    { 
      title: "From", 
      dataIndex: "from" 
    },
    { 
      title: "To", 
      dataIndex: "to"
     },
    { 
      title: "Journey Date",
       dataIndex: "journeyDate",
      },
    {
       title: "Status", 
       dataIndex: "status" 
      },
    {
      title: "Action",
      dataIndex: "",
      render: (action, record) => {
        return (
          <div className='d-flex gap-3'>
            <i className="ri-delete-bin-line" onClick={() => deleteBus(record._id)}></i>
            <i className="ri-pencil-line" onClick={() => {
              setSelectedBus(record);
              setShowBusForm(true);
            }}></i>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getBuses();
  }, []);

  return (
    <div>
      <div className='d-flex justify-content-between my-2'>
        <PageTitle title='Buses' />
        <button className='primary-btn' onClick={() => setShowBusForm(true)}>
          Add Bus
        </button>
      </div>
      <Table columns={columns} dataSource={buses} />
      {showBusForm && (
        <BusForm
          showBusForm={showBusForm}
          setShowBusForm={setShowBusForm}
          type={selectedBus ? "edit" : "add"}
          selectedBus={selectedBus}
          setSelectedBus={setSelectedBus}
          getData={getBuses}
        />
      )}
    </div>
  );
}

export default AdminBuses;
