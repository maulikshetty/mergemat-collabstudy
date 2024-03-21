
import React, { useState, useEffect } from 'react';
import { db } from '../config/Firebase'; // Ensure this path matches your actual file structure
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNotifications } from '../components/NotificationContext'; // Ensure this path matches your actual file structure

export default function Reminders() {
    const [showModal, setShowModal] = useState(false);
    const [reminders, setReminders] = useState([]);
    const [newReminderTitle, setNewReminderTitle] = useState('');
    const [newReminderDescription, setNewReminderDescription] = useState('');
    const [newReminderDate, setNewReminderDate] = useState('');
    const [newReminderTime, setNewReminderTime] = useState('');
    const [newReminderPriority, setNewReminderPriority] = useState('blue'); // Default priority color

    const { addNotification } = useNotifications();

    useEffect(() => {
        const fetchReminders = async () => {
            const querySnapshot = await getDocs(collection(db, "reminders"));
            const remindersList = querySnapshot.docs.map(doc => ({
                id: doc.id, ...doc.data()
            }));
            setReminders(remindersList);
        };

        fetchReminders();
    }, []);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAddReminder = async (e) => {
        e.preventDefault();

        const newReminder = {
            title: newReminderTitle,
            description: newReminderDescription,
            date: newReminderDate,
            time: newReminderTime,
            priority: newReminderPriority,
        };

        try {
            // Add the new reminder to Firestore
            const docRef = await addDoc(collection(db, "reminders"), newReminder);
            
            // Create a new reminder object including the Firestore generated id
            const addedReminder = { ...newReminder, id: docRef.id };
            
            // Update the local state to include the new reminder
            setReminders(prevReminders => [...prevReminders, addedReminder]);

            // Clear the input fields and close the modal after successful addition
            setNewReminderTitle('');
            setNewReminderDescription('');
            setNewReminderDate('');
            setNewReminderTime('');
            setNewReminderPriority('blue');
            setShowModal(false);

            // Add a notification for the new reminder
            addNotification('New reminder added: ' + newReminderTitle);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handleDeleteReminder = async (id) => {
        try {
            await deleteDoc(doc(db, "reminders", id));
            setReminders(reminders.filter(reminder => reminder.id !== id));
            addNotification('Reminder deleted');
        } catch (error) {
            console.error("Error deleting reminder:", error);
        }
    };

    // Your component JSX remains the same...



    return (
        <div>
            <div className="mt-6">
                <div className="bg-purple-200 p-4 rounded shadow flex items-center justify-between" onClick={handleOpenModal} style={{ cursor: 'pointer' }}>
                    <div >
                        <h4 className="font-semibold">Add Reminder</h4>
                        <p className="text-sm text-gray-500">Don't forget your tasks</p>
                    </div>
                    <i className="fas fa-chevron-circle-right text-purple-500"></i>
                </div>
            </div>

            {showModal && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-1/2">
                        <h2 className="text-xl font-semibold mb-4">Add a Reminder</h2>
                        <form onSubmit={handleAddReminder}>
                            {/* Title */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Reminder title" value={newReminderTitle} onChange={(e) => setNewReminderTitle(e.target.value)} />
                            </div>
                            {/* Description */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
                                <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Reminder description" value={newReminderDescription} onChange={(e) => setNewReminderDescription(e.target.value)}></textarea>
                            </div>
                            {/* Date */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Date</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="date" type="date" value={newReminderDate} onChange={(e) => setNewReminderDate(e.target.value)} />
                            </div>
                            {/* Time (Optional) */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">Time (Optional)</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="time" type="time" value={newReminderTime} onChange={(e) => setNewReminderTime(e.target.value)} />
                            </div>
                            {/* Priority */}
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Priority</label>
                                <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={newReminderPriority} onChange={(e) => setNewReminderPriority(e.target.value)}>
                                    <option value="blue">Low</option>
                                    <option value="yellow">Medium</option>
                                    <option value="red">High</option>
                                </select>
                            </div>
                            <div className="flex items-center justify-between">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Add Reminder</button>
                                <button className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded" onClick={handleCloseModal}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="mt-6">
                {reminders.map((reminder) => (
                    <div key={reminder.id} className={`bg-white p-4 rounded shadow mb-4 flex justify-between items-center border-l-4 ${reminder.priority === 'blue' ? 'border-blue-500' : reminder.priority === 'yellow' ? 'border-yellow-500' : 'border-red-500'}`}>
                        <div>
                            <h4 className="font-semibold">{reminder.title}</h4>
                            <p className="text-sm text-gray-500">{reminder.description}</p>
                            <p className="text-sm text-gray-500">{reminder.date} {reminder.time}</p>
                    
                        </div>
                        <button className="text-red-500" onClick={() => handleDeleteReminder(reminder.id)}>Complete</button>
                    </div>
                ))}
            </div>
        </div>
    )
};

