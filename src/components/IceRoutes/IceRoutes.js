import { allIcebreakerRoutes } from "../../configs/allIcebreakerRoutes";
import "./IceRoutes.css";
import Icebreaker from "../Icebreaker/Icebreaker";

export default function IceRoutes({ setInfoShip }) {

    return (
        <div className="ice-routes">
            <ul className="ice-routes__list">
                {allIcebreakerRoutes.map((icebreaker) => {
                    const info = setInfoShip(icebreaker.class, icebreaker.speed);
                    return <Icebreaker key={icebreaker.id}  icebreaker={icebreaker} info={info} />
                })}
            </ul>
        </div>
    );
}