import { createContext, useState } from 'react';


export const TimeContext = createContext(
    {
        time: {},
        setTime: () => {},
        trackTime: 0,
        setTrackTime: () => {},
        startTimer: false,
        setStartTimer: () => {},

    }
);

export const TimeProvider = ({children}) => {
    const [startTimer, setStartTimer] = useState(false);
    const [minutes, setMinutes] = useState({
        focus: 25,
        short: 5,
        long: 10,
    });

    const [trackTime, setTrackTime] = useState(0);


    const changeTime = (timeValue, phase) => {
        if (phase === 'focus') {
            const newTime = {...minutes, 'focus': timeValue}
            setMinutes(newTime)
        } else if (phase === 'short') {
            const newTime = {...minutes, 'short': timeValue}
            setMinutes(newTime)
        } else {
            const newTime = {...minutes, 'long': timeValue}
            setMinutes(newTime)
        }
    };
    

    const value = {
        minutes, setMinutes, changeTime, trackTime, setTrackTime, startTimer, setStartTimer
    };


    return (
        <TimeContext.Provider value={value}>
            {children}
        </TimeContext.Provider>
    )
}