import "./AdminApplications.css";
import { useState } from "react";
import { adminApplications } from "../../configs/constants";
import ApplicationsConstructor from "../ApplicationsConstructor/ApplicationsConstructor";
import IceRoutes from "../IceRoutes/IceRoutes";

export default function AdminApplications({
  applicationsPoints,
  allApplications,
  setIsPopupNewApplication,
  setInfoShip
}) {
  const [selectedApplications, setSelectedApplications] = useState(
    Number(localStorage.getItem("selectedApplications"))
      ? Number(localStorage.getItem("selectedApplications"))
      : 0
  );
  const [selectedMenu, setSelectedMenu] = useState(localStorage.getItem("selectedMenu") ? localStorage.getItem("selectedMenu"):"applications");

  function openPopup() {
    setIsPopupNewApplication(true);
  }

  function choiceApplications() {
    setSelectedMenu("applications");
    localStorage.setItem("selectedMenu", "applications")
  }

  function choiceIceRoutes() {
    setSelectedMenu("routes");
    localStorage.setItem("selectedMenu", "routes")
  }

  return (
    <div className="admin-applications">
      <div className="admin-applications__content">
        <div className="admin-applications__header">
            <ul className="admin-applications__header-list">
                <li className={`admin-applications__header-item ${selectedMenu === "applications" ? "admin-applications__header-item_active":""}`} onClick={choiceApplications}>Заявки</li>
                <li className={`admin-applications__header-item ${selectedMenu === "routes" ? "admin-applications__header-item_active":""}`} onClick={choiceIceRoutes}>Маршруты ледоколов</li>
            </ul>
        </div>
        <div className={`admin-applications__body ${selectedMenu === "routes" ? "admin-applications__body_name_routes":""}`}>
            {selectedMenu === "applications" && 
                <>
                    <nav className="admin-applications__nav">
                        <ul className="admin-applications__nav-list">
                        {adminApplications.map((item, index) => {
                            function onClick() {
                            localStorage.setItem("selectedApplications", index);
                            setSelectedApplications(index);
                            }
                            return (
                            <li
                                key={index}
                                className={`admin-applications__nav-item ${
                                selectedApplications === index
                                    ? "admin-applications__nav-item_active"
                                    : ""
                                }`}
                                onClick={onClick}
                            >
                                <span className="admin-applications__nav-text">{item.name}</span>
                                <span className="admin-applications__nav-number">
                                {applicationsPoints[item.type]}
                                </span>
                            </li>
                            );
                        })}
                        </ul>
                    </nav>
                    <div className="admin-applications__block">
                        <ul className="admin-applications__list">
                        {selectedApplications === 0 && (
                            <ApplicationsConstructor
                            applications={allApplications.pending}
                            text="Новых заявок нет"
                            status="pending"
                            />
                        )}

                        {selectedApplications === 1 && (
                            <ApplicationsConstructor
                            applications={allApplications.agreed}
                            text="Согласованных заявок нет"
                            status="agreed"
                            />
                        )}

                        {selectedApplications === 2 && (
                            <ApplicationsConstructor
                            applications={allApplications.archive}
                            text="Здесь пока ничего нет"
                            status="archive"
                            />
                        )}
                        </ul>
                    </div>
                </>
            }

            {selectedMenu === "routes" && <IceRoutes setInfoShip={setInfoShip} />}
        </div>

        {(selectedApplications === 0 && selectedMenu === "applications") && 
            <div className="admin-applications__footer">
                <button
                className="admin-applications__btn content__btn"
                type="button"
                onClick={openPopup}
                >
                Сформировать маршруты
                </button>
            </div>
        }
      </div>
    </div>
  );
}
