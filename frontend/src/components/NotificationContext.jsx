import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/Firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc, getDocs, writeBatch } from 'firebase/firestore';
import { useAuth } from '../appcontext/Authcontext';
const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Setting up a real-time listener
    const unsubscribe = onSnapshot(collection(db, "notifications"), (snapshot) => {
      const notificationsData = [];
      snapshot.forEach(doc => {
        notificationsData.push({ id: doc.id, ...doc.data() });
      });
      // Sort notifications by timestamp in descending order so newer notifications are on top
      notificationsData.sort((a, b) => b.timestamp.toDate() - a.timestamp.toDate());
      setNotifications(notificationsData);
    });
  
    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  const addNotification = async (message) => {
    await addDoc(collection(db, "notifications"), {
      message,
      timestamp: new Date(),
    });
  };

  const deleteNotification = async (id) => {
    await deleteDoc(doc(db, "notifications", id));
  };

  // Implementing a method to delete all notifications
  const deleteAllNotifications = async () => {
    const querySnapshot = await getDocs(collection(db, "notifications"));
    const batch = writeBatch(db);
  
    querySnapshot.forEach((document) => {
      batch.delete(document.ref);
    });
  
    await batch.commit();
  };

  const value = {
    notifications,
    addNotification,
    deleteNotification,
    deleteAllNotifications, // Make sure to expose this function through context
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

