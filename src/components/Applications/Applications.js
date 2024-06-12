import "./Applications.css";
import arrow from "../../images/arrow-down.svg";
import { useEffect, useState } from "react";
import Application from "../Application/Application";
import { applications } from "../../configs/constants";
import ApplicationsProcess from "../ApplicationsProcess/ApplicationsProcess";

export default function Applications({ getShips, getRouteRequests, applicationsPoints, applicationsInProcess }) {

    const [isOpen, setIsOpen] = useState(true);
    const [selectedApplications, setSelectedApplications] = useState(Number(localStorage.getItem("selectedApplications")) ? Number(localStorage.getItem("selectedApplications")):0);

    useEffect(() => {
        const routeRequests = localStorage.getItem("applicationsInProcess");
        if (!routeRequests) {
            getRouteRequests();
        }
    }, []);

    function toggleMenu() {
        setIsOpen(!isOpen);
    }

    return (
        <div className={`applications ${isOpen ? "":"applications_closed"}`}>
            <div className="applications__header" onClick={toggleMenu}>
                <h2 className="applications__title">Мои заявки</h2>
                <img className={`applications__arrow ${isOpen ? "":"applications__arrow_closed"}`} alt="" src={arrow} />
            </div>

            {isOpen && 
                <div className="applications__content">
                    <div className="applications__body">
                        <nav className="applications__nav">
                            <ul className="applications__nav-list">
                                {applications.map((item, index) => {
                                    function onClick() {
                                        localStorage.setItem("selectedApplications", index);
                                        setSelectedApplications(index);
                                    }
                                    return (
                                        <li key={index} className={`applications__nav-item ${selectedApplications === index ? "applications__nav-item_active":""}`} onClick={onClick}>
                                            <span className="applications__nav-text">{item}</span>
                                            <span className="applications__nav-number">{applicationsPoints[index]}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                        <div className="applications__block">
                            <ul className="applications__list">
                                {selectedApplications === 0 && 
                                    <Application />
                                }

                                {selectedApplications === 1 && 
                                    <ApplicationsProcess applicationsInProcess={applicationsInProcess} />
                                }
                            </ul>
                        </div>
                        
                    </div>

                    <div className="applications__footer">
                        <button className="applications__btn" type="button">Новая заявка</button>
                    </div>
                </div>
            }
        </div>
    );
}