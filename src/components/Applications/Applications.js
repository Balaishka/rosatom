import "./Applications.css";
import arrow from "../../images/arrow-down.svg";
import { useState } from "react";
import { applications } from "../../configs/constants";
import ApplicationsConstructor from "../ApplicationsConstructor/ApplicationsConstructor";

export default function Applications({ applicationsPoints, allApplications, setIsPopupNewApplication }) {

    const [isOpen, setIsOpen] = useState(true);
    const [selectedApplications, setSelectedApplications] = useState(Number(localStorage.getItem("selectedApplications")) ? Number(localStorage.getItem("selectedApplications")):0);

    function toggleMenu() {
        setIsOpen(!isOpen);
    }

    function openPopup() {
        setIsPopupNewApplication(true);
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
                                    <ApplicationsConstructor applications={allApplications.agreed} text="Согласованных заявок пока нет" status="agreed" />
                                }

                                {selectedApplications === 1 && 
                                    <ApplicationsConstructor applications={allApplications.pending} text="Заявок в обработке пока нет. Вы можете создать новую, нажав кнопку ниже." status="pending" />
                                }

                                {selectedApplications === 2 && 
                                    <ApplicationsConstructor applications={allApplications.archive} text="Здесь пока ничего нет" status="archive" />
                                }
                            </ul>
                        </div>
                    </div>

                    <div className="applications__footer">
                        <button className="applications__btn content__btn" type="button" onClick={openPopup}>Новая заявка</button>
                    </div>
                </div>
            }
        </div>
    );
}