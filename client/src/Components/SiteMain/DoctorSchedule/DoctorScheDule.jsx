function DoctorSchedule() {
    return (
        <section id="doc-schedule">
            <form id="doc-schedule-form" className="auth-form">
                <fieldset>
                    <legend>
                        <h3>Appointment Settings</h3>
                    </legend>

                    <div className="input-field">
                        <label htmlFor="duration">Appointment Duration</label>
                        <select name="duration" id="duration">
                            <option value="15 minutes">15 minutes</option>
                            <option value="30 minutes">30 minutes</option>
                            <option value="45 minutes">45 minutes</option>
                            <option value="1 hour">1 hour</option>
                        </select>
                    </div>

                    <div className="input-field">
                        <label htmlFor="isFree">Free Appointments</label>
                        <input type="checkbox" name="isFree" id="isFree" />
                    </div>

                    <div className="input-field">
                        <label htmlFor="price">Appointment Price</label>
                        <input type="number" name="price" id="price" />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h3>Weely Schedule</h3>
                    </legend>

                    <div className="input-field">
                        <p>Monday</p>
                        <label htmlFor="monday">Start Time</label>
                        <input type="time" name="start" id="start" />
                        <label htmlFor="monday">End Time</label>
                        <input type="time" name="end" id="end" />
                    </div>

                    <div className="input-field">
                        <p>Tuesday</p>
                        <label htmlFor="monday">Start Time</label>
                        <input type="time" name="start" id="start" />
                        <label htmlFor="monday">End Time</label>
                        <input type="time" name="end" id="end" />
                    </div>

                    <div className="input-field">
                        <p>Wednesday</p>
                        <label htmlFor="monday">Start Time</label>
                        <input type="time" name="start" id="start" />
                        <label htmlFor="monday">End Time</label>
                        <input type="time" name="end" id="end" />
                    </div>

                    <div className="input-field">
                        <p>Thursday</p>
                        <label htmlFor="monday">Start Time</label>
                        <input type="time" name="start" id="start" />
                        <label htmlFor="monday">End Time</label>
                        <input type="time" name="end" id="end" />
                    </div>

                    <div className="input-field">
                        <p>Friday</p>
                        <label htmlFor="monday">Start Time</label>
                        <input type="time" name="start" id="start" value={'09:00'}/>
                        <label htmlFor="monday">End Time</label>
                        <input type="time" name="end" id="end" />
                    </div>
                </fieldset> 

                <div className="form-btn">
                    <input type="submit" value="Save" />
                </div>
            </form>
        </section>
    );
}

export default DoctorSchedule;