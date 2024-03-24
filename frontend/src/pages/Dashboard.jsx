import React from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Notifications from '../components/Notificationbar.jsx';
import './styles/dashboard.css';
import { useAuth } from '../appcontext/Authcontext';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Reminders from '../components/Reminders.jsx';
import { db, auth } from '../config/Firebase.jsx';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');
  const nav = useNavigate();
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const groupsRef = collection(db, 'groups');
        const createdByQuery = query(groupsRef, where('groupCreatedBy', '==', auth.currentUser.uid));
        const memberOfQuery = query(groupsRef, where('groupMembers', 'array-contains', currentUser.username));

        const [createdBySnapshot, memberOfSnapshot] = await Promise.all([
          getDocs(createdByQuery),
          getDocs(memberOfQuery)
        ]);

        const groups = new Map();
        createdBySnapshot.forEach((doc) => {
          groups.set(doc.id, doc.data());
        });
        memberOfSnapshot.forEach((doc) => {
          groups.set(doc.id, doc.data());
        });

        setUserGroups(Array.from(groups.values()));
      } catch (error) {
        console.error('Failed to fetch user groups', error);
      }
    };

    fetchUserGroups();
  }, [currentUser.uid, currentUser.username]);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />
      <body className="h-full bg-gray-100">
        <div className="flex flex-col lg:flex-row h-screen">
          <Sidebar />
          <div className="flex-1 p-6 lg:pl-sidebar lg:pr-notificationbar">
            <div className="flex justify-between items-center mb-6">
              <div className="flex space-x-2 items-center">
                <i className="fas fa-bars text-gray-600"></i>
                <span className="font-semibold text-lg">Dashboard</span>
              </div>
              <div className="flex space-x-4 items-center">
                <i className="fas fa-search text-gray-600"></i>
                <i className="fas fa-bell text-gray-600"></i>
                <i className="fas fa-user-circle text-gray-600"></i>
                <i className="fas fa-th text-gray-600"></i>
                <i className="fas fa-envelope text-gray-600"></i>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">Welcome, {currentUser.firstname}</h2>
              <p className="text-gray-600">Welcome to your dashboard! Here is a brief overview of your groups and reminders below.</p>
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">My Groups</h2>
              {userGroups.length === 0 ? (
                <p className="text-gray-500">No groups found!</p>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userGroups.map((group) => (
                      <Link key={group.groupId} to={`/group/${group.groupId}`}>
                        <div className="bg-white p-4 rounded shadow flex items-center hover:bg-gray-100 transition duration-200">
                          <div className="w-12 h-12 mr-4">
                            <img
                              src={group.groupCover || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWX0Ols40IR00lhBS_IoJoryTw6xHIvWQ2Fh8DlH69p-JtCshZAkwCGwEZiPrLnbGXQIg&usqp=CAU"}
                              alt={`Group of people illustration for ${group.groupName}`}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold">{group.groupName}</h4>
                            <p className="text-sm text-gray-500">View {group.groupName}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link to="/groups" className="text-blue-500 text-sm mt-2">View More Groups</Link>
                </>
              )}
            </div>
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Reminders</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Reminders />
              </div>
            </div>
          </div>
          <Notifications />
        </div>
      </body>
    </div>
  );
}