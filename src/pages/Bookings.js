import React, { useRef, useEffect, useState } from 'react';
import { message, Modal, Table } from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import PageTitle from '../components/PageTitle';
import { hideLoading, showLoading } from '../redux/alertsSlice';
import { axiosInstance } from '../helpers/axiosInstance';
import html2pdf from 'html2pdf.js'; // Import html2pdf library

function Bookings() {
  const dispatch = useDispatch();
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosInstance.post(
        'http://localhost:5000/api/bookings/get-bookings-by-user-id',
        {}
      );
      dispatch(hideLoading());
      if (response.data.success) {
        const mappedData = response.data.data.map((booking) => {
          return {
            ...booking,
            ...booking.bus,
            key: booking._id,
          };
        });
        setBookings(mappedData);
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
      title: 'Bus Name',
      dataIndex: 'name',
      key: 'bus',
    },
    {
      title: 'Bus Number',
      dataIndex: 'number',
      key: 'bus',
    },
    {
      title: 'Journey Date',
      dataIndex: 'journeyDate',
    },
    {
      title: 'Journey Time',
      dataIndex: 'departure',
    },
    {
      title: 'Seats',
      dataIndex: 'seats',
      render: (seats) => {
        return seats.join(',');
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          <div>
            <p
              className="text-md underline"
              onClick={() => {
                setSelectedBooking(record);
                setShowPrintModal(true);
              }}
            >
              Download Ticket
            </p>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getBookings();
  }, []);

  const componentRef = useRef();

  const handleDownload = () => {
    const element = componentRef.current;

    // Use html2pdf to convert the content to a downloadable PDF
    html2pdf()
      .from(element)
      .save('ticket.pdf'); // Save the PDF with a name
  };

  return (
    <div>
      <PageTitle title="Bookings" />
      <div className="mt-2">
        <Table dataSource={bookings} columns={columns} />
      </div>
      {showPrintModal && (
        <Modal
          title="Download Ticket"
          onCancel={() => {
            setShowPrintModal(false);
            setSelectedBooking(null);
          }}
          open={showPrintModal}
          okText="Download"
          onOk={handleDownload}
        >
          <div className="d-flex flex-column p-5" ref={componentRef}>
            <p
              className="text-lg"
              style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}
            >
              Bus: {selectedBooking.name}
            </p>
            <p
              className="text-md text-secondary"
              style={{ fontSize: '16px', marginBottom: '10px' }}
            >
              {selectedBooking.from} - {selectedBooking.to}
            </p>
            <hr />
            <p style={{ fontSize: '16px', marginBottom: '10px' }}>
              <span className="text-secondary" style={{ fontWeight: 'bold' }}>
                Journey Date:
              </span>{' '}
              {moment(selectedBooking.journeyDate).format('DD-MM-YYYY')}
            </p>
            <p style={{ fontSize: '16px', marginBottom: '10px' }}>
              <span className="text-secondary" style={{ fontWeight: 'bold' }}>
                Journey Time:
              </span>{' '}
              {selectedBooking.departure}
            </p>
            <p style={{ fontSize: '16px', marginBottom: '10px' }}>
              <span className="text-secondary" style={{ fontWeight: 'bold' }}>
                Seats Numbers:
              </span>
              <br />
              {selectedBooking.seats.join(', ')}
            </p>
            <hr />
            <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
              <span className="text-secondary">Total Amount:</span>{' '}
              {selectedBooking.fare * selectedBooking.seats.length} /-
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Bookings;
