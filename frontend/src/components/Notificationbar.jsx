import React, { useEffect, useState } from 'react';
import { useNotifications } from '../components/NotificationContext';
import { db, auth } from '../config/Firebase.jsx';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function NotificationBar() {
  const { notifications, deleteNotification, deleteAllNotifications } = useNotifications();
  const [, setTicker] = useState(Date.now());
  const [recentChats, setRecentChats] = useState([]);

  const handleNotificationAction = (id, action) => {
    if (action === 'delete') {
      deleteNotification(id);
    }
  };

  const handleDeleteAllNotifications = () => {
    deleteAllNotifications();
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((Date.now() - date) / 1000);
    let interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    return Math.floor(interval) + " minutes ago";
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTicker(Date.now());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchRecentChats = () => {
      if (auth.currentUser) {
        const recentChatsRef = collection(db, 'recentChats');
        const q = query(recentChatsRef, where('userId', '==', auth.currentUser.uid));

        const unsubscribe = onSnapshot(q, (snapshot) => {
          if (!snapshot.empty) {
            const recentChats = snapshot.docs.map(doc => doc.data());
            const recentUsers = recentChats.flatMap(chat => chat.recentUsers);
            setRecentChats(recentUsers);
          } else {
            setRecentChats([]);
          }
        });

        return unsubscribe;
      }
    };

    const unsubscribe = fetchRecentChats();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <div className="hidden lg:block fixed inset-y-0 right-0 lg:w-64 w-full h-screen overflow-y-auto bg-white shadow-lg">
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="font-semibold text-lg mb-1">Notifications</div>
        {notifications.length > 0 && (
          <button onClick={handleDeleteAllNotifications} className="text-sm text-gray-600 hover:text-red-500">
            Delete all
          </button>
        )}
      </div>
      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-2 bg-purple-200 rounded-lg hover:bg-purple-300 transition-colors duration-150 ease-in-out"
            >
              <p className="text-sm mb-2">{notification.message}</p>
              <div className="flex justify-between items-center text-xs text-gray-600">
                <span>{timeAgo(notification.timestamp.toDate())}</span>
                <button
                  onClick={() => handleNotificationAction(notification.id, 'delete')}
                  className="text-gray-500 hover:text-red-500"
                >
                  <i className="far fa-trash-alt"></i>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500 mt-2">No notifications for now!</div>
        )}
      </div>
        <div className="font-semibold text-lg mb-4">Announcements</div>

<div className="flex items-center space-x-2 text-sm">
  <i className="fas fa-star text-yellow-500"></i>
  <div>
    <div>New feature released: Direct Messages</div>
    <div className="text-xs text-gray-500">2 hours ago</div>
  </div>
</div>

<div className="flex items-center space-x-2 text-sm">
  <i className="fas fa-exclamation-circle text-red-500"></i>
  <div>
    <div>Scheduled maintenance on June 10th.</div>
    <div className="text-xs text-gray-500">1 day ago</div>
  </div>
</div>

<div className="flex items-center space-x-2 text-sm">
  <i className="fas fa-trophy text-green-500"></i>
  <div>
    <div>Mergemat has pushed 6 updates in the last week</div>
    <div className="text-xs text-gray-500">3 days ago</div>
  </div>
</div>

<div className="flex items-center space-x-2 text-sm">
  <i className="fas fa-star text-yellow-500"></i>
  <div>
    <div>New feature: Notification are created automatically now</div>
    <div className="text-xs text-gray-500">5 days ago</div>
  </div>
</div>

<div className="flex items-center space-x-2 text-sm">
  <i className="fas fa-gift text-purple-500"></i>
  <div>
    <div>MergeMat has launched</div>
    <div className="text-xs text-gray-500">12 weeks ago</div>
  </div>
</div>

        <div className="font-semibold text-lg mb-4">Recent Chats</div>
        {recentChats.length > 0 ? (
          recentChats.map((chat) => (
            <div key={chat.username} className="flex items-center space-x-2 text-sm">
              <img
                alt={`${chat.firstname} profile image placeholder`}
                className="h-8 w-8 rounded-full"
                src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              />
              <span>{chat.firstname} ({chat.username})</span>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">No chats</div>
        )}
      </div>
    </div>
  );
}