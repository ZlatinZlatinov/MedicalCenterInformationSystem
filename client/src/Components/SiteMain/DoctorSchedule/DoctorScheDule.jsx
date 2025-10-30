import { useState } from "react";

const startTime = '09:00';
const endTime = '17:00';

function DoctorSchedule() {
    const [formData, setFormData] = useState({
        duration: '15 minutes',
        isFree: false,
        price: 0,
        step: 15,
        mondayStart: startTime,
        mondayEnd: endTime,
        tuesdayStart: startTime,
        tuesdayEnd: endTime,
        wednesdayStart: startTime,
        wednesdayEnd: endTime,
        thursdayStart: startTime,
        thursdayEnd: endTime,
        fridayStart: startTime,
        fridayEnd: endTime,
    });

    function handleOnChange(e) {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handleOnSubmit(e) {
        e.preventDefault();

        console.log(formData);
    }

    return (
        <section id="doc-schedule">
            <form id="doc-schedule-form" className="auth-form" onSubmit={handleOnSubmit}>
                <fieldset>
                    <legend>
                        <h3>Appointment Settings</h3>
                    </legend>

                    <div className="input-field">
                        <label htmlFor="duration">Appointment Duration</label>
                        <select name="duration" id="duration" value={formData.duration} onChange={handleOnChange}>
                            <option value="15 minutes">15 minutes</option>
                            <option value="30 minutes">30 minutes</option>
                            <option value="45 minutes">45 minutes</option>
                            <option value="1 hour">1 hour</option>
                        </select>
                    </div>

                    <div className="input-field">
                        <label htmlFor="isFree">Free Appointments</label>
                        <input type="checkbox" name="isFree" id="isFree" checked={formData.isFree} onChange={handleOnChange} />
                    </div>

                    <div className="input-field">
                        <label htmlFor="price">Appointment Price</label>
                        <input type="number" name="price" id="price" value={formData.price} onChange={handleOnChange} />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h3>Weely Schedule</h3>
                    </legend>
                    <div className="intput-container">
                        <h4>Monday</h4>
                        <div className="input-field">
                            <div>
                                <label htmlFor="mondayStart">Start Time</label>
                                <input type="time" name="mondayStart" id="mondayStart" min={startTime} value={formData.mondayStart} onChange={handleOnChange} />
                            </div>
                            <div>
                                <label htmlFor="mondayEnd">End Time</label>
                                <input type="time" name="mondayEnd" id="mondayEnd" value={formData.mondayEnd} onChange={handleOnChange} />
                            </div>
                        </div>
                    </div>

                    <div className="intput-container">
                        <h4>Tuesday</h4>
                        <div className="input-field">
                            <div>
                                <label htmlFor="tuesdayStart">Start Time</label>
                                <input type="time" name="tuesdayStart" id="tuesdayStart" value={formData.tuesdayStart} onChange={handleOnChange} />
                            </div>
                            <div>
                                <label htmlFor="tuesdayEnd">End Time</label>
                                <input type="time" name="tuesdayEnd" id="tuesdayEnd" value={formData.tuesdayEnd} onChange={handleOnChange} />
                            </div>
                        </div>
                    </div>

                    <div className="intput-container">
                        <h4>Wednesday</h4>
                        <div className="input-field">
                            <div>
                                <label htmlFor="wednesdayStart">Start Time</label>
                                <input type="time" name="wednesdayStart" id="wednesdayStart" value={formData.wednesdayStart} onChange={handleOnChange} />
                            </div>
                            <div>
                                <label htmlFor="wednesdayEnd">End Time</label>
                                <input type="time" name="wednesdayEnd" id="wednesdayEnd" value={formData.wednesdayEnd} onChange={handleOnChange} />
                            </div>
                        </div>
                    </div>

                    <div className="intput-container">
                        <h4>Thursday</h4>
                        <div className="input-field">
                            <div>
                                <label htmlFor="thursdayStart">Start Time</label>
                                <input type="time" name="thursdayStart" id="thursdayStart" value={formData.thursdayStart} onChange={handleOnChange} />
                            </div>
                            <div>
                                <label htmlFor="thursdayEnd">End Time</label>
                                <input type="time" name="thursdayEnd" id="thursdayEnd" value={formData.thursdayEnd} onChange={handleOnChange} />
                            </div>
                        </div>
                    </div>

                    <div className="intput-container">
                        <h4>Friday</h4>
                        <div className="input-field">
                            <div>
                                <label htmlFor="fridayStart">Start Time</label>
                                <input type="time" name="fridayStart" id="fridayStart" value={formData.fridayStart} onChange={handleOnChange} />
                            </div>
                            <div>
                                <label htmlFor="fridayEnd">End Time</label>
                                <input type="time" name="fridayEnd" id="fridayEnd" value={formData.fridayEnd} onChange={handleOnChange} />
                            </div>
                        </div>
                    </div>

                </fieldset>

                <div className="form-btn">
                    <input type="submit" className="auth-btn" value="Save" />
                </div>
            </form>
        </section>
    );
}

export default DoctorSchedule;