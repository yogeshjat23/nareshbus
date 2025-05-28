import React from 'react';
import { Alert, Form, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showLoading, hideLoading } from '../redux/alertsSlice';
function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onFinish = async(values)=>{
       try{
         dispatch(showLoading());
        const response = await axios.post("http://localhost:5000/api/users/register", values);
         dispatch(hideLoading());
      if(response.data.success){
        message.success(response.data.message);
        alert(response.data.message)
        navigate("/login");
      }
      else{
        message.error(response.data.message);
        alert(response.data.message)
      }
       }
       catch(error){
        dispatch(hideLoading());
        message.error(error.message);
        alert(error.message)
       }
    }
  return (
    <div className='h-screen d-flex justify-content-center align-items-center'
    style={{
      backgroundImage: "url('https://www.shutterstock.com/image-photo/white-modern-comfortable-tourist-bus-260nw-1654594828.jpg')",
      backgroundSize: 'cover',  
      backgroundPosition: 'center',  
    }}
     >
      <div className='w-400 card p-3'>
        <h1 className='text-lg'>SheyBus-Register</h1>
        <hr/>
      <Form layout='vertical' onFinish={onFinish}>
        <Form.Item label='Name' name='name'>
           <input type="text"/>
        </Form.Item>
        <Form.Item label='Email' name='email'>
           <input type="text"/>
        </Form.Item>
        <Form.Item label='Password' name='password'>
           <input type="password"/>
        </Form.Item>

        <div className='d-flex justify-content-between align-items-center'>
        <Link to='/login'>click here to login</Link>
      <button className='secondary-btn' type='submit'>Register</button>
       </div>

      </Form>
      </div>
    </div>
  );
}

export default Register;
