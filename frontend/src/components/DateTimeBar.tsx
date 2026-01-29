import React, { useEffect, useState } from "react";

const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const formatTime = (date: Date) => {
    return date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
};

interface DateTimeBarProps {
    userName?: string;
    companyLogoUrl?: string;
    companyName?: string;
}

const DateTimeBar: React.FC<DateTimeBarProps> = ({ userName = "User", companyLogoUrl, companyName = "WALLEM" }) => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="datetime-bar">
            <div className="datetime-bar-section left">
                User : <span className="datetime-bar-user">{userName}</span>
            </div>
            <div className="datetime-bar-section center">
                Date : <span className="datetime-bar-date">{formatDate(now)}</span>
            </div>
            <div className="datetime-bar-section right">
                Time : <span className="datetime-bar-time">{formatTime(now)}</span>
                {companyLogoUrl && (
                    <img src={companyLogoUrl} alt={companyName + ' logo'} className="datetime-bar-logo" />
                )}
            </div>
        </div>
    );
};

export default DateTimeBar;
