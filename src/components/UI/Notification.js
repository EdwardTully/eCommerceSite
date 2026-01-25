import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotification } from '../../store/slices/uiSlice';
import './Notification.css';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  if (!notification) return null;

  return (
    <div className={`notification notification-${notification.type}`}>
      <span>{notification.message}</span>
      <button 
        className="notification-close"
        onClick={() => dispatch(clearNotification())}
      >
        ✕
      </button>
    </div>
  );
};

export default Notification;
