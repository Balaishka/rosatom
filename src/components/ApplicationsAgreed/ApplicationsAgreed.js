import Application from "../Application/Application";
import ApplicationsError from "../ApplicationsError/ApplicationsError";

export default function ApplicationsAgreed({ applications }) {
    if (applications) {
        return (
            <>
                {applications.map((item, index) => {
                    return <Application key={index} application={item} status="agreed" />;
                })}
            </>
        );
    } else {
        return <ApplicationsError text="Согласованных маршрутов пока нет" />
    }
    
}