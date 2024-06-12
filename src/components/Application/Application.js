import "./Application.css";
import boat from "../../images/boat.svg";
import download from "../../images/download.svg";
import arrow from "../../images/arrow.svg";
import { useEffect, useState } from "react";
import { months } from "../../configs/constants";

export default function Application({ application }) {
  const [dates, setDates] = useState({
    start: "",
    finish: "",
  });

  useEffect(() => {
    if (application) {
        const startDate = new Date(application.startDate);
        const finishDate = application.finishDate ? new Date(application.finishDate):"";

        setDates({
        start: `${startDate.getDate()} ${months[startDate.getMonth()]}`,
        finish: finishDate ? `${finishDate.getDate()} ${months[finishDate.getMonth()]}`:"",
        });
    }
    
  }, []);

  if (application) {
    return (
    <li className="application">
      <div className="application__header">
        {application.convoy && (
          <div className="application__icebreaker">
            <img className="application__icebreaker-icon" src={boat} alt="" />
            Под сопровождением
          </div>
        )}

        <div className="application__header-block">
          <div className="application__header-left">
            <p className="application__title">{application.shipName}</p>
            <p className="application__points">{application.shipClass}</p>
          </div>
          <div className="application__btns">
            <button
              className="application__btn application__btn_name_download"
              type="button"
            >
              <img
                className="application__icon"
                src={download}
                alt="Скачать заявку"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="application__route">
        <div className="application__point">
          <span className="application__point-name">
            {application.startPointName}
          </span>
          <span className="application__point-date">{dates.start}</span>
        </div>
        <div className="application__arrow">
          <img className="application__arrow-img" src={arrow} alt="" />
        </div>
        <div className="application__point">
          <span className="application__point-name">
            {application.finishPointName}
          </span>
          <span className="application__point-date">{dates.finish}</span>
        </div>
      </div>
    </li>
  );
  }
  
}
