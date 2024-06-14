import { useEffect } from "react";
import { shipRoute } from "../../configs/shipRoute";
import "./TimeController.css";
import Time from "../Time/Time";

export default function TimeController({ addZero }) {
    useEffect(() => {
        console.log(shipRoute);
    }, []);

    return (
        <div className="time">
            <ul className="time__list">
                {shipRoute[0].routes.map((route, index) => {
                    const timestamp = new Date(route.time);
                    const date = `${addZero(timestamp.getDate())}.${addZero(timestamp.getMonth() + 1)}`;
                    const time = `${addZero(timestamp.getHours())}:00`;

                    return <Time key={index} date={date} time={time} isActive={true} />;
                })}

                {shipRoute[1].routes.map((route, index) => {
                    const timestamp = new Date(route.time);
                    const date = `${addZero(timestamp.getDate())}.${addZero(timestamp.getMonth() + 1)}`;
                    const time = `${addZero(timestamp.getHours())}:00`;

                    return <Time key={index} date={date} time={time} isActive={false} />;
                })}
            </ul>
        </div>
    );
}