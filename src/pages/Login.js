import React from 'react';
import { Form, message } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/alertsSlice';
import axios from 'axios';
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const onFinish = async(values)=>{
    try{
      dispatch(showLoading());
     const response = await axios.post("http://localhost:5000/api/users/login", values);
     dispatch(hideLoading());
   if(response.data.success){
     message.success(response.data.message);
     localStorage.setItem("token",response.data.data);
     window.location.href = "/";
     alert(response.data.message)
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
 //https://media.istockphoto.com/id/1949227473/photo/woman-commuting-to-work-by-bus-in-new-york.webp?a=1&b=1&s=612x612&w=0&k=20&c=FLDqwnGERipvyfcVaUARxnz9dG5Dewv3GxL0JOE9Tvo=
  return (
    <div className='h-screen d-flex justify-content-center 
    align-items-center'
    style={{
      backgroundImage: "url('https://t4.ftcdn.net/jpg/02/69/47/51/360_F_269475198_k41qahrZ1j4RK1sarncMiFHpcmE2qllQ.jpg')",
      backgroundSize: 'cover',  
      backgroundPosition: 'center',  
    }}>
      <div className='w-400 card p-3 '>
        <h1 className='text-lg'>SheyBus-Register</h1>
        <hr/>
      <Form layout='vertical' onFinish={onFinish}>
        <Form.Item label='Email' name='email'>
           <input type="text"/>
        </Form.Item>
        <Form.Item label='Password' name='password'>
           <input type="password"/>
        </Form.Item>

        <div className='d-flex justify-content-between align-items-center my-3'>
        <Link to='/register'>click here to register</Link>
      <button className='secondary-btn mt-2' type='submit'>login</button>
       </div>

      </Form>
      </div>
    </div>
  );
}

export default Login; 