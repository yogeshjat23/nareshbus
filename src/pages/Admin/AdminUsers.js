import { message, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PageTitle from '../../components/PageTitle';
import { hideLoading, showLoading } from '../../redux/alertsSlice';
import { axiosInstance } from '../../helpers/axiosInstance';

function AdminUsers() { 
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  
  const getUsers = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post
      ("http://localhost:5000/api/users/get-all-users", {});
      dispatch(hideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };
  const updateUserPermissions = async (user, action) => {
    try {
      let payload = { _id: user._id };
      if (action === "make-admin") {
        payload.isAdmin = true;
      } else if (action === "remove-admin") {
        payload.isAdmin = false;
      } else if (action === "block") {
        payload.isBlocked = true;
      } else if (action === "unblock") {
        payload.isBlocked = false;
      }
  
      dispatch(showLoading());
      const response = await axiosInstance.post(
        "http://localhost:5000/api/users/update-user-permissions",
        payload
      );
      dispatch(hideLoading());
      if (response.data.success) {
        getUsers();
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };
  
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Status",
      dataIndex: "",
      render: (data) => (data.isBlocked ? "Blocked" : "Active"),
    },
    {
      title: "Role",
      dataIndex: "",
      render: (data) => (data.isAdmin ? "Admin" : "User"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => {
        return (
          <div className="d-flex gap-3">
            {record?.isBlocked && (
              <p
                className="underline"
                onClick={() => updateUserPermissions(record, "unblock")}
              >
                UnBlock
              </p>
            )}
            {!record?.isBlocked && (
              <p
                className="underline"
                onClick={() => updateUserPermissions(record, "block")}
              >
                Block
              </p>
            )}
            {record?.isAdmin && (
              <p
                className="underline"
                onClick={() => updateUserPermissions(record, "remove-admin")}
              >
                Remove Admin
              </p>
            )}
            {!record?.isAdmin && (
              <p
                className="underline"
                onClick={() => updateUserPermissions(record, "make-admin")}
              >
                Make Admin
              </p>
            )}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <div className='d-flex justify-content-between my-2'>
        <PageTitle title='Users' />
      </div>
      <Table columns={columns} dataSource={users} />
    </div>
  );
}
export default AdminUsers;
