import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../redux/usersSlice';
import { showLoading, hideLoading } from '../redux/alertsSlice'; // Correct action names
import DefaultLayout from '../components/DefaultLayout';

function ProtectedRoute({children}) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.users || { user: null });
    const navigate = useNavigate();

    // Set up Axios interceptor for 401 errors
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    message.error('Unauthorized access. Please log in again.');
                    localStorage.removeItem('token');
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        // Clean up interceptor on component unmount
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, [navigate]);

    const validateToken = async () => {
        try {
            dispatch(showLoading()); // Correct action name
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token not found'); // Early validation
            const response = await axios.post(
                'http://localhost:5000/api/users/get-user-by-id',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            dispatch(hideLoading()); // Correct action name
            if (response.data.success) {
                dispatch(setUser(response.data.data));
            } else {
                localStorage.removeItem('token');
                message.error(response.data.message);
                navigate('/login');
            }
        } catch (error) {
            dispatch(hideLoading()); // Correct action name
            localStorage.removeItem('token');
           // message.error('From protected route'); 
            message.error(error.message || 'Something went wrong');
            navigate('/login');
        }
    };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            validateToken();
        } else {
            navigate('/login');
        }
    }, [navigate]);

    // Ensure children are properly passed to DefaultLayout
    return <div>{user && <DefaultLayout>{children}</DefaultLayout>}</div>;
}

export default ProtectedRoute;
