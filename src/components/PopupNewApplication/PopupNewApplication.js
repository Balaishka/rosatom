import { useEffect, useState } from "react";
import CustomSelect from "../CustomSelect/CustomSelect";
import Popup from "../Popup/Popup";
import { errors } from "../../configs/errors";
import { ships } from "../../configs/ships";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function PopupNewApplication({ isOpen, onClose, changeOption, navPoints }) {

    const [selectedShip, setSelectedShip] = useState(undefined);
    const [selectedStartPoint, setSelectedStartPoint] = useState(undefined);
    const [selectedFinishPoint, setSelectedFinishPoint] = useState(undefined);
    const [selectedDate, setSelectedDate] = useState("");
    const [isCalendar, setIsCalendar] = useState(false);

    const [values, setValues] = useState({
        ship: {},
        date: "",
        startPoint: "",
        finishPoint: ""
    });

    useEffect(() => {
        if (selectedDate) {
            toggleCalendar();
            const newDate = `${addZero(selectedDate.getDate())}.${addZero(selectedDate.getMonth() + 1)}.${selectedDate.getFullYear()}`;
            setValues({
                ship: values.ship,
                date: newDate,
                startPoint: values.startPoint,
                finishPoint: values.finishPoint
            });
        }
        
    }, [selectedDate]);

    function handleChange(e) {
        console.log(e.target);
    }

    function toggleCalendar() {
        setIsCalendar(!isCalendar);
    }

    function addZero(number) {
        if (String(number).length === 1) {
            return `0${number}`;
        } else {
            return String(number);
        }
    }

    return (
        <Popup
            title="Заявка на проводку"
            isOpen={isOpen}
            onClose={onClose}
        >
            <form className="form form-application">
                <div className="form__field">
                    <CustomSelect
                        myClass="form-application__select"
                        options={ships}
                        selectedOption={selectedShip}
                        changeOption={changeOption}
                        name="selectedShip"
                        setSelected={setSelectedShip}
                        clue="Судно"
                    />
                </div>

                <div className="form__field">
                    <label className={`form__label ${values.date === "" ? "":"form__label_active"}`}>Дата отплытия</label>
                    <input
                    name="login"
                    className={`form__input ${values.date === "" ? "":"form__input_active"}`}
                    type="text"
                    onChange={handleChange}
                    value={values.date}
                    required
                    />
                    <svg onClick={toggleCalendar} className="form__calendar-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 8C4.44772 8 4 8.44771 4 9V10C4 10.5523 4.44772 11 5 11H7C7.55228 11 8 10.5523 8 10V9C8 8.44772 7.55228 8 7 8H5Z" fill="#80858E"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M5 0C5.55228 0 6 0.447715 6 1H10C10 0.447715 10.4477 0 11 0C11.5523 0 12 0.447715 12 1H13C14.6569 1 16 2.34315 16 4V13C16 14.6569 14.6569 16 13 16H3C1.34315 16 0 14.6569 0 13V4C0 2.34315 1.34315 1 3 1H4C4 0.447715 4.44772 0 5 0ZM3 3C2.44772 3 2 3.44772 2 4V5H12C12.5523 5 13 5.44772 13 6C13 6.55228 12.5523 7 12 7H2V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V4C14 3.44772 13.5523 3 13 3H3Z" fill="#80858E"/>
                    </svg>
                    {isCalendar && <Calendar className="form__calendar" onChange={setSelectedDate} value={selectedDate} />}
                </div>

                <div className="form__double-field">
                    <CustomSelect
                        myClass="form-application__select"
                        options={navPoints}
                        selectedOption={selectedStartPoint}
                        changeOption={changeOption}
                        name="selectedStartPoint"
                        setSelected={setSelectedStartPoint}
                        clue="Пункт отплытия"
                    />
                    <CustomSelect
                        myClass="form-application__select"
                        options={navPoints}
                        selectedOption={selectedFinishPoint}
                        changeOption={changeOption}
                        name="selectedFinishPoint"
                        setSelected={setSelectedFinishPoint}
                        clue="Пункт прибытия"
                    />
                </div>
            </form>
        </Popup>
    );
}