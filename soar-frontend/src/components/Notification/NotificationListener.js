import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { notification } from 'antd';
import { API_BASE_URL } from 'api/api';

const NotificationListener = () => {
  useEffect(() => {
    console.log('NotificationListener mounted');

    const socket = io(API_BASE_URL, {
      transports: ['websocket'], // force WebSocket transport
    });

    socket.on('connect', () => {
      console.log('WebSocket connected:', socket.id);
    });

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    socket.on('incident_added', (data) => {
      console.log('Notification received:', data);
      notification.info({
        message: 'New Incident Added',
        description: data.message,
        placement: 'topRight',
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
};

export default NotificationListener;
