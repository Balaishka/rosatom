import { useContext, useEffect, useState } from "react";
import Maps from "../Maps/Maps";
import "./Main.css";
import Applications from "../Applications/Applications";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import MyCalendar from "../MyCalendar/MyCalendar";
import AdminApplications from "../AdminApplications/AdminApplications";
import { shipRoute } from "../../configs/shipRoute";

export default function Main({
  getNavigationPoints,
  navPoints,
  getAllApplications,
  applicationsPoints,
  allApplications,
  setIsPopupNewApplication,
  addZero,
  setInfoShip
}) {
  const [shipGeo, setShipGeo] = useState(0);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    getAllApplications();
    getNavigationPoints();
  }, []);

  return (
    <section className={`main ${currentUser.currentUser.role === "ADMIN" ? "main_admin":""}`}>
      {currentUser.currentUser.role === "CAPTAIN" && (
        <Applications
          applicationsPoints={applicationsPoints}
          allApplications={allApplications}
          setIsPopupNewApplication={setIsPopupNewApplication}
        />
      )}

      {currentUser.currentUser.role === "ADMIN" && (
        <AdminApplications
          applicationsPoints={applicationsPoints}
          allApplications={allApplications}
          setIsPopupNewApplication={setIsPopupNewApplication}
          setInfoShip={setInfoShip}
        />
      )}

      <div className="main__maps">
        <Maps navPoints={navPoints} shipGeo={shipGeo} shipRoute={shipRoute} />
      </div>
      
      <div className="main__time">
        <MyCalendar addZero={addZero} shipRoute={[]} shipGeo={shipGeo} setShipGeo={setShipGeo} />
      </div>
    </section>
  );
}
