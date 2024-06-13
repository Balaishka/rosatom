import Application from "../Application/Application";
import ApplicationsError from "../ApplicationsError/ApplicationsError";

export default function ApplicationsConstructor({ applications, text, status }) {
    if (applications && applications.length) {
        return (
            <>
                {applications.map((item, index) => {
                    return <Application key={index} application={item} status={status} />;
                })}
            </>
        );
    } else {
        return <ApplicationsError text={text} />
    } 
}