import { useState, useEffect } from "react";
import { daysOfWeek, monthsOfYear } from "../../../Constants/calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { bookAppointment } from "../../../services/appointmentsService";
import { getDoctorSchedule } from "../../../services/doctorService";
import { useAuth } from "../../../Hooks/useAuth";

function CalendarApp({ doctorId, doctorName }) {
    /* CALENDAR */
    const currentDate = new Date();
    /*user state*/
    const { authUserData } = useAuth();

    /* calendar state */
    const [currentMonth, setCurrMonth] = useState(currentDate.getMonth());
    const [currentYear, setCurrYear] = useState(currentDate.getFullYear());
    const [selectedDate, setSelectedDate] = useState(currentDate);

    /*slots state */
    const [doctorSchedule, setDoctorSchedule] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    // const [loading, setLoading] = useState(false);

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 0).getDay();// not sure about this one, initially was 1

    const previousMonth = () => {
        setCurrMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
        setCurrYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear))
    }

    const nextMonth = () => {
        setCurrMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
        setCurrYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear))
    }

    const handleDayClick = async (day) => {
        const clickedDate = new Date(currentYear, currentMonth, day);
        const today = new Date();

        if (clickedDate >= today || isSameDay(clickedDate, today)) {
            setSelectedDate(clickedDate);
            try {
                const clickedDay = clickedDate.getDate() < 10 ? `0${clickedDate.getDate()}` : clickedDate.getDate();
                const clickedMonth = (clickedDate.getMonth() + 1) < 10 ? `0${clickedDate.getMonth() + 1}` : (clickedDate.getMonth() + 1);
                const clickedYear = clickedDate.getFullYear();

                const date = `${clickedYear}-${clickedMonth}-${clickedDay}`;
                const newSchedule = await getDoctorSchedule(doctorId, date);
                updateDoctorScheduleUI(newSchedule);
            } catch (error) {
                console.error(error);
                alert("Something went wrong!");
            }
        }
    }

    const isSameDay = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }

    /* TIME SLOTS */
    const generateTimeSlots = (schedule) => {
        if (!schedule || !schedule.isAvailable) {
            return [];
        }

        const slots = [];
        const start = parseTime(schedule.startTime);
        const end = parseTime(schedule.endTime);
        const duration = schedule.duration || 30;

        let current = start;
        while (current < end) {
            const slotTime = formatTime(current);
            const slotEnd = current + duration;

            if (slotEnd <= end) {
                slots.push({
                    time: slotTime,
                    startMinutes: current,
                    endMinutes: slotEnd,
                    price: schedule.price || 0
                });
            }
            current = slotEnd;
        }

        return slots;
    };

    // Parse time string (HH:MM:SS) to minutes
    const parseTime = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };

    // Format minutes to HH:MM
    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    };

    // Check if slot is booked
    const isSlotBooked = (slotTime) => {
        return bookedSlots.some(slot => slot.time === slotTime);
    };

    //Handle slot selection
    const handleSlotSelect = (slot) => {
        if (!isSlotBooked(slot.time)) {
            setSelectedSlot(slot);
        }
    };

    async function handleBookAppointment() {
        const payload = {
            doctorId,
            appointmentDate: selectedDate,
            appointmentTime: selectedSlot.time,
            doctorName,
            izNzok: false,
            isInitial: true,
        }

        try {
            console.log(payload);

            await bookAppointment(payload, authUserData.accessToken);
            alert("Appointment booked");
        } catch (error) {
            console.log("Oops something went wrong\n", error);
        }
    }

    //Update doctorSchedule
    function updateDoctorScheduleUI(docSchedule) {
        setDoctorSchedule(docSchedule.schedule);
        setBookedSlots(docSchedule.bookedSlots);
        const slots = generateTimeSlots(docSchedule.schedule);
        setTimeSlots(slots);
    }

    // Simulate selecting today
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        async function fetchNewSchedule() {
            try {
                const newSchedule = await getDoctorSchedule(doctorId, today);
                updateDoctorScheduleUI(newSchedule);
            } catch (error) {
                console.error(error);
            }
        }

        fetchNewSchedule();
    }, []);

    return (
        <div className="calendar-app">
            {/* Calendar */}
            <div className="calendar">
                {/* Heading */}
                <h2 className="heading">Calendar</h2>

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
                        .map((day) => {
                            const dayDate = new Date(currentYear, currentMonth, day + 1);
                            const isCurrentDay = isSameDay(dayDate, currentDate);
                            const isSelected = isSameDay(dayDate, selectedDate);

                            return (<span
                                key={day + 1}
                                className={`
                                    ${isCurrentDay ? 'current-day' : ''}
                                    ${isSelected ? 'selected' : ''}
                                `.trim()}
                                onClick={() => handleDayClick(day + 1)}
                            >{day + 1}</span>)
                        })}

                </div>
            </div>

            <div className="time-slots">
                {timeSlots.map((slot, index) => {
                    const booked = isSlotBooked(slot.time);
                    const selected = selectedSlot?.time === slot.time;

                    return <button
                        key={index}
                        className={`
                            time-slot-btn 
                            ${booked ? 'booked' :
                                selected ? 'selected' : ''
                            }
                        `}
                        onClick={() => handleSlotSelect(slot)}
                        disabled={booked}
                    >{slot.time}</button>
                })}
            </div>

            <div className="book-btn">
                <button
                    className="book-appointment-btn"
                    disabled={!authUserData.isLoggedIn}
                    onClick={handleBookAppointment}
                >Book Appointment</button>
            </div>
        </div>
    );
}

export default CalendarApp;