import { useState } from "react";
import { daysOfWeek, monthsOfYear } from "../../../Constants/calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";

function CalendarApp() {
    const currentDate = new Date();

    const [currentMonth, setCurrMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrYear] = useState(currentDate.getFullYear());
    const [selectedDate, setSelectedDate] = useState(currentDate);

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 0).getDay();// not sure about this one, initially was 1

    // console.log(currentMonth, currentYear, daysInMonth, firstDayOfMonth);
    const previousMonth = () => {
        setCurrMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
        setCurrYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear))
    }

    const nextMonth = () => {
        setCurrMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
        setCurrYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear))
    }

    const handleDayClick = (day) => {
        const clickedDate = new Date(currentYear, currentMonth, day);
        const today = new Date();

        if (clickedDate >= today || isSameDay(clickedDate, today)) {
            setSelectedDate(clickedDate);
            console.log(selectedDate);
        }
    }

    const isSameDay = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }

    function bookAppointment() {
        console.log("Send request to the server to book an appointment");
    }

    return (
        <div className="calendar-app">
            {/* Calendar */}
            <div className="calendar">
                {/* Heading */}
                <h1 className="heading">Calendar</h1>

                {/* Navigate-Date */}
                <div className="navigate-date">
                    <h2 className="month">{monthsOfYear[currentMonth]},</h2>
                    <h2 className="year">{currentYear}</h2>
                    <div className="buttons">
                        <ChevronLeft color="#ef9011" size={24} onClick={previousMonth} />
                        <ChevronRight color="#ef9011" size={24} onClick={nextMonth} />
                    </div>
                </div>

                {/* Weekdays */}
                <div className="weekdays">
                    {daysOfWeek.map((weekDay) => <span key={weekDay.id}>{weekDay.name.slice(0, 3)}</span>)}
                </div>

                {/* Days */}
                <div className="days">
                    {[...Array(firstDayOfMonth).keys()]
                        .map((_, index) => <span key={`empty-${index}`} />)}
                    {[...Array(daysInMonth).keys()]
                        .map((day) => (<span
                            key={day + 1}
                            className={day + 1 === currentDate.getDate() &&
                                currentMonth === currentDate.getMonth() &&
                                currentYear === currentDate.getFullYear() ? 'current-day' : ''}
                            onClick={() => handleDayClick(day + 1)}
                        >{day + 1}</span>))}

                </div>
            </div>

            <div className="time-slots">
                <button className="time-slot-btn" onClick={() => bookAppointment()}>10:00</button>
                <button className="time-slot-btn" onClick={() => bookAppointment()}>10:15</button>
                <button className="time-slot-btn" onClick={() => bookAppointment()}>10:30</button>
                <button className="time-slot-btn" onClick={() => bookAppointment()}>10:45</button>
                <button className="time-slot-btn" onClick={() => bookAppointment()}>11:00</button>
                <button className="time-slot-btn" onClick={() => bookAppointment()}>11:15</button>
                <button className="time-slot-btn" onClick={() => bookAppointment()}>11:30</button>
                <button className="time-slot-btn" onClick={() => bookAppointment()}>11:45</button>
            </div>
        </div>
    );
}

export default CalendarApp;