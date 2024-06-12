import { useEffect } from "react";
import "./ApplicationsProcess.css";
import Application from "../Application/Application";
import { applications, applicationsTest } from "../../configs/applications";

export default function ApplicationsProcess({ applicationsInProcess }) {
    if (applicationsInProcess.length) {
        return (
            <>
                {applications.map((item, index) => {
                    return <Application key={index} application={item} />;
                })}
            </>
        );
    } else {
        return <div className="applications__error">Заявок в обработке нет</div>
    }
    
}