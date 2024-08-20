import React from 'react';
import './ErrorNotification.css';
const ErrorNotification = ({ message }) => {
  return <div className='error-notification'>{message}</div>;
};

export default ErrorNotification;
