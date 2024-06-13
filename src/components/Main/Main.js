import { useContext, useEffect, useState } from "react";
import Maps from "../Maps/Maps";
import "./Main.css";
import Applications from "../Applications/Applications";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Main({
  getNavigationPoints,
  navPoints,
  getShips,
  getAllApplications,
  applicationsPoints,
  allApplications,
}) {
  const [shipGeo, setShipGeo] = useState(0);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    getAllApplications();
    getNavigationPoints();
  }, []);

  function change(e) {
    setShipGeo(Number(e.target.value));
  }

  return (
    <section className="main">
      <Maps navPoints={navPoints} shipGeo={shipGeo} />
      {currentUser.currentUser.role === "CAPTAIN" ? (
        <Applications
          getShips={getShips}
          applicationsPoints={applicationsPoints}
          allApplications={allApplications}
        />
      ) : (
        <></>
      )}
      <div className="main__calendar">
        <input
          className="main__input"
          type="range"
          min="0"
          max="3"
          value={shipGeo}
          onChange={change}
        />
      </div>
    </section>
  );
}
