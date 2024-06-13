import Application from "../Application/Application";
import ApplicationsError from "../ApplicationsError/ApplicationsError";

export default function ApplicationsArchive({ applications }) {
    if (applications && applications.length) {
        return (
            <>
                {applications.map((item, index) => {
                    return <Application key={index} application={item} status="archive" />;
                })}
            </>
        );
    } else {
        return <ApplicationsError text="Маршрутов в архиве нет" />
    }
    
}