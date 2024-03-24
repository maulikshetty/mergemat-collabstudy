
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import NotificationBar from '../components/Notificationbar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';






function Calendar() {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newEventTitle, setNewEventTitle] = useState('');


    
    // Determine today's date
    const today = new Date();
    const todayDateString = today.toDateString();

    const handlePrevMonth = () => {
        setMonth(month === 1 ? 12 : month - 1);
        setYear(month === 1 ? year - 1 : year);
    };

    const handleNextMonth = () => {
        setMonth(month === 12 ? 1 : month + 1);
        setYear(month === 12 ? year + 1 : year);
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month, 0).getDate();
    };

    const handleAddEvent = () => {
        if (selectedDate) {
            setShowModal(true);
        }
    };

    const handleSubmitEvent = () => {
        if (newEventTitle.trim() !== '') {
            const newEvent = {
                title: newEventTitle,
                date: selectedDate,
            };
            setEvents([...events, newEvent]);
            setShowModal(false);
            setNewEventTitle('');
        }
    };

    const renderCalendarDays = () => {
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = new Date(year, month - 1, 1).getDay();
        const calendarDays = [];
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        for (let i = 0; i < 7; i++) {
            calendarDays.push(
                <div key={`day-name-${i}`} className="text-center font-semibold text-gray-600">
                    {dayNames[i]}
                </div>
            );
        }
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarDays.push(<div key={`empty-${i}`} className="text-gray-300"></div>);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month - 1, day);
            const dateStr = date.toDateString();
            const isSelected = selectedDate && selectedDate.toDateString() === dateStr;
            const isToday = dateStr === todayDateString;
            const dayEvents = events.filter((event) => event.date.toDateString() === dateStr);

            const dayStyle = isToday ? { backgroundColor: '#B3E5FC' } : {};

            calendarDays.push(
                <div
                    key={`day-${day}`}
                    className={`text-center text-gray-700 hover:bg-indigo-100 cursor-pointer transition-colors duration-200 p-2 rounded-full ${isSelected ? 'bg-indigo-500 text-white' : ''
                        }`}
                    style={dayStyle}
                    onClick={() => setSelectedDate(date)}
                >
                    <div>{day}</div>
                    {dayEvents.length > 0 && (
                        <div className="text-xs text-gray-500">
                            {dayEvents.map((event, index) => (
                                <div key={index}>{event.title}</div>
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        return calendarDays;
    };

    return (
        <div>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
            />
            <div className="flex flex-col lg:flex-row h-screen">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-shrink-0 flex items-center justify-between p-6 border-b bg-white">
                    </div>
                    <div className="flex-grow flex overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-8 transparent">
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-xl font-semibold text-gray-800">Calendar</div>
                                <div className="flex flex-1 justify-center items-center">
                                <button
                                className="text-gray-600 hover:text-blue-300 transition-colors duration-200"
                                onClick={handleNextMonth}
                            >
                                <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                        <button
                            className="bg-blue-200 hover:bg-blue-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleAddEvent}
                            disabled={!selectedDate}
                        >
                            Add Event
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-4 text-center bg-white p-6 rounded-lg shadow-md">
                        {renderCalendarDays()}
                    </div>
                </div>
                <div className="w-full lg:w-60 bg-white p-6 shadow-lg overflow-y-auto">
                    <NotificationBar />
                    <div className="p-6">
                        <h2 className="text-lg font-semibold mb-4">Events</h2>
                        {events.length === 0 ? (
                            <p>No events scheduled.</p>
                        ) : (
                            <ul>
                                {events.map((event, index) => (
                                    <li key={index} className="my-2">
                                        <div className="text-gray-800 bg-indigo-200 p-2 rounded"> {/* Adjusted for better visibility */}
                                            {event.title} ({event.date.toDateString()})
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>

    
            {/* Modal for adding events */}
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                            <div>
                                <div className="mx -auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                                    <i className="fas fa-calendar-plus text-blue-600"></i>
                                </div>
                                <div className="mt-3 text-center sm:mt-5">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                                        Add Event
                                    </h3>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Event title"
                                            value={newEventTitle}
                                            onChange={(e) => setNewEventTitle(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
                                    onClick={handleSubmitEvent}
                                >
                                    Add Event
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 
export default Calendar;
