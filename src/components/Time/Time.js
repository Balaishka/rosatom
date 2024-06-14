export default function Time({ isActive, date, time }) {
    return (
        <li className={`time__item ${isActive ? "time__item_active":""}`}>
            <span className="time__date">{date}</span>
            <span className="time__time">{time}</span>
        </li>
    );
}