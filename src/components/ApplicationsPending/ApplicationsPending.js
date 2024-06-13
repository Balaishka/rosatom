import Application from "../Application/Application";
import ApplicationsError from "../ApplicationsError/ApplicationsError";

export default function ApplicationsPending({ applications }) {
    if (applications) {
        return (
            <>
                {applications.map((item, index) => {
                    return <Application key={index} application={item} status="pending" />;
                })}
            </>
        );
    } else {
        return <ApplicationsError text="Заявок в обработке нет" />
    }
    
}