import "./Icebreaker.css";
import download from "../../images/download.svg";
import { useState } from "react";
import Application from "../Application/Application";
import Parking from "../Parking/Parking";

export default function Icebreaker({ icebreaker, info }) {
  const [isRoutes, setIsRoutes] = useState(false);
  const [isArchive, setIsArchive] = useState(false);

  function toggleRoutes() {
    setIsRoutes(!isRoutes);
  }

  function toggleArchive() {
    setIsArchive(!isArchive);
  }
  return (
    <li className="icebreaker">
      <div className="icebreaker__icebreaker">
        <div
          className={`icebreaker__img icebreaker__img-${icebreaker.id}`}
        ></div>
        <div className="icebreaker__info">
          <p className="icebreaker__name">{icebreaker.name}</p>
          <p className="icebreaker__description">{info}</p>
        </div>
      </div>

      <div className="icebreaker__routes">
        <div className="icebreaker__routes-header">
          <button
            className={`icebreaker__btn ${
              isRoutes ? "icebreaker__btn_opened" : ""
            }`}
            type="button"
            onClick={toggleRoutes}
          >
            Маршрутный лист
          </button>
          <img
            className="icebreaker__download"
            src={download}
            alt="Скачать маршрутный лист"
          />
        </div>
        <div className="icebreaker__routes-body">
            {isRoutes && 
                <ul className="icebreaker__routes-list">
                    {icebreaker.route.map((item, index) => {
                        if (item.isParking) {
                            return <Parking key={index} pointName={item.startPointName} startDate={item.startDate} finishDate={item.finishDate} />
                        } else {
                            return <Application key={index} application={item} status="pending" myClass="icebreaker" />
                        }
                    })}
                </ul>
            }
        </div>
      </div>

      <div className="icebreaker__archive">
        <div className="icebreaker__archive-header">
          <button
            className={`icebreaker__btn ${
              isArchive ? "icebreaker__btn_opened" : ""
            }`}
            type="button"
            onClick={toggleArchive}
          >
            Архив маршрутов
          </button>
        </div>
        <div className="icebreaker__archive-body">
            {isArchive && 
                <div className="icebreaker__archive-error">
                    Здесь пока ничего нет
                </div>
            }
        </div>
      </div>
    </li>
  );
}
