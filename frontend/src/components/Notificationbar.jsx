
import React, { useEffect, useState } from 'react';
import { useNotifications } from '../components/NotificationContext';

export default function NotificationBar() {
  const { notifications, deleteNotification, deleteAllNotifications } = useNotifications();
  const [, setTicker] = useState(Date.now());

  const handleNotificationAction = (id, action) => {
    if (action === 'delete') {
      deleteNotification(id);
    }
  };

  const handleDeleteAllNotifications = () => {
    deleteAllNotifications();
  }

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
        }, 60000); // Refresh "time ago" every minute
        return () => clearInterval(timer);
    }, []);

    return (
      <div className="hidden lg:block fixed inset-y-0 right-0 lg:w-64 w-full h-screen overflow-y-auto bg-white shadow-lg">
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div className="font-semibold text-lg mb-4">Notifications</div>
                    {notifications.length > 0 && (
                        <button onClick={handleDeleteAllNotifications} className="text-sm text-gray-600 hover:text-red-500">
                        Delete all
                      </button>
                    )}
                </div>
                <div className="space-y-4">
  {notifications.map((notification) => (
    <div key={notification.id} className="p-2 bg-purple-200 rounded-lg hover:bg-purple-300 transition-colors duration-150 ease-in-out"
    >
      <p className="text-sm mb-2">{notification.message}</p>
      <div className="flex justify-between items-center text-xs text-gray-600">
        <span>{timeAgo(notification.timestamp.toDate())}</span> {/* Adjusted for Firestore timestamp */}
        <button onClick={() => handleNotificationAction(notification.id, 'delete')} className="text-gray-500 hover:text-red-500">
          <i className="far fa-trash-alt"></i>
        </button>
      </div>
    </div>
  ))}
          </div>
          <div class="font-semibold text-lg mb-4">Activities</div>
          <div class="flex items-center space-x-2 text-sm">
            <i class="fas fa-paint-brush text-red-500"></i>
            <div>
              <div>Changed the style.</div>
              <div class="text-xs text-gray-500">Just now</div>
            </div>
          </div>
          <div class="flex items-center space-x-2 text-sm">
            <i class="fas fa-upload text-blue-500"></i>
            <div>
              <div>Released a new version.</div>
              <div class="text-xs text-gray-500">59 minutes ago</div>
            </div>
          </div>
          <div class="flex items-center space-x-2 text-sm">
            <i class="fas fa-bug text-orange-500"></i>
            <div>
              <div>Submitted a bug.</div>
              <div class="text-xs text-gray-500">12 hours ago</div>
            </div>
          </div>
          <div class="flex items-center space-x-2 text-sm">
            <i class="fas fa-edit text-purple-500"></i>
            <div>
              <div>Modified a data in Page X.</div>
              <div class="text-xs text-gray-500">Today, 11:59 AM</div>
            </div>
          </div>
          <div class="flex items-center space-x-2 text-sm">
            <i class="fas fa-trash-alt text-red-500"></i>
            <div>
              <div>Deleted a page in Project X.</div>
              <div class="text-xs text-gray-500">Feb 2, 2023</div>
            </div>
          </div>

          <div class="font-semibold text-lg mb-4">Recent Chats</div>
          <div class="flex items-center space-x-2 text-sm">
            <img
              alt="Natali Craig profile image placeholder"
              class="h-8 w-8 rounded-full"
              src="https://placehold.co/32x32"
            />
            <span>Natali Craig</span>
          </div>
          <div class="flex items-center space-x-2 text-sm">
            <img
              alt="Drew Cano profile image placeholder"
              class="h-8 w-8 rounded-full"
              src="https://placehold.co/32x32"
            />
            <span>Drew Cano</span>
          </div>
          <div class="flex items-center space-x-2 text-sm">
            <img
              alt="Andi Lane profile image placeholder"
              class="h-8 w-8 rounded-full"
              src="https://placehold.co/32x32"
            />
            <span>Andi Lane</span>
          </div>
          <div class="flex items-center space-x-2 text-sm">
            <img
              alt="Koray Okumus profile image placeholder"
              class="h-8 w-8 rounded-full"
              src="https://placehold.co/32x32"
            />
            <span>Koray Okumus</span>
          </div>
          <div class="flex items-center space-x-2 text-sm">
            <img
              alt="Kate Morrison profile image placeholder"
              class="h-8 w-8 rounded-full"
              src="https://placehold.co/32x32"
            />
            <span>Kate Morrison</span>
          </div>
          <div class="flex items-center space-x-2 text-sm">
            <img
              alt="Melody Macy profile image placeholder"
              class="h-8 w-8 rounded-full"
              src="https://placehold.co/32x32"
            />
            <span>Melody Macy</span>
          </div>
        </div>
            </div>
    );
}
