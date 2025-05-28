import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Form, message, Modal, Row,Select } from 'antd'; // Corrected "Model" to "Modal"
import { axiosInstance } from '../helpers/axiosInstance';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';

function BusForm({ showBusForm, setShowBusForm, type = 'add',getData,selectedBus,
  setSelectedBus
 }) {
  const dispatch = useDispatch();
  const [journeyDate, setJourneyDate] = useState();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    let response = null;
    try {
      dispatch(showLoading());
      if (type === 'add') {
        response = await axiosInstance.post('http://localhost:5000/api/buses/add-bus',
         values);
      } else {
        response = await axiosInstance.post('http://localhost:5000/api/buses/update-bus',
        {
          ...values,
         _id : selectedBus._id, 
        });
      }
      if (response.data.success) {
        alert(response.data.message)
        message.success(response.data.message);
      } else {
        alert(response.data.message)
        message.error(response.data.message);
      }
       getData();
       setShowBusForm(false);
       setSelectedBus(null);
      dispatch(hideLoading());
    } catch (error) {
      if(response?.data?.message)
        alert(response.data.message);
      navigate('/'); 
      message.error(error.message);
      dispatch(hideLoading());
    }
  };

  return (
    <Modal
      width={800}
      title={type==="add" ? "Add Bus" : "update Bus"}
      open={showBusForm}
      onCancel={() => {
        setSelectedBus(null);
        setShowBusForm(false);
      }}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} initialValues={selectedBus}>
        <Row gutter={[10, 10, 10]}>
          <Col lg={24} xs={24}>
            <Form.Item label="Bus Name" name="name">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Bus Number" name="number">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Capacity" name="capacity">
              <input type="number" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="From" name="from">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="To" name="to">
              <input type="text" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Journey Date" name="journeyDate">
              <input type="Date" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Departure" name="departure">
              <input type="time" />
            </Form.Item>
          </Col>
          <Col lg={8} xs={24}>
            <Form.Item label="Arrival" name="arrival">
              <input type="time" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
          <Form.Item label="Type" name="type">
          <input type="text" />
          </Form.Item>
            </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Fare" name="fare">
              <input type="number" />
            </Form.Item>
          </Col>
          <Col lg={12} xs={24}>
            <Form.Item label="Status" name="status">
              <select name="" id="">
                <option value="yet to start">yet to start</option>
                <option value="Running">Running</option>
                <option value="Completed">Completed</option>
              </select>
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          <button className="primary-btn" type="submit">
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default BusForm;
